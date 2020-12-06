import React, { ChangeEvent, ReactNode, useContext } from 'react'
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Box, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core';

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

const PersonalInfo = () => {
    const classes = useStyles();
    const { setValue, name, setName, lastName, setLastName, 
            birthDate, setBirthDate, isMinor, setIsMinor, 
            beer, setBeer, idNum, setIdNum, phone, setPhone 
    } = useContext(AppContext);
    const alphaRegex = /^[a-z\u0590-\u05fe]+$/i;
    const handleNameChange = (e: {target: {value: string}}) => {
        if ((e.target.value === '' || alphaRegex.test(e.target.value)) && e.target.value.length <= 50) {
          setName(e.target.value)
        }    
    }
    const handleLastNameChange = (e: {target: {value: string}}) => {
        if ((e.target.value === '' || alphaRegex.test(e.target.value)) && e.target.value.length <= 50) {
          setLastName(e.target.value)
        }    
    }
    const handleBirthDateChange = (date: MaterialUiPickersDate) => {
        setBirthDate(date);
        var currentDate: Date = new Date();
        var ageDifMs = currentDate.getTime() - birthDate.getTime();
        var ageDate: Date = new Date(ageDifMs); // miliseconds from epoch
        var age = Math.abs(ageDate.getUTCFullYear() - 1970)
        if (age > 18){
            setIsMinor(false);
        }
    }
    const handleBeerChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) => {
        setBeer(e.target.value);
    }
    const handleIdNumChange = (e: {target: {value: string}}) => {
        setIdNum(e.target.value);
    }
    const handlePhoneChange = (e: {target: {value: string}}) => {
        setPhone(e.target.value);
    }
    return(
        <div className={classes.root}>
            <Box display="flex">
                <Typography variant="h6">
                    שם פרטי
                </Typography>
                <TextField
                    required
                    id="name"
                    variant="outlined"
                    value={name}
                    onChange={handleNameChange}
                />
            </Box>
            <Box display="flex">
                <Typography variant="h6">
                    שם משפחה
                </Typography>
                <TextField
                    required
                    id="outlined"
                    variant="outlined"
                    value={lastName}
                    onChange={handleLastNameChange}
                />
            </Box>
            <Box display="flex">
                <Typography variant="h6">
                    תאריך לידה 
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        animateYearScrolling
                        id="date-picker-inline"
                        value={birthDate}
                        onChange={handleBirthDateChange}
                        maxDate = {new Date()}
                    />
                </MuiPickersUtilsProvider>
            </Box>
            <Box display="flex">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">מה הבירה האהובה עלייך?</InputLabel>
                    <Select
                        id="demo-simple-select-outlined"
                        value={beer}
                        onChange={handleBeerChange}
                        label="מה הבירה האהובה עלייך?"
                        autoWidth={true}
                        disabled={isMinor}
                    >
                        <MenuItem value={'Apa'}>APA</MenuItem>
                        <MenuItem value={'Ale'}>Ale</MenuItem>
                        <MenuItem value={'Lager'}>Lager</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box display="flex">
                <Typography variant="h6">
                     ת.ז
                </Typography>
                <TextField
                    required
                    id="idNum"
                    variant="outlined"
                    value={idNum}
                    onChange={handleIdNumChange}
                />
            </Box>
            <Box display="flex">
                <Typography variant="h6">
                    טלפון
                </Typography>
                <TextField
                    required
                    id="phone"
                    variant="outlined"
                    value={phone}
                    onChange={handlePhoneChange}
                />
            </Box>
            <Button variant="contained"  onClick={() => { setValue(1) }}>המשך</Button>
        </div>
    )
}

export default PersonalInfo;


