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
                    <TextField required id="period" label="Period (int)" defaultValue={props.period} variant="outlined" className={classes.space} onChange={props.handleChange("period")}/>  
                </div>
                <div className={classes.input}>
                    <TextField required id="agents" label="Agents (int)" defaultValue={props.agents} variant="outlined" className={classes.space} onChange={props.handleChange("agents")} />  
                </div>
                <div className={classes.input}>
                    <TextField required id="supply" label="Token Supply (int)" defaultValue={props.supply} variant="outlined" onChange={props.handleChange("tokenSpply")}/>  
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
                    <TextField required id="beta" label="Beta (float)" defaultValue={props.beta} variant="outlined" className={classes.space} onChange={props.handleChange("beta")}/>  
                </div>
                <div className={classes.input}>
                    <TextField required id="chi" label="Chi (int)" defaultValue={props.chi} variant="outlined" className={classes.space} onChange={props.handleChange("chi")} />  
                </div>
                <div className={classes.input}>
                    <TextField required id="free-rate" label="Risk Free Rate (int)" defaultValue={props.rate} variant="outlined" onChange={props.handleChange("freeRate")}/>  
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
                    <TextField required id="price-mu" label="Mu (float)" defaultValue={props.mu} variant="outlined" className={classes.space} onChange={props.handleChange("priceMu")}/>  
                </div>
                <div className={classes.input}>
                    <TextField required id="price-sigma" label="Sigma (float)" defaultValue={props.sigma} variant="outlined" onChange={props.handleChange("priceSigma")} />  
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
                    <TextField required id="uti-mu" label="Mu (float)" defaultValue={props.mu} variant="outlined" className={classes.space} onChange={props.handleChange("utiMu")}/>  
                </div>
                <div className={classes.input}>
                    <TextField required id="uti-sigma" label="Sigma (float)" defaultValue={props.sigma} variant="outlined" onChange={props.handleChange("utiSigma")} />  
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
                    <TextField required id="pro-ini" label="Initial Value (float)" defaultValue={props.ini} variant="outlined" className={classes.space} onChange={props.handleChange("proIni")}/>  
                </div>
                <div className={classes.input}>
                    <TextField required id="pro-mu" label="Mu (float)" defaultValue={props.mu} variant="outlined" className={classes.space} onChange={props.handleChange("proMu")}/>  
                </div>
                <div className={classes.input}>
                    <TextField required id="pro-sigma" label="Sigma (float)" defaultValue={props.sigma} variant="outlined" onChange={props.handleChange("proSigma")} />  
                </div>
            </div>
        </FormControl>
    );
}

