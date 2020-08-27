from simulation import simulator
from utils import utils
import matplotlib.pyplot as plt
import math

fig = plt.figure()

def func(n):
    return math.log(n)

def main():
    df: dict = utils.read_config('config.json')
    times: int = df['times']
    period: int = df['period']
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
        print(sim.price)
        plt.plot(sim.price)

    plt.title('Utility Token Price Per Time Point')
    plt.xlabel('time')
    plt.ylabel('price')
    fig.savefig('img.png')

main()