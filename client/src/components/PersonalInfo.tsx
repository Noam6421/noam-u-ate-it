import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { ChangeEvent, ReactNode, useContext, useEffect } from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Box, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Button, Grid } from '@material-ui/core';

import AppContext from '../context/context';
import schema from './form/personalInfoSchema';
import { Controller, useForm } from 'react-hook-form';

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
        width: 200,
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
    var showBeer = false;
    const classes = useStyles();
    const { setTab, name, setName, lastName, setLastName, 
            birthDate, setBirthDate, 
            beer, setBeer, idNum, setIdNum, phone, setPhone 
    } = useContext(AppContext);
    const { register, handleSubmit, watch, errors, control, setValue } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {beer}
    });
    const birthDateValue = watch('birthDate');
    const onSubmit = (data:FormData) => {
        alert(JSON.stringify(data))
        if (Object.keys(errors).length === 0){
            setName(data.name);
            setLastName(data.lastName);
            setBirthDate(data.birthDate);
            setBeer(data.beer);
            setIdNum(data.idNum);
            setPhone(data.phone);
            setTab(1);
        }
    };
    useEffect(() => {
        setValue('name', name);
        setValue('lastName', lastName);
        setValue('birthDate', birthDate);
        setValue('beer', beer);
        setValue('idNum', idNum);
        setValue('phone', phone);
    }, [])
    let min_date = moment().subtract(18, 'years');
    return(
        <div className={classes.root} dir="rtl">
            <form onSubmit={handleSubmit(onSubmit)} id='personalInfo'>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <TextField
                            name="name"
                            label="שם פרטי"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register}
                            id="name"
                            variant="outlined"
                        />
                        <p>{errors.name?.message}</p>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            name="lastName"
                            label="שם משפחה"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register}
                            required
                            id="lastName"
                            variant="outlined"
                        />
                        <p>{errors.lastName?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Controller
                            name="birthDate"
                            control={control}
                            render={props =>
                                <TextField
                                    name="birthDate"
                                    id="birthDate"
                                    label="תאריך לידה"
                                    type="date"
                                    variant="outlined"
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
                                name="beer"
                                control={control}
                                render={props =>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="beer-label">מה הבירה האהובה עלייך?</InputLabel>
                                        <Select
                                            id="beer"
                                            name="beer"
                                            onChange={(newValue) => props.onChange(newValue)}
                                            value={props.value}
                                            label="מה הבירה האהובה עלייך?"
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
                            name="idNum"
                            label="ת.ז"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            id="idNum"
                            variant="outlined"
                            inputRef={register}
                        />
                        <p>{errors.idNum?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <TextField
                            name="phone"
                            label="טלפון"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            id="phone"
                            variant="outlined"
                            inputRef={register}
                        />
                        <p>{errors.phone?.message}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <Button 
                            variant="contained" 
                            type="submit" 
                            form="personalInfo"
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


