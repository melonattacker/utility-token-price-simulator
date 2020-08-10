import numpy as np
import math
import random
from utils import utils
from simulation import generator
from scipy import integrate
from scipy.stats import gaussian_kde
from typing import List
import matplotlib.pyplot as plt

class Simulation:
    def __init__(self):
        self.df = utils.read_config('config.json')
        self.productivities = np.zeros(self.df['period']) 
        self.utilities = np.zeros((self.df['period'], self.df['agents']))
        self.userbase = np.zeros(self.df['period'])
        self.threshold = np.zeros(self.df['period'])
        self.need = np.zeros(self.df['period'])
        self.price = np.zeros(self.df['period'])

    def calc_userbase_and_threshold(self, t: int, threshold: float, user_base: float):
        beta: float = self.df['beta']
        chi: float = self.df['chi']
        interest_rate: float = self.df['interest_rate']
        price_mu: float = self.df['price']['mu']
        utility_mu: float = self.df['utility']['mu']
        utility_sigma: float = self.df['utility']['sigma']

        productivity: float = self.productivities[t]

        theta: float = utility_sigma / math.sqrt(2 * utility_mu)
        ked_instance = gaussian_kde(self.utilities[t])

        y = lambda u: math.sqrt(1 / (2 * math.pi * theta ** 2)) * math.e ** (- u ** 2 / (2 * theta ** 2)) if t == 0 else ked_instance.pdf(u)

        iy, err = integrate.quad(y, -np.inf, threshold)
        new_userbase: float = 1 - iy
        new_threshold: float = - math.log(new_userbase) + math.log(chi / (productivity * beta)) - ((1 - beta) / beta) * math.log((1 - beta) / (interest_rate - price_mu))

        if abs(new_threshold - threshold) < 0.0000000000000000000001:
            self.userbase[t] = new_userbase
            self.threshold[t] = new_threshold
        else:
            self.calc_userbase_and_threshold(t, new_threshold, new_userbase)

    def calc_productivity(self):
        period: int = self.df['period']
        pro_mu: float = self.df['productivity']['mu']
        pro_sigma: float = self.df['productivity']['sigma']

        self.productivities[0] = self.df['productivity']['initial_value']
        dt: float = 1.0 / period

        # brown motion
        for i in range(1, period):
            self.productivities[i] = generator.generate_brown_motion(self.productivities[i-1], pro_mu, pro_sigma, dt, random.gauss(0,1))

    def calc_utility(self):
        period: int = self.df['period']
        agents: int = self.df['agents']
        utility_mu: float = self.df['utility']['mu']
        utility_sigma: float = self.df['utility']['sigma']

        dt: float = 1.0 / period

        # generate initial utility of agents
        ini_util_generator = generator.initial_utility_gen(a=-20.0, b=20.0)
        self.utilities[0] = ini_util_generator.rvs(mu=utility_mu, sigma=utility_sigma, size=agents)
        print(self.utilities[0])

        # generate utility of agents
        for t in range(1, period):
            for i in range(0, agents):
                self.utilities[t][i] = generator.generate_ornstein_uhlenbeck_process(self.utilities[t-1][i], utility_mu, utility_sigma, dt, random.gauss(0,1))

    def calc_aggregate_transaction_need(self, t: int):
        threshold: float = self.threshold[t]

        kde_instance = gaussian_kde(self.utilities[t])
        # avoid exp overflow
        h = np.linspace(-20, 20, 40)
        plt.plot(h, kde_instance.pdf(h))
        plt.show()
        y = lambda u: 0.0 if u < -10 or u > 10 else np.exp(u) * kde_instance.pdf(u)
        need, err = integrate.quad(y, threshold, np.inf)
        self.need[t] = need

    def calc_price(self, t: int):
        beta: float = self.df['beta']
        interest_rate: float = self.df['interest_rate']
        supply: int = self.df['token_supply']
        price_mu: float = self.df['price']['mu']
        userbase: float = self.userbase[t]
        need: float = self.need[t]
        productivity: float = self.productivities[t]

        price: float = userbase * need * productivity / supply * ((1 - beta) / (interest_rate - price_mu)) ** (1 / beta)

        self.price[t] = price