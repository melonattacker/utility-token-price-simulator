from simulation import simulator
from typing import List
import numpy as np
import matplotlib
matplotlib.use('agg')

import matplotlib.pyplot as plt

def simulate(df: dict) -> List[List[float]]:
    times: int = df['times']
    period: int = df['period']

    prices = np.zeros((times, period))

    fig = plt.figure()

    print('Now simulating...')
    for i in range(0, times):
        sim = simulator.Simulator(df)
        # generate productivity
        sim.calc_productivity()
        # generate utility 
        sim.calc_utility()

        # simulate price
        for t in range(0, period):
            sim.calc_userbase_and_threshold(t)
            sim.calc_aggregate_transaction_need(t)
            sim.calc_price(t)

        prices[i] = sim.price
        plt.plot(sim.price)

    plt.title('Utility Token Price Per Time Point')
    plt.xlabel('time')
    plt.ylabel('price')
    fig.savefig('glaph.png')

    return prices.tolist()