import React from 'react';
import { TextField, FormControl } from '@material-ui/core';
import { paramStyles } from '../../Styles';

export function TimesParams(props) {
    const classes = paramStyles();

    return (
        <FormControl className={classes.root}>
            <div className={classes.param}>
                <p className={classes.header}>Times</p>
                <div className={classes.input}>
                {(() => {
                    if(!props.errors.times) {
                        return (
                            <TextField 
                                name="times" id="times" label="Times (int)" variant="outlined" 
                                className={classes.text1} value={props.times} onChange={props.handleChange}
                                inputRef={props.register({ 
                                    required: 'This field required.',
                                    pattern: {
                                        value: /^[1-5]$/,
                                        message: 'This field must be 1-5.'
                                    } 
                                })}
                            />  
                        )
                    } else {
                        return (
                            <TextField 
                                error name="times" id="times" label="Times (int)" variant="outlined" 
                                className={classes.text1} value={props.mu} onChange={props.handleChange}
                                helperText={props.errors.times.message}
                            />  
                        )
                    }
                })()}
                </div>
            </div>
        </FormControl>
    );
}