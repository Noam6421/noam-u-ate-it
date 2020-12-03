import React, { useState, useEffect } from 'react';

import AppRouter from './AppRouter';
import AppContext from './context/context';

const App = () => {
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState<number>();
    const [email, setEmail] = useState('');
    const [value, setValue] = useState(0);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date('2014-08-18T21:11:54'));
    const [isMinor, setIsMinor] = useState(true);
    const [beer, setBeer] = useState('');
    const [idNum, setIdNum] = useState('');
    const [phone, setPhone] = useState('');
    const [checkedList, setCheckedList] = useState([]);
    const [foodList, setFoodList] = useState([]);
    const [foodPref, setFoodPref] = useState([]);
    const [formError, setFormError] = useState(false);
    const contextValues = { 
        user, setUser, 
        userId, setUserId, 
        email, setEmail, 
        value, setValue, 
        name, setName, 
        lastName, setLastName, 
        birthDate, setBirthDate, 
        isMinor, setIsMinor, 
        beer, setBeer, 
        idNum, setIdNum, 
        phone, setPhone, 
        checkedList, setCheckedList, 
        foodList, setFoodList, 
        foodPref, setFoodPref,
        formError, setFormError
    };
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const loggedInUserEmail = localStorage.getItem("email");
        if (loggedInUser && loggedInUserEmail) {
          setUser(loggedInUser);
          setEmail(loggedInUserEmail)
        }
      }, []);
    return (
        <AppContext.Provider value={contextValues}>
            <AppRouter/>
      </AppContext.Provider>
    )
}

export { App as default };