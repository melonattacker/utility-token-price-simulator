import React from 'react';
import { BasicParams, OtherParams, PriceParams, UtilityParams, ProductivityParams } from './InputParams';
import { withStyles } from '@material-ui/styles';
import '../App.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 315,
    marginRight: 315
  },
  upper: {
    height: 293,
    width: 808,
    marginBottom: 40
  },
  lower: {
    height: 293,
    width: 808
  }
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "period": 1000,
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
      "proSigma": 1.0
    }
  }

  handleChange = (name) => (e) => {
    this.setState({ [name]: e.target.value})
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
      </div>
    )
  }
}

export default withStyles(styles)(Form);
