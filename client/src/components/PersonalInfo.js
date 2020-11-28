import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Button, Grid } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import AppContext from '../context/context';
import DateFnsUtils from '@date-io/date-fns';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput';
import FormSelect from "./FormSelect";

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
    const methods = useForm();
    const { handleSubmit } = methods;
    const numberData = [
        {
        id: "10",
        label: "Ten",
        },
        {
        id: "20",
        label: "Twenty",
        },
        {
        id: "30",
        label: "Thirty",
        },
    ];
    const classes = useStyles();
    const { setValue, name, setName, lastName, setLastName, 
            birthDate, setBirthDate, isMinor, setIsMinor, 
            beer, setBeer, idNum, setIdNum, phone, setPhone 
    } = useContext(AppContext);
    const alphaRegex = /^[a-z\u0590-\u05fe]+$/i;
    const handleNameChange = (e) => {
        if ((e.target.value === '' || alphaRegex.test(e.target.value)) && e.target.value.length <= 50) {
          setName(e.target.value)
        }    
    }
    const handleLastNameChange = (e) => {
        if ((e.target.value === '' || alphaRegex.test(e.target.value)) && e.target.value.length <= 50) {
          setLastName(e.target.value)
        }    
    }
    const handleBirthDateChange = (date) => {
        setBirthDate(date);
        var currentDate = new Date();
        var ageDifMs = currentDate - date;
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        var age = Math.abs(ageDate.getUTCFullYear() - 1970)
        if (age > 18){
            setIsMinor(false);
        }
    }
    const handleBeerChange = (e) => {
        setBeer(e.target.value);
    }
    const handleIdNumChange = (e) => {
        setIdNum(e.target.value);
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }
    return(
        <div className={classes.root}>
            <FormProvider {...methods}>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormInput name="name" label="Name" />
                        </Grid>
                        <Grid item xs={6}>
                            <FormSelect name="sel" label="Numbers" options={numberData} />
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
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
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
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


