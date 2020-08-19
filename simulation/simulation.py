from simulation import simulator
from typing import List

def simulate(df: dict) -> List[float]:
    sim = simulator.Simulator(df)
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

    return sim.price.tolist()