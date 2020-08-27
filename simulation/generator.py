import numpy as np
from scipy.stats import rv_continuous

class initial_utility_gen(rv_continuous):
    def _pdf(self, x, mu, sigma):
        theta: float = sigma / np.sqrt(2 * mu)
        return np.sqrt(1 / (2 * np.pi * theta ** 2)) * np.e ** (- x ** 2 / (2 * theta ** 2))

def generate_brown_motion(previous_value: float, mu: float, sigma: float, dt: float, random_value: float) -> float:
    return previous_value * np.exp((mu - (sigma ** 2 / 2)) * dt + sigma * np.sqrt(dt) * random_value)

def generate_ornstein_uhlenbeck_process(previous_value: float, mu: float, sigma: float, dt: float, random_value: float) -> float:
    theta: float = sigma / np.sqrt(2 * mu)
    return previous_value + (theta * (mu - previous_value)) * dt + sigma * np.sqrt(dt) * random_value
