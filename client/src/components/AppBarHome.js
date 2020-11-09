import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AppContext from '../context/context';

const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: 80,
    },
    root: {
      flexGrow: 1,
    },
}));


const AppBarHome = () => {
    const classes = useStyles();
    const { user } = useContext(AppContext);
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
                        <Typography type="title" color="inherit" variant="h6">
                            שלום לך {user}
                        </Typography>
                    </Grid>
                </Grid>
            </AppBar>      
        </div>
    )
}

export default AppBarHome;
