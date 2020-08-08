from simulation import simulation

def main():
    sim = simulation.Simulation()
    threshold, user_base = sim.userbase_and_threshold(-2.0, 0.0, 1.0)
    print(threshold)
    print(user_base)

main()