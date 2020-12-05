import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useRef, useState, useEffect } from 'react'
import { TextField, FormControlLabel, Button, Checkbox} from '@material-ui/core';

import AppContext from '../context/context';

const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: 80,
    },
    root: {
      flexGrow: 1,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
}));

const FavFood = () => {
    const { user, userId, email, name, lastName, 
        birthDate, isMinor, 
        beer, idNum, phone, 
        checkedList, setCheckedList,
        setFoodList, foodList,
        setFoodPref, foodPref,
        formError, setFormError
    } = useContext(AppContext);
    const history = useHistory();
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get('/food')
            setFoodList(data.data); 
        }
        fetchData();
    }, []);
    // useEffect(() => {
    //     if (formError){
    //         setUserMes('Error')
    //     }
    // }, [formError]);
    const classes = useStyles();
    const textInput = useRef()
    const [other, setOther] = useState('');
    const [otherChecked, setOtherChecked] = useState(false);
    const [userMes, setUserMes] = useState('');
    const handleCheckedChange = (e) => {
        if (e.target.id === 'other') {
            textInput.current.focus();
            setOtherChecked(!otherChecked)
        } else if (foodPref.some(foodPrefItem => foodPrefItem.name === e.target.name)) {
            setFoodPref(foodPref.filter(foodPrefItem => foodPrefItem.name !== e.target.name ))
        } else {
            setFoodPref([...foodPref, {name: e.target.name, value: parseInt(e.target.value)}]);
        }
    }
    const handleOtherChange = (e) => {
        setOther(e.target.value)
    } 
    const validateForm = async () => {
        if (foodPref.length === 0 && otherChecked === false) {
            setUserMes('יש לבחור לפחות העדפת אוכל אחת')
            return false
        } else if (otherChecked) {
            if (other === ''){
                setUserMes('אם שדה אחר מסומן, יש למלא ערך')
                return false
            } else if (foodList.some(food => food.name === other)){
                setUserMes('מאכל זה כבר קיים ברשימה, אנא סמן אותו ומחק את אופציית אחר')
                return false
            } else{
                return true
            }
        } else {
            return true
        }
    }
    const addOther = async () => {
        if (otherChecked) {
            const newFoodData = await axios.post('/food', {other})
            return ([...foodPref, {name: other, value: newFoodData.data.id}]);
        } else {
            return foodPref
        }
    }
    const handleSubmit = async () => {
        setFormError(false)
        setUserMes('')
        const formValid = await validateForm()
        if (formValid) {
            if (!userId){
                try {
                    const newUser = await axios.post('/user', {user, email, name, lastName, 
                        birthDate, isMinor, beer, 
                        idNum, phone})
                    const userId = newUser.data.userId; 
                    const foodPrefWithOther = await addOther();
                    await axios.post('/foodPref', {
                        userId,
                        foodPref: foodPrefWithOther
                    })
                    setUserMes('משתמש נוצר')
                    history.push("/home");
                } catch (e) {
                    setUserMes('אחד מהשדות חסר!')
                }
            } else {
                try {
                    const updatedUser = await axios.patch('/user', {name, email, lastName, 
                        birthDate, isMinor, beer, 
                        idNum, phone})
                    const userId = updatedUser.data.userId; 
                    const foodPrefWithOther = await addOther();
                    await axios.patch('/foodPref', {
                        userId,
                        foodPref: foodPrefWithOther
                    })
                    setUserMes('משתמש עודכן')
                    history.push("/home");
                } catch (e) {
                    setUserMes('אחד מהשדות חסר!')
                }
            }
        }
    }
    return(
        <div className={classes.root}>
            {foodList.map((food) => (
                <div>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={
                                foodPref.some(foodPrefItem => foodPrefItem.name === food.name)
                            }
                            onChange={handleCheckedChange}
                            name={food.name}
                            value={food.value}
                            color="primary"
                        />
                        }
                        label={food.name}
                    />
                </div>
            ))}
            <div>
                <FormControlLabel
                    control={
                    <Checkbox
                        id="other"
                        checked={otherChecked}
                        onChange={handleCheckedChange}
                        name={other}
                        color="primary"
                    />
                    }
                    label={
                        <TextField 
                            id="standard-basic" 
                            value={other} 
                            placeholder="אחר" 
                            onChange={handleOtherChange}
                            inputRef={textInput} 
                        />
                    }
                />
            </div>
            <Button variant="contained" onClick={handleSubmit} >סיום</Button>
            {userMes !== '' && 
                    <p>{userMes}</p> 
            }
        </div>
    )
}

export default FavFood;
