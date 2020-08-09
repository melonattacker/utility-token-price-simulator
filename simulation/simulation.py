import numpy as np
import math
import random
from utils import utils
from scipy import integrate

class Simulation:
    def __init__(self):
        self.df = utils.read_config('config.json')
        self.productivities = np.zeros(self.df['period']) 

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

        for i in range(1, period):
            self.productivities[i] = self.productivities[i - 1] * math.exp((pro_mu - (pro_sigma ** 2) / 2) * dt + pro_sigma * math.sqrt(dt) * random.gauss(0,1))

