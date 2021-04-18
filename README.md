# Utility Token Price Simulator
Utility Token Price Simulator is a simulator that simulates general token price when setting parameters. <br/> It is implemented based on the theory of "[Tokenomics: Dynamic Adoption and Valuation](https://bfi.uchicago.edu/wp-content/uploads/WP_2018-49.pdf)". <br/> CUI mode or GUI mode can be used.  

> You can't use this tool for speculative purposes.

## GUI mode
### Prerequisites
- docker
- docker-compose

### Setup  

```
$ git clone https://github.com/melonattacker/utility-token-price-simulator.git
$ cd utility-token-price-simulator
$ docker-compose build
$ docker-compose up  # may take some time...
```

### Simulation
- Access `http://localhost:3000` through a browser.
- Set the parameters and simulate.

### Clean Up
After the simulation, you should remove containers with the command below.

```
$ docker-compose down
```

## CUI mode 
### Prerequisites
- python3 (It has been confirmed to work with version 3.7.3)

### Setup

```
$ git clone https://github.com/melonattacker/utility-token-price-simulator.git
$ cd utility-token-price-simulator
$ pip install -r requirements.txt
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
|mu (productivity) | float | 0.02 | Average of productivity. |
|sigma (productivity) | float | 2.0 | Standard deviation of productivity. |
|mu (utility) | float | 1.0 | Average utility of agents. |
|sigma (utility) | float | 10.0 | Standard deviation of the utility of the agents. |
