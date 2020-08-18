import React from 'react';
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

function PriceParams() {
  const classes = priceStyles();
  return (
    <FormControl>
      <div className={classes.param}>
        <p className={classes.header}>Price</p>
        <div className={classes.input}>
          <TextField required id="standard-required" label="mu (float)" defaultValue="0.01" variant="outlined" className={classes.space} />  
        </div>
        <div className={classes.input}>
          <TextField required id="standard-required" label="sigma (float)" defaultValue="0.3" variant="outlined" />  
        </div>
      </div>
    </FormControl>
  );
}

class InputForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <PriceParams />
      </div>
    )
  }
}

export default InputForm;
