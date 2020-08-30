import React from 'react';
import { TextField, FormControl } from '@material-ui/core';
import { paramStyles } from '../../Styles';

export function BasicParams(props) {
    const classes = paramStyles();

    return (
        <FormControl className={classes.root}>
            <div className={classes.param}>
                <p className={classes.header}>Basic</p>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.period) {
                        return (
                            <TextField 
                                name="period" id="period" label="Period (int)" variant="outlined" 
                                className={classes.text1} value={props.period} onChange={props.handleChange}
                                inputRef={props.register({ 
                                    required: 'This field required.',
                                    pattern: {
                                        value: /^[1-9][0-9]{0,3}$/,
                                        message: 'This field must be 1-9999 int.'
                                    } 
                                })}
                            />  
                        )
                    } else {
                        return (
                            <TextField 
                                error name="period" id="period" label="Period (int)" variant="outlined" 
                                className={classes.text1} value={props.period} onChange={props.handleChange}
                                helperText={props.errors.period.message}
                            />  
                        )
                    }
                })()}
                </div>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.agents) {
                        return (
                            <TextField 
                                name="agents" id="agents" label="Agents (int)" variant="outlined" 
                                className={classes.text1} value={props.agents} onChange={props.handleChange}
                                inputRef={props.register({ 
                                    required: 'This field required.',
                                    pattern: {
                                        value: /^[1-9][0-9]{0,3}$/,
                                        message: 'This field must be 1-9999 int.'
                                    } 
                                })}
                            />  
                        )
                    } else {
                        return (
                            <TextField 
                                error name="agents" id="agents" label="Agents (int)" variant="outlined" 
                                className={classes.text1} value={props.agents} onChange={props.handleChange}
                                helperText={props.errors.agents.message}
                            />  
                        )
                    }
                })()}
                </div>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.tokenSupply) {
                        return (
                            <TextField 
                                name="tokenSupply" id="supply" label="Token Supply (int)" variant="outlined" 
                                className={classes.text2} value={props.supply} onChange={props.handleChange}
                                inputRef={props.register({ 
                                    required: 'This field required.',
                                    pattern: {
                                        value: /^[1-9][0-9]*$/,
                                        message: 'This field must be int.'
                                    } 
                                })}
                            />  
                        )
                    } else {
                        return (
                            <TextField 
                                error name="tokenSupply" id="supply" label="Token Supply (int)" variant="outlined" 
                                className={classes.text2} value={props.supply} onChange={props.handleChange}
                                helperText={props.errors.tokenSupply.message}
                            />  
                        )
                    }
                })()}
                </div>
            </div>
        </FormControl>
    );
}