import React from 'react';
import { TextField, FormControl, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
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
  
export function PriceParams(props) {
    const classes = styles();

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

export function ProductivityParams(props) {
    const classes = styles();

    return (
        <FormControl>
            <div className={classes.param}>
                <p className={classes.header}>Productivity</p>
                <div className={classes.input}>
                    <TextField required id="standard-required" label="initial value (float)" defaultValue={props.ini} variant="outlined" className={classes.space} onChange={props.handleChange("proIni")}/>  
                </div>
                <div className={classes.input}>
                    <TextField required id="standard-required" label="mu (float)" defaultValue={props.mu} variant="outlined" className={classes.space} onChange={props.handleChange("proMu")}/>  
                </div>
                <div className={classes.input}>
                    <TextField required id="standard-required" label="sigma (float)" defaultValue={props.sigma} variant="outlined" onChange={props.handleChange("proSigma")} />  
                </div>
            </div>
        </FormControl>
    );
}