import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import React, { useContext, useState, useEffect } from 'react';
import { TextField, Button, Checkbox, Grid } from '@material-ui/core';

import User from '../models/User';
import Food from '../models/Food';
import UserState from '../models/UserState';
import FavFoodFormData from '../models/FavFoodFormData';

import schema from './form/favFoodSchema';
import AppContext from '../context/context';

const FavFood = () => {
    
    const userInfo = useSelector<UserState, User>((state) => state.user);
    const history = useHistory();

    const { userId, 
        setFoodList, foodList,
        setFoodPref, foodPref,
    } = useContext(AppContext);
    
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get('/food')
            setFoodList(data.data); 
        }
        fetchData();
    }, []);

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
    };

    const { register, handleSubmit, watch, errors, control, setValue } = useForm<FavFoodFormData>({
        resolver: yupResolver(schema),
        defaultValues: {foods: foodPref}
    });
    const otherValue = watch('other');

    const validateForm = async (data: FavFoodFormData) => {
        if (data.foods.length === 0 && data.other === 'false') {
            setUserMes('יש לבחור לפחות העדפת אוכל אחת')
            return false
        } else if (data.other === 'true') {
            if (data.otherText === ''){
                setUserMes('אם שדה אחר מסומן, יש למלא ערך')
                return false
            } else if (foodList.some((food: Food) => food.name === data.otherText)){
                setUserMes('מאכל זה כבר קיים ברשימה, אנא סמן אותו ומחק את אופציית אחר')
                return false
            } else{
                return true
            }
        } else {
            return true
        }
    };

    const addOther = async (data: FavFoodFormData) => {
        if (data.other === 'true') {
            const newFoodData = await axios.post('/food', {other: data.otherText})
            return ([...data.foods, {name: data.otherText, value: newFoodData.data.id}]);
        } else {
            return data.foods
        }
    };

    const onSubmit = async (data:FavFoodFormData) => {
        setUserMes('')
        console.log('FavFoodData', data);
        if (Object.keys(errors).length === 0 || errors == null){
            setOther(data.other === 'true' ? true : false);
            setOtherText(typeof data.otherText === 'string' ? data.otherText : '')
            setFoodPref(data.foods);
        }
        const formValid = await validateForm(data)
        if (formValid) {
            if (!userId){
                try {
                    const newUser = await axios.post('/user', {...userInfo})
                    const userId = newUser.data.userId; 
                    const foodPrefWithOther = await addOther(data);
                    await axios.post('/foodPref', {
                        userId,
                        foodPref: foodPrefWithOther
                    })
                    setUserMes('משתמש נוצר')
                    history.push('/home');
                } catch (e) {
                    setUserMes('אחד מהשדות חסר!')
                }
            } else {
                try {
                    const updatedUser = await axios.put('/user', {...userInfo})
                    const userId = updatedUser.data.userId; 
                    const foodPrefWithOther = await addOther(data);
                    await axios.put('/foodPref', {
                        userId,
                        foodPref: foodPrefWithOther
                    })
                    setUserMes('משתמש עודכן')
                    history.push('/home');
                } catch (e) {
                    setUserMes('אחד מהשדות חסר!')
                }
            }
        }
    };

    return(
        <div>
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
                                    color='primary'
                                    onChange={() => props.onChange(handleCheckedChange({name: food.name, value: food.value}))}
                                />
                            }
                        />
                        <label>{food.name}</label>
                    </Grid>
                ))}
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Controller
                            control={control}
                            name='other'
                            render={props => 
                                <Checkbox
                                    name='other'
                                    id='other'
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
                                name='otherText'
                                label='אוכל אחר'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputRef={register}
                                id='otherText'
                                variant='outlined'
                            />
                            <p>{errors.other?.message}</p>
                        </Grid>
                    }
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Button 
                        variant='contained' 
                        type='submit' 
                        form='favFood'
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
};

export default FavFood;
