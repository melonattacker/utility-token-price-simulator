import React from 'react';
import { TextField, FormControl, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
    header: {
      marginTop: -5,
      marginBottom: 20,
      textAlign: 'center'
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
    },
    root: {
        marginRight: 50
    }
}))

export function BasicParams(props) {
    const classes = styles();

    return (
        <FormControl className={classes.root}>
            <div className={classes.param}>
                <p className={classes.header}>Basic</p>
                <div className={classes.input}>
                    <TextField required name="period" id="period" label="Period (int)" defaultValue={props.period} variant="outlined" className={classes.space} onChange={props.handleChange}/>  
                </div>
                <div className={classes.input}>
                    <TextField required name="agents" id="agents" label="Agents (int)" defaultValue={props.agents} variant="outlined" className={classes.space} onChange={props.handleChange} />  
                </div>
                <div className={classes.input}>
                    <TextField required name="tokenSupply" id="supply" label="Token Supply (int)" defaultValue={props.supply} variant="outlined" onChange={props.handleChange}/>  
                </div>
            </div>
        </FormControl>
    );
}

export function OtherParams(props) {
    const classes = styles();

    return (
        <FormControl className={classes.root}>
            <div className={classes.param}>
                <p className={classes.header}>Others</p>
                <div className={classes.input}>
                    <TextField required name="beta" id="beta" label="Beta (float)" defaultValue={props.beta} variant="outlined" className={classes.space} onChange={props.handleChange}/>  
                </div>
                <div className={classes.input}>
                    <TextField required name="chi" id="chi" label="Chi (float)" defaultValue={props.chi} variant="outlined" className={classes.space} onChange={props.handleChange} />  
                </div>
                <div className={classes.input}>
                    <TextField required name="freeRate" id="free-rate" label="Risk Free Rate (float)" defaultValue={props.rate} variant="outlined" onChange={props.handleChange}/>  
                </div>
            </div>
        </FormControl>
    );
}
  
export function PriceParams(props) {
    const classes = styles();

    return (
        <FormControl className={classes.root}>
            <div className={classes.param}>
                <p className={classes.header}>Price</p>
                <div className={classes.input}>
                    <TextField required name="priceMu" id="price-mu" label="Mu (float)" defaultValue={props.mu} variant="outlined" className={classes.space} onChange={props.handleChange}/>  
                </div>
                <div className={classes.input}>
                    <TextField required name="priceSigma" id="price-sigma" label="Sigma (float)" defaultValue={props.sigma} variant="outlined" onChange={props.handleChange} />  
                </div>
            </div>
        </FormControl>
    );
}

export function UtilityParams(props) {
    const classes = styles();

    return (
        <FormControl className={classes.root}>
            <div className={classes.param}>
                <p className={classes.header}>Utility</p>
                <div className={classes.input}>
                    <TextField required name="utiMu" id="uti-mu" label="Mu (float)" defaultValue={props.mu} variant="outlined" className={classes.space} onChange={props.handleChange}/>  
                </div>
                <div className={classes.input}>
                    <TextField required name="utiSigma" id="uti-sigma" label="Sigma (float)" defaultValue={props.sigma} variant="outlined" onChange={props.handleChange} />  
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
                    <TextField required name="proIni" id="pro-ini" label="Initial Value (float)" defaultValue={props.ini} variant="outlined" className={classes.space} onChange={props.handleChange}/>  
                </div>
                <div className={classes.input}>
                    <TextField required name="proMu" id="pro-mu" label="Mu (float)" defaultValue={props.mu} variant="outlined" className={classes.space} onChange={props.handleChange}/>  
                </div>
                <div className={classes.input}>
                    <TextField required name="proSigma" id="pro-sigma" label="Sigma (float)" defaultValue={props.sigma} variant="outlined" onChange={props.handleChange} />  
                </div>
            </div>
        </FormControl>
    );
}

