import React from 'react';
import { TextField, InputAdornment, withStyles, createMuiTheme } from '@material-ui/core';
import { bootstrapGrid } from '../styles/login.styles';
import { ThemeProvider, withTheme } from '@material-ui/styles';
import { red, yellow, blue } from '@material-ui/core/colors';

export default function LoginInput(props:any) {
    const theme = createMuiTheme({
        palette: {
            error: props.warning? yellow :
                   blue
        }
    });
    return (
        <>
            <ThemeProvider theme={theme}>
                <TextField
                error={props.warning.required || props.warning.error}
                type={props.type}
                variant="outlined"
                className={bootstrapGrid.inputFields}
                label={props.helperText}
                value={props.value}
                onChange={(e:any) => props.onChange(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {props.icon}
                        </InputAdornment>
                    )
                }}/>
            </ThemeProvider>
        </>
    )
}