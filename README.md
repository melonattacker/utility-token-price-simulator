# utility token price simulator

## Prerequisites
- docker
- docker-compose

## Setup  

```
$ git clone https://github.com/melonattacker/utility-token-price-simulator.git
$ cd utility-token-price-simulator
$ docker-compose build
$ docker-compose up
```

## Simulation
- Access `http://localhost:3000` through a browser.
- Set parameters and simulate.

## Parameters
| Parameters | Type(python) | Default value | Description |
|:---|:---:|:---:|:---:|
|period | int | 100 | Period you simulate the price.|
|agents | int | 1000 | Number of people who may hold tokens. |
|times | int | 5 | Number of simulations. |
|beta | float | 0.3 | Related to number of users and price. |
|chi | float | 1.0 | Scaling effect on Productivity. |
|interest_rate | float | 0.05 | Risk-free rate. |
|token_supply | int | 1000000000 | Token supply amount (fixed). |
|mu (price) | float | 0.01 | Average of price. |
|sigma (price) | float | 0.3 | Standard deviation of price. |
|initial_value (productivity) | float | 100.0 | Initial value of productivity. |
|mu (productivity) | float | 0.02 | Average of price. |
|sigma (productivity) | float | 2.0 | Standard deviation of productivity. |
|mu (utility) | float | 0.03 | Average utility of agents. |
|sigma (utility) | float | 0.3 | Standard deviation of the utility of the agents. |
