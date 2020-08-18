import React, {useState} from 'react';
import { TextField, FormControl, makeStyles } from '@material-ui/core';
import '../App.css';

const priceStyles = makeStyles((theme) => ({
  header: {
    marginTop: -5,
    marginBottom: 20
  },
  input: {
    display: 'flex',
  },
  param: {
    marginTop: 10,
    padding: 20,
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 10,
  },
  space: {
    marginBottom: 20
  }
}))

function PriceParams(props) {
  const classes = priceStyles();

  return (
    <FormControl>
      <div className={classes.param}>
        <p className={classes.header}>Price</p>
        <div className={classes.input}>
          <TextField required id="standard-required" label="mu (float)" defaultValue={props.mu} variant="outlined" className={classes.space} onChange={props.handleChange("priceMu")}/>  
        </div>
        <div className={classes.input}>
          <TextField required id="standard-required" label="sigma (float)" defaultValue={props.sigma} variant="outlined" onChange={props.handleChange("priceSigma")} />  
        </div>
      </div>
    </FormControl>
  );
}

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "priceMu": "0.01",
      "priceSigma": "0.3", 
    }
  }

  handleChange = (name) => (e) => {
    this.setState({ [name]: e.target.value})
  }

  render() {
    const state = this.state;
    return(
      <div>
        <PriceParams mu={state.priceMu} sigma={state.priceSigma} handleChange={this.handleChange} />
      </div>
    )
  }
}

export default InputForm;
