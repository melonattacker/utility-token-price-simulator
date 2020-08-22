import React from 'react';
import { TextField, FormControl } from '@material-ui/core';
import { paramStyles } from '../../Styles';

export function PriceParams(props) {
    const classes = paramStyles();

    return (
        <FormControl className={classes.root}>
            <div className={classes.param}>
                <p className={classes.header}>Price</p>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.priceMu) {
                        return (
                            <TextField 
                                name="priceMu" id="priceMu" label="Mu (float)" variant="outlined" 
                                className={classes.text1} value={props.mu} onChange={props.handleChange}
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
                                error name="priceMu" id="priceMu" label="Mu (float)" variant="outlined" 
                                className={classes.text1} value={props.mu} onChange={props.handleChange}
                                helperText={props.errors.priceMu.message}
                            />  
                        )
                    }
                })()}
                </div>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.priceSigma) {
                        return (
                            <TextField 
                                name="priceSigma" id="priceSigma" label="Sigma (float)" variant="outlined" 
                                className={classes.text2} value={props.sigma} onChange={props.handleChange}
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
                                error name="priceSigma" id="priceSigma" label="Sigma (float)" variant="outlined" 
                                className={classes.text2} value={props.sigma} onChange={props.handleChange}
                                helperText={props.errors.priceSigma.message}
                            />  
                        )
                    }
                })()}
                </div>
            </div>
        </FormControl>
    );
}