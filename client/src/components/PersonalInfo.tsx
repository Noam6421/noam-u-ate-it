import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Grid, makeStyles } from '@material-ui/core';

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

interface FormData {
    name: string
    lastName: string
    birthDate: Date
    beer?: string 
    idNum: string
    phone: string
}

const PersonalInfo = () => {

    const userInfo = useSelector<UserState, User>((state) => state.user)
    const dispatch = useDispatch()
    const classes = useStyles();
    const { setTab } = useContext(AppContext);
    
    useEffect(() => {
        reset(userInfo)
    }, [])

    const { register, handleSubmit, watch, errors, control, setValue, reset,  } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const birthDateValue = watch('birthDate');

    const onSubmit = (data:FormData) => {
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
                        <p>{errors.beer?.message}</p>
                        </Grid>
                    }
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <TextField
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


