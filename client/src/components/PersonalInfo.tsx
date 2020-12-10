import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid, makeStyles } from '@material-ui/core';

import User from '../models/User';
import UserState from '../models/UserState';
import PersonalInfoFormData from '../models/PersonalInfoFormData';

import AppContext from '../context/context';
import useStyles from './PersonalInfoStyles';
import { updateUser } from '../store/actions';
import schema from './form/personalInfoSchema';

const beers: string[] = ['APA', 'Ale', 'Lager'];

const PersonalInfo = () => {

    const userInfo = useSelector<UserState, User>((state) => state.user)
    const dispatch = useDispatch()
    const classes = useStyles();
    const {
        userId, setFoodPref, setTab
    } = useContext(AppContext);

    useEffect(() => {
        reset(userInfo)
    }, [])

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
    }, [userId]);
    
    const { register, handleSubmit, watch, errors, control, setValue, reset,  } = useForm<PersonalInfoFormData>({
        resolver: yupResolver(schema),
    });

    const birthDateValue = watch('birthDate');

    const onSubmit = (data:PersonalInfoFormData) => {
        console.log('PersonalInfoData:', data);
        if (Object.keys(errors).length === 0){
            dispatch(updateUser({...data}))
            setTab(1);
        }
    };

    let min_date = moment().subtract(18, 'years');

    return(
        <div className={classes.root} dir='rtl'>
            <form onSubmit={handleSubmit(onSubmit)} id='personalInfo'>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <TextField
                            className={classes.formField}
                            name='name'
                            error={Boolean(errors.name)}
                            label='שם פרטי'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register}
                            id='name'
                            variant='outlined'
                        />
                        <p>{errors.name?.message}</p>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            className={classes.formField}
                            name='lastName'
                            label='שם משפחה'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register}
                            required
                            id='lastName'
                            variant='outlined'
                        />
                        <p>{errors.lastName?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Controller
                            name='birthDate'
                            control={control}
                            render={props =>
                                <TextField
                                    className={classes.formField}
                                    name='birthDate'
                                    id='birthDate'
                                    label='תאריך לידה'
                                    type='date'
                                    variant='outlined'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(newValue) => props.onChange(newValue)}
                                    value={props.value}
                                />
                            }
                        />
                        <p>{errors.birthDate?.message}</p>
                    </Grid>
                    {moment(birthDateValue).isBefore(min_date) &&
                        <Grid item xs={3}>
                            <Controller
                                name='beer'
                                control={control}
                                render={props =>
                                    <FormControl variant='outlined'>
                                        <InputLabel id='beer-label'>מה הבירה האהובה עלייך?</InputLabel>
                                        <Select
                                            className={classes.formField}
                                            id='beer'
                                            name='beer'
                                            onChange={(newValue) => props.onChange(newValue)}
                                            value={props.value}
                                            label='מה הבירה האהובה עלייך?'
                                            autoWidth={true}
                                        >
                                            {beers.map((beerItem) => (
                                                <MenuItem className={classes.menuItem} value={beerItem}>{beerItem}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>                                    
                                }
                            />
                        <p>{errors.beer?.message}</p>
                        </Grid>
                    }
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <TextField
                            className={classes.formField}
                            name='idNum'
                            label='ת.ז'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            id='idNum'
                            variant='outlined'
                            inputRef={register}
                        />
                        <p>{errors.idNum?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <TextField
                            className={classes.formField}
                            name='phone'
                            label='טלפון'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            id='phone'
                            variant='outlined'
                            inputRef={register}
                        />
                        <p>{errors.phone?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Button 
                            variant='contained' 
                            type='submit' 
                            form='personalInfo'
                        >
                            המשך
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default PersonalInfo;


