import React from 'react';
import { TextField, FormControl } from '@material-ui/core';
import { paramStyles } from '../../Styles';

export function UtilityParams(props) {
    const classes = paramStyles();

    return (
        <FormControl className={classes.root}>
            <div className={classes.param}>
                <p className={classes.header}>Utility</p>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.utiMu) {
                        return (
                            <TextField 
                                name="utiMu" id="utiMu" label="Mu (float)" variant="outlined" 
                                className={classes.text1} value={props.mu} onChange={props.handleChange}
                                inputRef={props.register({ 
                                    required: 'This field required.',
                                    pattern: {
                                        value: /^[1-9][0-9]*[.][0-9]*|[0][.][1-9][0-9]*$/,
                                        message: 'Must be float greater than 0.'
                                    } 
                                })}
                            />  
                        )
                    } else {
                        return (
                            <TextField 
                                error name="utiMu" id="utiMu" label="Mu (float)" variant="outlined" 
                                className={classes.text1} value={props.mu} onChange={props.handleChange}
                                helperText={props.errors.utiMu.message}
                            />  
                        )
                    }
                })()}
                </div>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.utiSigma) {
                        return (
                            <TextField 
                                name="utiSigma" id="utiSigma" label="Sigma (float)" variant="outlined" 
                                className={classes.text2} value={props.sigma} onChange={props.handleChange}
                                inputRef={props.register({ 
                                    required: 'This field required.',
                                    pattern: {
                                        value: /^[1-9][0-9]*[.][0-9]*|[0][.][1-9][0-9]*$/,
                                        message: 'Must be float greater than 0.'
                                    } 
                                })}
                            />  
                        )
                    } else {
                        return (
                            <TextField 
                                error name="utiSigma" id="utiSigma" label="Sigma (float)" variant="outlined" 
                                className={classes.text2} value={props.sigma} onChange={props.handleChange}
                                helperText={props.errors.utiSigma.message}
                            />  
                        )
                    }
                })()}
                </div>
            </div>
        </FormControl>
    );
}