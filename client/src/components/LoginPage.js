import axios from 'axios';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import AppContext from '../context/context';

const CLIENT_ID = '988769699236-iia7fttlj2p46hoaisu04lh81cnd10co.apps.googleusercontent.com';

const LoginPage = () => {
    const { setUser, 
        userId, setUserId, 
        setEmail, setName, 
        setLastName, 
        birthDate, setBirthDate, 
        setIsMinor, foodPref, foodList, 
        setBeer, setIdNum, 
        setPhone, setFoodPref
    } = useContext(AppContext);    
    const history = useHistory();
    const login = async (response) => {
        setUser(response.profileObj.name);
        setEmail(response.profileObj.email)
        localStorage.setItem('user', response.profileObj.name)
        localStorage.setItem('email', response.profileObj.email)
        history.push("/home");
    }
    const handleLoginFailure = (response) => {
        alert('Failed to log in')
    }
    return(
        <div>
            <GoogleLogin
                clientId={ CLIENT_ID }
                buttonText='Login'
                onSuccess={login}
                onFailure={handleLoginFailure }
                cookiePolicy={ 'single_host_origin' }
                responseType='code,token'
            />
        </div>
    )
}

export default LoginPage;
