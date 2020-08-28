# Utility Token Price Simulator
Utility Token Price Simulator is a simulator that simulates general token price when setting parameters. <br/> CUI mode or GUI mode can be used.  

> Note that it doesn't simulate the price of any particular token!

## GUI mode
### Prerequisites
- docker
- docker-compose

### Setup  

```
$ git clone https://github.com/melonattacker/utility-token-price-simulator.git
$ cd utility-token-price-simulator
$ docker-compose build
$ docker-compose up
```

### Simulation
- Access `http://localhost:3000` through a browser.
- Set the parameters and simulate.

## CUI mode 
### Prerequisites
- python3 (It has been confirmed to work with version 3.7.3)

### Setup

```
$ git clone https://github.com/melonattacker/utility-token-price-simulator.git
$ cd utility-token-price-simulator
```

### Simulation
- Edit `config.json` to set the parameters.
- After that, execute the following command.

```
$ python3 main.py
```

- Finally, `glaph.png` is output.

## Parameters
Below is a description of the parameters.
| Parameters | Type(python) | Default value | Description |
|:---|:---:|:---:|:---:|
|period | int | 365 | Period(days) you simulate the price.|
|agents | int | 1000 | Number of people who may hold tokens. |
|times | int | 1 | Number of simulations. |
|beta | float | 0.3 | Related to number of users and price. |
|chi | float | 1.0 | Scaling effect on Productivity. |
|interest_rate | float | 0.05 | Risk-free rate. |
|token_supply | int | 1000000000 | Token supply amount (fixed). |
|mu (price) | float | 0.03 | Expected rate of return. |
|initial_value (productivity) | float | 100.0 | Initial value of productivity. |
|mu (productivity) | float | 0.02 | Average of price. |
|sigma (productivity) | float | 2.0 | Standard deviation of productivity. |
|mu (utility) | float | 1.0 | Average utility of agents. |
|sigma (utility) | float | 10.0 | Standard deviation of the utility of the agents. |
