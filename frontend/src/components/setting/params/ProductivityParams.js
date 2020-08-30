import React from 'react';
import { TextField, FormControl } from '@material-ui/core';
import { paramStyles } from '../../Styles';

export function ProductivityParams(props) {
    const classes = paramStyles();

    return (
        <FormControl>
            <div className={classes.param}>
                <p className={classes.header}>Productivity</p>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.proIni) {
                        return (
                            <TextField 
                                name="proIni" id="proIni" label="Initial Value (float)" variant="outlined" 
                                className={classes.text1} value={props.ini} onChange={props.handleChange}
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
                                error name="proIni" id="proIni" label="Initial Value (float)" variant="outlined" 
                                className={classes.text1} value={props.ini} onChange={props.handleChange}
                                helperText={props.errors.proIni.message}
                            />  
                        )
                    }
                })()}
                </div>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.proMu) {
                        return (
                            <TextField 
                                name="proMu" id="proMu" label="Mu (float)" variant="outlined" 
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
                                error name="proMu" id="proMu" label="Mu (float)" variant="outlined" 
                                className={classes.text1} value={props.mu} onChange={props.handleChange}
                                helperText={props.errors.proMu.message}
                            />  
                        )
                    }
                })()}
                </div>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.proSigma) {
                        return (
                            <TextField 
                                name="proSigma" id="proSigma" label="Sigma (float)" variant="outlined" 
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
                                error name="proSigma" id="proSigma" label="Sigma (float)" variant="outlined" 
                                className={classes.text2} value={props.sigma} onChange={props.handleChange}
                                helperText={props.errors.proSigma.message}
                            />  
                        )
                    }
                })()}
                </div>
            </div>
        </FormControl>
    );
}