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
    const { setUser, email, 
        userId, setUserId, 
        setEmail, setName, 
        setLastName, 
        birthDate, setBirthDate, 
        setIsMinor, foodPref, foodList, 
        setBeer, setIdNum, 
        setPhone, setFoodPref,
        setValue
    } = useContext(AppContext);  
    const fetchData= async () => {
        const res = await axios.get('/user',{
            params: { email: localStorage.getItem('email') }
            });
        if (res.status === 200) {
            if (res.data.userId === 'newUser'){
                setValue(0)
            } else {
                //if user exists sets his data to stata
                setUserId(res.data.userData.id)
                setName(res.data.userData.name);
                setLastName(res.data.userData.lastName);
                setBirthDate(res.data.userData.birthDate);
                setBeer(res.data.userData.beer);
                setIdNum(res.data.userData.idNum);
                setPhone(res.data.userData.phone);
                // according to his birthDate sets isMinor state
                console.log(birthDate);
                var currentDate: Date = new Date();
                var ageDifMs = currentDate.getTime() - birthDate.getTime();
                var ageDate: Date = new Date(ageDifMs); // miliseconds from epoch
                var age = Math.abs(ageDate.getUTCFullYear() - 1970)
                if (age > 18){
                    setIsMinor(false);
                }
            }
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
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
