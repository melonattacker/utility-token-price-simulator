import math
import numpy as np
from scipy.stats import rv_continuous

class initial_utility_gen(rv_continuous):
    def _pdf(self, x, mu, sigma):
        theta: float = sigma / math.sqrt(2 * mu)
        return math.sqrt(1 / (2 * math.pi * theta ** 2)) * math.e ** (- x ** 2 / (2 * theta ** 2))

def generate_brown_motion(previous_value: float, mu: float, sigma: float, dt: float, random_value: float) -> float:
    return previous_value * math.exp((mu - (sigma ** 2) / 2) * dt + sigma * math.sqrt(dt) * random_value)

def generate_ornstein_uhlenbeck_process(previous_value: float, mu: float, sigma: float, dt: float, random_value: float) -> float:
    theta: float = sigma / math.sqrt(2 * mu)
    return previous_value + (theta * (mu - previous_value)) * dt + sigma * math.sqrt(dt) * random_value

