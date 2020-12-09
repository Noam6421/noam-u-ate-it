import axios from "axios";
import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TabBarHome from './TabBarHome';
import AppBarHome from './AppBarHome';
import AppContext from '../context/context';

const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: 80,
    },
    root: {
      flexGrow: 1,
    },
}));

const HomePage = () => {
    const classes = useStyles();
    const {
        userId, setUserId, setFoodPref,
        setTab
    } = useContext(AppContext);  
    useEffect(() => {
        async function fetchData() {
            // get user foodPrefs
            const foodData = await axios.get('/foodPref', { 
                params:{userId}
            });
            setFoodPref(foodData.data);
        }
        if (userId){
            fetchData()
        }
    }, [userId])
    return(
        <div className={classes.root}>
            <AppBarHome/>
            <TabBarHome/>
        </div>
    )
}

export default HomePage;
