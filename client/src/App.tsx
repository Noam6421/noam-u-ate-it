import React, { useState, useEffect } from 'react';

import AppRouter from './AppRouter';
import AppContext from './context/context';

const App = () => {
    const [user, setUser] = useState<string>('');
    const [userId, setUserId] = useState<number>();
    const [email, setEmail] = useState<string>('');
    const [value, setValue] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [birthDate, setBirthDate] = useState<Date>(new Date('2014-08-18T21:11:54'));
    const [isMinor, setIsMinor] = useState<boolean>(true);
    const [beer, setBeer] = useState<string>('');
    const [idNum, setIdNum] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [foodList, setFoodList] = useState<[]>([]);
    const [foodPref, setFoodPref] = useState<[]>([]);
    const [formError, setFormError] = useState<boolean>(false);
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