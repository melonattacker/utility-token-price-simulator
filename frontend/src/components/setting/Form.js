import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { BasicParams, OtherParams, PriceParams, UtilityParams, ProductivityParams } from './InputParams';
import { Button, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import '../../App.css';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 315,
    marginRight: 315,
    marginTop: -35
  },
  upper: {
    height: 293,
    width: 808,
    marginBottom: 40
  },
  lower: {
    height: 293,
    width: 808
  },
  buttonFrame: {
    height: 50,
    width: 200,
    marginTop: -30,
    marginLeft: 343,
  },
  button: {
    height: 50,
    width: 130,
    fontSize: 17,
    background: theme.palette.info.main
  },
  progress: {
    float: 'right'
  }
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "period": 100,
      "agents": 1000,
      "tokenSupply": 1000000000,
      "beta": 0.3,
      "chi": 1.0,
      "freeRate": 0.05,
      "priceMu": 0.01,
      "priceSigma": 0.3, 
      "utiMu": 0.03,
      "utiSigma": 0.3, 
      "proIni": 100.0,
      "proMu": 0.02,
      "proSigma": 1.0,
      "waiting": false
    }
    this.handleSend = this.handleSend.bind(this);
  }

  handleChange = (name) => (e) => {
    this.setState({ [name]: e.target.value})
  }

  async handleSend() {
    const state = this.state;
    try {
      this.setState({ waiting: true })
      const res = await axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/',
        data: {
          period: state.period,
          agents: state.agents,
          beta: state.beta,
          chi: state.chi,
          interest_rate: state.freeRate,
          token_supply: state.tokenSupply,
          price: {
            mu: state.priceMu,
            sigma: state.priceSigma
          }, 
          productivity: {
            initial_value: state.proIni,
            mu: state.proMu,
            sigma: state.proSigma
          },
          utility: {
            mu: state.utiMu,
            sigma: state.utiSigma
          }
        }
      });
      this.setState({ waiting: false })
      this.props.history.push({
        pathname: '/result',
        state: { prices: res.data.prices, img: res.data.img }
      });
      console.log(res.data);
    } catch(err) {
      this.setState({ waiting: false })
      console.log(err);
      window.alert('Error happened.')
    }
  }

  render() {
    const state = this.state;
    const { classes } = this.props; 
    return(
      <div className={classes.root}>
        <div className={classes.upper}>
          <BasicParams period={state.period} agents={state.agents} supply={state.tokenSupply} handleChange={this.handleChange} />
          <OtherParams beta={state.beta} chi={state.chi} rate={state.freeRate} handleChange={this.handleChange} />
          <ProductivityParams ini={state.proIni} mu={state.proMu} sigma={state.proSigma} handleChange={this.handleChange} />
        </div>
        <div className={classes.lower}>
          <PriceParams mu={state.priceMu} sigma={state.priceSigma} handleChange={this.handleChange} />
          <UtilityParams mu={state.utiMu} sigma={state.utiSigma} handleChange={this.handleChange} />
        </div>
        <div className={classes.buttonFrame}>
          <Button className={classes.button} variant="contained" color="primary" onClick={this.handleSend}>Simulate</Button>
          <div className={classes.progress} >
            {state.waiting
              ? <CircularProgress/>
              : <p></p>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Form));
