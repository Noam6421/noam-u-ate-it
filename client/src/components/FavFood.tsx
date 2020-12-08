import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { TextField, FormControlLabel, Button, Checkbox, Grid} from '@material-ui/core';

import schema from './form/favFoodSchema';
import AppContext from '../context/context';


interface Food {
    name: string;
    value: number;
    id?: number;
}

interface FormData {
    other?: string; 
    otherText?: string;
    foods: [];
}

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
    const classes = useStyles();
    const [other, setOther] =  useState(false);
    const [otherText, setOtherText] = useState('');
    const [userMes, setUserMes] = useState('');
    const [checkedList, setCheckedList] = useState(foodPref);
    const handleCheckedChange = (food: {name: string, value: number}) => {
        if (checkedList.some((checkedItem: Food) => checkedItem.name === food.name)) {
            const newFoods = checkedList.filter((checkedItem: Food) => checkedItem.name !== food.name )
            setCheckedList(newFoods);
            return newFoods
        } else {
            const newFoods = [...checkedList, {name: food.name, value: food.value}]
            setCheckedList(newFoods);
            return newFoods
        }
    }
    const { register, handleSubmit, watch, errors, control, setValue } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const otherValue = watch('other');
    useEffect(() => {
        console.log(otherValue);
        //setValue('name', name);
    }, [otherValue])
    const validateForm = async () => {
        if (foodPref.length === 0 && other === false) {
            setUserMes('יש לבחור לפחות העדפת אוכל אחת')
            return false
        } else if (other) {
            if (otherText === ''){
                setUserMes('אם שדה אחר מסומן, יש למלא ערך')
                return false
            } else if (foodList.some((food: Food) => food.name === otherText)){
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
        if (other) {
            const newFoodData = await axios.post('/food', {otherText})
            return ([...foodPref, {name: otherText, value: newFoodData.data.id}]);
        } else {
            return foodPref
        }
    }
    const onSubmit = async (data:FormData) => {
        setFormError(false)
        setUserMes('')
        alert(JSON.stringify(data))
        if (Object.keys(errors).length === 0 || errors == null){
            setOther(data.other === 'true' ? true : false);
            setOtherText(typeof data.otherText === 'string' ? data.otherText : '')
            setFoodPref(data.foods);
        }
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
                    const updatedUser = await axios.put('/user', {name, email, lastName, 
                        birthDate, isMinor, beer, 
                        idNum, phone})
                    const userId = updatedUser.data.userId; 
                    const foodPrefWithOther = await addOther();
                    await axios.put('/foodPref', {
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
            <form onSubmit={handleSubmit(onSubmit)} id='favFood'>
                {foodList.map((food: Food) => (
                        <Grid item xs={3}>
                            <Controller
                                control={control}
                                name='foods'
                                render={props => 
                                    <Checkbox
                                        name={food.name}
                                        value={food.value}
                                        checked={checkedList.some((checkedItem: Food) => checkedItem.name === food.name)}
                                        color="primary"
                                        onChange={() => props.onChange(handleCheckedChange({name: food.name, value: food.value}))}
                                    />
                                }
                            />
                            <label>{food.name}</label>
                        </Grid>
                ))}
                <Grid container spacing={4}>
                    <Grid item xs={1}>
                        <Controller
                            control={control}
                            name="other"
                            render={props => 
                                <Checkbox
                                    name="other"
                                    id="other"
                                    onChange={(e) => props.onChange(e.target.checked)}
                                    checked={props.value}
                                />
                            }
                        />
                        <label>אחר</label>
                    </Grid>
                    {otherValue &&
                        <Grid item xs={3}>
                            <TextField
                                name="otherText"
                                label="אוכל אחר"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputRef={register}
                                id="otherText"
                                variant="outlined"
                            />
                            <p>{errors.other?.message}</p>
                        </Grid>
                    }
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Button 
                        variant="contained" 
                        type="submit" 
                        form="favFood"
                        >
                            סיום
                        </Button>
                    </Grid>
                </Grid>
                {userMes !== '' && 
                        <p>{userMes}</p> 
                }
            </form>
        </div>
    )
}

export default FavFood;
