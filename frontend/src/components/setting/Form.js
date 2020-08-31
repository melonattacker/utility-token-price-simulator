import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { BasicParams } from './params/BasicParams';
import { OtherParams } from './params/OtherParams';
import { PriceParams } from './params/PriceParams';
import { ProductivityParams } from './params/ProductivityParams';
import { UtilityParams } from './params/UtilityParams';
import { TimesParams } from './params/TimesParams';
import { Button, CircularProgress } from '@material-ui/core';
import { formStyles } from '../Styles';
import '../../App.css';

function Form(props) {
  const classes = formStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const [state, setState] = useState({
    period: '365',
    agents: '1000',
    tokenSupply: '1000000000',
    beta: '0.3',
    chi: '1.0',
    freeRate: '0.05',
    priceMu: '0.03',
    utiMu: '1.0',
    utiSigma: '10.0', 
    proIni: '100.0',
    proMu: '0.02',
    proSigma: '2.0',
    times: '1',
    waiting: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value})
  }

  const onSubmit = async() => {

    try {
      setState({ ...state, waiting: true });
      const res = await axios({
        method: 'post',
        url: 'http://localhost:5000/',
        data: {
          period: parseInt(state.period),
          agents: parseInt(state.agents),
          times: parseInt(state.times),
          beta: parseFloat(state.beta),
          chi: parseFloat(state.chi),
          interest_rate: parseFloat(state.freeRate),
          token_supply: parseInt(state.tokenSupply),
          price: {
            mu: parseFloat(state.priceMu)
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
      setState({ ...state, waiting: false });
      props.history.push({
        pathname: '/result',
        state: { prices: res.data.prices, img: res.data.img }
      });
    } catch(err) {
      setState({ ...state, waiting: false });
      console.log(err);
      window.alert('Error happened. Please try.')
    }
  }

  return(
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.upper}>
        <BasicParams 
          period={state.period} agents={state.agents} supply={state.tokenSupply} 
          register={register} errors={errors}
          handleChange={handleChange} 
          />
        <OtherParams 
          beta={state.beta} chi={state.chi} rate={state.freeRate} priceMu={state.priceMu}
          register={register} errors={errors}
          handleChange={handleChange} 
          />
        <ProductivityParams 
          ini={state.proIni} mu={state.proMu} sigma={state.proSigma} 
          register={register} errors={errors}
          handleChange={handleChange} 
          />
      </div>
      <div className={classes.lower}>
        <PriceParams 
          mu={state.priceMu} freeRate={state.freeRate} 
          register={register} errors={errors}
          handleChange={handleChange} 
          />
        <UtilityParams 
          mu={state.utiMu} sigma={state.utiSigma} 
          register={register} errors={errors}
          handleChange={handleChange} 
          />
        <TimesParams 
          times={state.times} 
          register={register} errors={errors}
          handleChange={handleChange} 
          />
      </div>
      <div className={classes.buttonFrame}>
        <Button className={classes.button} variant="contained" color="primary" type="submit">Simulate</Button>
        <div className={classes.progress} >
          {state.waiting
            ? <CircularProgress/>
            : <p></p>
          }
        </div>
      </div>
      </form>
    </div>
  )
}


export default withRouter(Form);
