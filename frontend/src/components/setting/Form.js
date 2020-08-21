import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { BasicParams, OtherParams, PriceParams, UtilityParams, ProductivityParams } from './InputParams';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css';

const styles = makeStyles((theme) => ({
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
}));

function Form(props) {
  const classes = styles();
  const [state, setState] = useState({
    period: 100,
    agents: 1000,
    tokenSupply: 1000000000,
    beta: 0.3,
    chi: 1.0,
    freeRate: 0.05,
    priceMu: 0.01,
    priceSigma: 0.3, 
    utiMu: 0.03,
    utiSigma: 0.3, 
    proIni: 100.0,
    proMu: 0.02,
    proSigma: 1.0,
    waiting: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value})
  }

  const handleSend = async() => {
    try {
      setState({ waiting: true })
      const res = await axios({
        method: 'post',
        url: 'http://localhost:5000/',
        data: {
          period: parseInt(state.period),
          agents: parseInt(state.agents),
          beta: parseFloat(state.beta),
          chi: parseFloat(state.chi),
          interest_rate: parseFloat(state.freeRate),
          token_supply: parseInt(state.tokenSupply),
          price: {
            mu: parseFloat(state.priceMu),
            sigma: parseFloat(state.priceSigma)
          }, 
          productivity: {
            initial_value: parseFloat(state.proIni),
            mu: parseFloat(state.proMu),
            sigma: parseFloat(state.proSigma)
          },
          utility: {
            mu: parseFloat(state.utiMu),
            sigma: parseFloat(state.utiSigma)
          }
        }
      });
      setState({ waiting: false })
      props.history.push({
        pathname: '/result',
        state: { prices: res.data.prices, img: res.data.img }
      });
      console.log(res.data);
    } catch(err) {
      setState({ waiting: false })
      console.log(err);
      window.alert('Error happened.')
    }
  }

  return(
    <div className={classes.root}>
      <div className={classes.upper}>
        <BasicParams period={state.period} agents={state.agents} supply={state.tokenSupply} handleChange={handleChange} />
        <OtherParams beta={state.beta} chi={state.chi} rate={state.freeRate} handleChange={handleChange} />
        <ProductivityParams ini={state.proIni} mu={state.proMu} sigma={state.proSigma} handleChange={handleChange} />
      </div>
      <div className={classes.lower}>
        <PriceParams mu={state.priceMu} sigma={state.priceSigma} handleChange={handleChange} />
        <UtilityParams mu={state.utiMu} sigma={state.utiSigma} handleChange={handleChange} />
      </div>
      <div className={classes.buttonFrame}>
        <Button className={classes.button} variant="contained" color="primary" onClick={handleSend}>Simulate</Button>
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


export default withRouter(Form);
