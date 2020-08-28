from simulation import simulator
from utils import utils
from typing import List
import numpy as np
import matplotlib.pyplot as plt

def main():
    df: dict = utils.read_config('config.json')
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

    print(prices)
    plt.title('Utility Token Price Per Time Point')
    plt.xlabel('time')
    plt.ylabel('price')
    fig.savefig('glaph.png')
    print('Simulation finished. Price glaph is output.')

main()