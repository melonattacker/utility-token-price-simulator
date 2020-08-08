import numpy as np
import math
from utils import utils
from scipy import integrate

class Simulation:
    def __init__(self):
        self.df = utils.read_config('config.json')

    def userbase_and_threshold(self, threshold: float, user_base: float, productivity: float):
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
            return self.userbase_and_threshold(new_threshold, new_userbase, productivity)
