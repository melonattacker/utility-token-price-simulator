import React from 'react';
import { PriceParams, ProductivityParams } from './Input';
import '../App.css';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "priceMu": "0.01",
      "priceSigma": "0.3", 
      "proIni": "100.0",
      "proMu": "0.02",
      "proSigma": "1.0"
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
        <ProductivityParams ini={state.proIni} mu={state.proMu} sigma={state.proSigma} handleChange={this.handleChange} />
      </div>
    )
  }
}

export default InputForm;
