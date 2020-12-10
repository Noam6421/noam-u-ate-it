import { Provider } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import AppRouter from './AppRouter';
import AppContext from './context/context';
import { store, persistor} from './store/store';

const App = () => {

    const [user, setUser] = useState<string>('');
    const [userId, setUserId] = useState<number>();
    const [email, setEmail] = useState<string>('');
    const [tab, setTab] = useState<number>(0);
    const [foodList, setFoodList] = useState<[]>([]);
    //const [foodList, setFoodList] = useState<Food[]>([]);
    const [foodPref, setFoodPref] = useState<[]>([]);
    const [formError, setFormError] = useState<boolean>(false);

    const contextValues = { 
        user, setUser, 
        userId, setUserId, 
        email, setEmail, 
        tab, setTab, 
        foodList, setFoodList, 
        foodPref, setFoodPref,
        formError, setFormError
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        const loggedInUserEmail = localStorage.getItem('email');
        if (loggedInUser && loggedInUserEmail) {
          setUser(loggedInUser);
          setEmail(loggedInUserEmail)
        }
      }, []);

    return (
        <AppContext.Provider value={contextValues}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppRouter/>
                </PersistGate>
            </Provider>
        </AppContext.Provider>
    )
}

export { App as default };