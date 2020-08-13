from simulation import simulation, generator
import matplotlib.pyplot as plt
import numpy as np

fig = plt.figure()

def main():
    sim = simulation.Simulation()
    period: int = sim.df['period']

    # generate productivity
    sim.calc_productivity()
    # generate utility 
    sim.calc_utility()

    # simulate price
    for t in range(0, period):
        sim.calc_userbase_and_threshold(t)
        sim.calc_aggregate_transaction_need(t)
        sim.calc_price(t)
    
    plt.plot(sim.price)
    plt.title('Utility Token Price Per Time Point')
    plt.xlabel('time')
    plt.ylabel('price')
    fig.savefig('img.png')

main()