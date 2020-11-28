import React, { useState, useEffect } from 'react';
import AppContext from './context/context';
import AppRouter from './AppRouter';

const App = () => {
    const [user, setUser] = useState();
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
    const contextValues = { user, setUser, value, setValue, name, setName, lastName, setLastName, birthDate, setBirthDate, isMinor, setIsMinor, beer, setBeer, idNum, setIdNum, phone, setPhone, checkedList, setCheckedList, foodList, setFoodList };
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      }, []);
    return (
        <AppContext.Provider value={contextValues}>
            <AppRouter/>
      </AppContext.Provider>
    )
}

export { App as default };