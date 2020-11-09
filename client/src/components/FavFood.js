import React, { useContext, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, FormControlLabel, Button, Checkbox} from '@material-ui/core';
import AppContext from '../context/context';
import axios from 'axios';

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
    const { user, name, lastName, 
        birthDate, isMinor, 
        beer, idNum, phone, 
        checkedList, setCheckedList,
        foodList
    } = useContext(AppContext);
    const classes = useStyles();
    const textInput = useRef()
    const [other, setOther] = useState('');
    const [otherChecked, setOtherChecked] = useState(false);
    const [userMes, setUserMes] = useState('');
    // const { favFoodList } = useContext(AppContext);
    const handleCheckedChange = (e) => {
        if (e.target.id === 'other') {
            textInput.current.focus();
            setOtherChecked(!otherChecked)
        } else if (checkedList.includes(e.target.name)) {
            setCheckedList(checkedList.filter(food => food !== e.target.name));
        } else {
            setCheckedList([...checkedList, e.target.name]);
        }
    }
    const handleOtherChange = (e) => {
        setOther(e.target.value)
    } 
    const handleSubmit = () => {
        axios.post('/home', { data: {user, name, lastName, 
            birthDate, isMinor, 
            beer, idNum, phone, checkedList}, other, otherChecked})
        .then((res) => {
            localStorage.setItem('data', JSON.stringify(res.data.data)) 
            setUserMes(res.data.mes);
        })
    }
    return(
        <div className={classes.root}>
            {foodList.map((food) => (
                <div>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={checkedList.includes(food)}
                            onChange={handleCheckedChange}
                            name={food}
                            color="primary"
                        />
                        }
                        label={food}
                    />
                </div>
            ))}
            <div>
                <FormControlLabel
                    control={
                    <Checkbox
                        id="other"
                        checked={checkedList.includes(other) || otherChecked}
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
