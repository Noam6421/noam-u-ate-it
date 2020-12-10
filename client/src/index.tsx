import React from 'react';
import rtl from 'jss-rtl';
import { create } from 'jss';
import ReactDOM from 'react-dom';
import { jssPreset } from '@material-ui/styles';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';

import App from './App';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })
const theme = createMuiTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
   
ReactDOM.render(
    <React.StrictMode>
        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </StylesProvider> 
    </React.StrictMode>,
    document.getElementById('root')
);