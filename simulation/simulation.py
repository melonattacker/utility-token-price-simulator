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

    def calc_userbase_and_threshold(self, threshold: float, user_base: float, productivity: float):
        beta: float = self.df['beta']
        chi: float = self.df['chi']
        interest_rate: float = self.df['interest_rate']
        price_mu: float = self.df['price']['mu']
        utility_mu: float = self.df['utility']['mu']
        utility_sigma: float = self.df['utility']['sigma']

        theta: float = utility_sigma / math.sqrt(2 * utility_mu)
        y = lambda u: math.sqrt(1 / (2 * math.pi * theta ** 2)) * math.e ** (- u ** 2 / (2 * theta ** 2))

        iy, err = integrate.quad(y, -np.inf, threshold)
        new_userbase: float = 1 - iy
        new_threshold: float = - math.log(new_userbase) + math.log(chi / (productivity * beta)) - ((1 - beta) / beta) * math.log((1 - beta) / (interest_rate - price_mu))

        if abs(new_threshold - threshold) < 0.0000000000000000000001:
            return new_threshold, new_userbase
        else:
            return self.calc_userbase_and_threshold(new_threshold, new_userbase, productivity)

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

        # generate utility of agents
        for i in range(0, agents):
            for j in range(1, period):
                self.utilities[i][j] = generator.generate_ornstein_uhlenbeck_process(self.utilities[i][j-1], utility_mu, utility_sigma, dt, random.gauss(0,1))

    def calc_aggregate_transaction_need(self, utilities: List[float], threshold: float):
        kde_model = gaussian_kde(utilities)

        # avoid exp overflow
        y = lambda u: 0.0 if u < -20 or u > 20 else np.exp(u) * kde_model.pdf(u)
        iy, err = integrate.quad(y, threshold, np.inf)
        
        return iy