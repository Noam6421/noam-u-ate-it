import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid, makeStyles } from '@material-ui/core';

import User from '../models/User';
import UserState from '../models/UserState';
import GenericTextField from '../commons/GenericTextField';
import PersonalInfoFormData from '../models/PersonalInfoFormData';

import AppContext from '../context/context';
import { updateUser } from '../store/actions';
import schema from './form/personalInfoSchema';

const useStyles = makeStyles((theme) => ({
    logo: {
        maxWidth: 80,
    },
    root: {
      flexGrow: 1,
    },
    textField: {
        direction: 'rtl',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    legend:{
        textAlign: 'left'
    }
}));

const PersonalInfo = () => {

    const userInfo = useSelector<UserState, User>((state) => state.user)
    const dispatch = useDispatch()
    const classes = useStyles();
    const {
        userId, setFoodPref, setTab
    } = useContext(AppContext);

    useEffect(() => {
        methods.reset(userInfo)
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
    
    const methods = useForm<PersonalInfoFormData>({
        resolver: yupResolver(schema),
    });
    // const { register, handleSubmit, watch, errors, control, setValue, reset,  } = useForm<PersonalInfoFormData>({
    //     resolver: yupResolver(schema),
    // });

    const birthDateValue = methods.watch('birthDate');

    const onSubmit = (data:PersonalInfoFormData) => {
        console.log('PersonalInfoData:', data);
        if (Object.keys(methods.errors).length === 0){
            dispatch(updateUser({...data}))
            setTab(1);
        }
    };

    let min_date = moment().subtract(18, 'years');

    return(
        <div className={classes.root} dir='rtl'>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} id='personalInfo'>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <GenericTextField
                                name= 'name'
                                label='שם פרטי'
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <GenericTextField
                                name= 'lastName'
                                label='שם משפחה'
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <Controller
                                name='birthDate'
                                control={methods.control}
                                render={props =>
                                    <TextField
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
                            <p>{methods.errors.birthDate?.message}</p>
                        </Grid>
                        {moment(birthDateValue).isBefore(min_date) &&
                            <Grid item xs={3}>
                                <Controller
                                    name='beer'
                                    control={methods.control}
                                    render={props =>
                                        <FormControl variant='outlined' className={classes.formControl}>
                                            <InputLabel id='beer-label'>מה הבירה האהובה עלייך?</InputLabel>
                                            <Select
                                                id='beer'
                                                name='beer'
                                                onChange={(newValue) => props.onChange(newValue)}
                                                value={props.value}
                                                label='מה הבירה האהובה עלייך?'
                                                autoWidth={true}
                                            >
                                                <MenuItem value={'APA'}>APA</MenuItem>
                                                <MenuItem value={'Ale'}>Ale</MenuItem>
                                                <MenuItem value={'Lager'}>Lager</MenuItem>
                                            </Select>
                                        </FormControl>                                    
                                    }
                                />
                            <p>{methods.errors.beer?.message}</p>
                            </Grid>
                        }
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <GenericTextField
                                name= 'idNum'
                                label='ת.ז'
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <GenericTextField
                                name= 'phone'
                                label='טלפון'
                            />
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
            </FormProvider> 

        </div>
    )
}

export default PersonalInfo;


