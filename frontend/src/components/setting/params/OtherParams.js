import React from 'react';
import { TextField, FormControl } from '@material-ui/core';
import { paramStyles } from '../../Styles';

export function OtherParams(props) {
    const classes = paramStyles();

    return (
        <FormControl className={classes.root}>
            <div className={classes.param}>
                <p className={classes.header}>Others</p>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.beta) {
                        return (
                            <TextField 
                                name="beta" id="beta" label="Beta (float)" variant="outlined" 
                                className={classes.text1} value={props.beta} onChange={props.handleChange}
                                inputRef={props.register({ 
                                    required: 'This field required.',
                                    pattern: {
                                        value: /^[0][.][1-9][0-9]*$/,
                                        message: 'This field must be 0 - 1 float.'
                                    } 
                                })}
                            />  
                        )
                    } else {
                        return (
                            <TextField 
                                error name="beta" id="agents" label="Beta (float)" variant="outlined" 
                                className={classes.text1} value={props.beta} onChange={props.handleChange}
                                helperText={props.errors.beta.message}
                            />  
                        )
                    }
                })()}
                </div>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.chi) {
                        return (
                            <TextField 
                                name="chi" id="chi" label="Chi (float)" variant="outlined" 
                                className={classes.text1} value={props.chi} onChange={props.handleChange}
                                inputRef={props.register({ 
                                    required: 'This field required.',
                                    pattern: {
                                        value: /^[0-9]+[.][0-9]+$/,
                                        message: 'This field must be float.'
                                    } 
                                })}
                            />  
                        )
                    } else {
                        return (
                            <TextField 
                                error name="chi" id="chi" label="Chi (float)" variant="outlined" 
                                className={classes.text1} value={props.chi} onChange={props.handleChange}
                                helperText={props.errors.chi.message}
                            />  
                        )
                    }
                })()}
                </div>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.freeRate) {
                        return (
                            <TextField 
                                name="freeRate" id="freeRate" label="Risk Free Rate (float)" variant="outlined" 
                                className={classes.text2} value={props.rate} onChange={props.handleChange}
                                inputRef={props.register({ 
                                    required: 'This field required.',
                                    pattern: {
                                        value: /^[0][.][0-9]+$/,
                                        message: 'This field must be float less than 1.'
                                    },
                                    validate: {
                                        greaterThanPriceMu: value => value > props.priceMu || 'Must be greater than price mu.'
                                    }
                                })}
                            />  
                        )
                    } else {
                        return (
                            <TextField 
                                error name="freeRate" id="freeRate" label="Risk Free Rate (float)" variant="outlined" 
                                className={classes.text2} value={props.rate} onChange={props.handleChange}
                                helperText={props.errors.freeRate.message}
                            />  
                        )
                    }
                })()}
                </div>
            </div>
        </FormControl>
    );
}