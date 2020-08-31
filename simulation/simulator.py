import numpy as np
import sys
import random
import matplotlib.pyplot as plt
from simulation import generator
from scipy import integrate, optimize
from scipy.stats import gaussian_kde
from typing import List

class Simulator:
    def __init__(self, df: dict):
        self.df: dict = df
        self.productivities = np.zeros(self.df['period']) 
        self.utilities = np.zeros((self.df['period'], self.df['agents']))
        self.userbase = np.zeros(self.df['period'])
        self.threshold = np.zeros(self.df['period'])
        self.need = np.zeros(self.df['period'])
        self.price = np.zeros(self.df['period'])

    def calc_userbase_and_threshold(self, t: int):
        beta: float = self.df['beta']
        chi: float = self.df['chi']
        interest_rate: float = self.df['interest_rate']
        price_mu: float = self.df['price']['mu']
        utility_mu: float = self.df['utility']['mu']
        utility_sigma: float = self.df['utility']['sigma']

        productivity: float = self.productivities[t]

        theta: float = utility_sigma / np.sqrt(2 * utility_mu)
        ked_instance = gaussian_kde(self.utilities[t].tolist())

        y = lambda u: np.sqrt(1 / (2 * np.pi * theta ** 2)) * np.exp(- u ** 2 / (2 * theta ** 2)) if t == 0 else ked_instance.pdf(u)

        def f(u_t):
            userbase, err = integrate.quad(y, u_t, np.inf)
            return userbase - np.exp(-(u_t) + np.log(chi / (productivity * beta)) - ((1 - beta) / beta) * np.log((1 - beta) / (interest_rate - price_mu)))
        
        # solve threshold using newton method
        threshold: float = optimize.newton(f, x0=0.0, maxiter=1000, tol=10**(-10), disp=False)
        userbase, err = integrate.quad(y, threshold, np.inf)
        self.userbase[t] = userbase
        self.threshold[t] = threshold

    def calc_productivity(self):
        period: int = self.df['period']
        pro_mu: float = self.df['productivity']['mu']
        pro_sigma: float = self.df['productivity']['sigma']

        self.productivities[0] = self.df['productivity']['initial_value']
        dt: float = 1.0 / period

        # brown motion
        for t in range(1, period):
            self.productivities[t] = generator.generate_brown_motion(self.productivities[t-1], pro_mu, pro_sigma, dt, random.gauss(0,1))

    def calc_utility(self):
        period: int = self.df['period']
        agents: int = self.df['agents']
        utility_mu: float = self.df['utility']['mu']
        utility_sigma: float = self.df['utility']['sigma']

        dt: float = 1.0 / period

        # generate initial utility of agents
        ini_util_generator = generator.initial_utility_gen(momtype=0, a=-100.0, b=100.0)
        self.utilities[0] = ini_util_generator.rvs(mu=utility_mu, sigma=utility_sigma, size=agents)

        # generate utility of agents
        for t in range(1, period):
            for i in range(0, agents):
                self.utilities[t][i] = generator.generate_ornstein_uhlenbeck_process(self.utilities[t-1][i], utility_mu, utility_sigma, dt, random.gauss(0,1))

    def calc_aggregate_transaction_need(self, t: int):
        threshold: float = self.threshold[t]
    
        if t == 0:
            utility_mu: float = self.df['utility']['mu']
            utility_sigma: float = self.df['utility']['sigma']
            theta: float = utility_sigma / np.sqrt(2 * utility_mu)
            y = lambda u: 0.0 if u < -100 or u > 100 else np.exp(u) * np.sqrt(1 / (2 * np.pi * theta ** 2)) * np.exp(- u ** 2 / (2 * theta ** 2))
            need, err = integrate.quad(y, threshold, np.inf)
            self.need[t] = need
        else:
            kde_instance = gaussian_kde(self.utilities[t].tolist())
            # avoid exp overflow
            y = lambda u: 0.0 if u < -100 or u > 100 else np.exp(u) * kde_instance.pdf(u)
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

        price: float = (userbase * need * productivity / supply) * ((1 - beta) / (interest_rate - price_mu)) ** (1 / beta)

        self.price[t] = price