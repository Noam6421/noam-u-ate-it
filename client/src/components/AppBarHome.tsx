import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { AppBar, Typography } from '@material-ui/core';

import useStyles from './AppBarHomeStyles';
import AppContext from '../context/context';

//const clientId = process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID : '';
const clientId = '988769699236-iia7fttlj2p46hoaisu04lh81cnd10co.apps.googleusercontent.com';

const AppBarHome = () => {

    const classes = useStyles();
    const { user, setUser } = useContext(AppContext);
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        setUser('')
        history.push('/');
    }; 

    return(
        <div className={classes.root}>
            <AppBar position='static'>
                <Grid
                    justify='space-between' 
                    container 
                    alignItems='center'
                >
                    <Grid item>
                        <Box display='flex' flexDirection='row' alignItems='center' padding={1}>
                            <img src='\logo.png' alt='u ate it logo' className={classes.logo}/>
                            <Typography variant='h6'>
                                אכלת אותה
                            </Typography>
                        </Box>
                    </Grid>
                    {location.pathname !== '/' &&
                    <Grid item>
                        <Box display='flex' flexDirection='row' alignItems='center' padding={1}>
                            <Typography color='inherit' variant='h6'>
                                שלום לך {user}
                            </Typography>
                            <GoogleLogout
                                clientId={clientId}
                                buttonText='Logout'
                                onLogoutSuccess={logout}
                            >
                            </GoogleLogout>
                        </Box>
                    </Grid>
                    }
                </Grid>
            </AppBar>      
        </div>
    )
}

export default AppBarHome;
