import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBarHome from './AppBarHome';
import AppContext from '../context/context';
import TabBarHome from './TabBarHome';
import axios from 'axios';

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
    const {  setName, setEmail, setLastName, 
            setBirthDate, setIsMinor, 
            setBeer, setIdNum, setPhone, setCheckedList, setFoodList
    } = useContext(AppContext);
    useEffect(() => {
        const data = localStorage.getItem("data");
        console.log(data);
        if (data) {
            const objData = JSON.parse(data);
            setName(objData.name);
            setLastName(objData.lastName);
            setBirthDate(objData.birthDate);
            setIsMinor(objData.isMinor);
            setBeer(objData.beer);
            setIdNum(objData.idNum);
            setPhone(objData.phone);
            setCheckedList(objData.checkedList)
        }
        // axios.get('/home')
        // .then((res) => {
        //     let foods = res.data.split(',');
        //     setFoodList(foods);
        // })
      }, []);
    return(
        <div className={classes.root}>
            <AppBarHome/>
            <TabBarHome/>
        </div>
    )
}

export default HomePage;
