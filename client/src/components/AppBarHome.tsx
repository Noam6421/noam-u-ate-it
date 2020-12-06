import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AppContext from '../context/context';

const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: 80,
    },
    root: {
      flexGrow: 1,
    },
}));

const clientId = process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID : '';

const AppBarHome = () => {
    const classes = useStyles();
    const { user } = useContext(AppContext);
    const history = useHistory();
    const logout = () => {
        history.push("/");
    } 
    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Grid
                    justify="space-between" 
                    container 
                    alignItems="center"
                >
                    <Grid item>
                        <Box display="flex" flexDirection="row" alignItems="center" padding={1}>
                            <img src='\logo.png' alt="u ate it logo" className={classes.logo}/>
                            <Typography variant="h6">
                                אכלת אותה
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box display="flex" flexDirection="row" alignItems="center" padding={1}>
                            <Typography color="inherit" variant="h6">
                                שלום לך {user}
                            </Typography>
                            <GoogleLogout
                                clientId={ clientId }
                                buttonText="Logout"
                                onLogoutSuccess={logout}
                            >
                            </GoogleLogout>
                        </Box>
                    </Grid>
                </Grid>
            </AppBar>      
        </div>
    )
}

export default AppBarHome;
