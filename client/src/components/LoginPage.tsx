import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import AppContext from '../context/context';

const clientId = process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID : '';

const LoginPage = () => {
    const {
        setUser, setEmail, 
        userId, setUserId, 
        setName, 
        setLastName, 
        setBirthDate, 
        setBeer, setIdNum, 
        setPhone, setFoodPref,
        setTab
    } = useContext(AppContext);  
    const fetchData = async () => {
        const res = await axios.get('/user',{
            params: { email: localStorage.getItem('email') }
            });
        if (res.status === 200) {
            if (res.data.userId === 'newUser'){
                setTab(0);
                history.push("/home");
            } else {
                //if user exists sets his data to state
                setUserId(res.data.userData.id)
                setName(res.data.userData.name);
                setLastName(res.data.userData.lastName);
                setBirthDate(res.data.userData.birthDate);
                setBeer(res.data.userData.beer);
                setIdNum(res.data.userData.idNum);
                setPhone(res.data.userData.phone);
                setTab(0);
                history.push("/home");
            }
        }
    }

    const history = useHistory();
    const login = (response: GoogleLoginResponseOffline | GoogleLoginResponse) => {
        if ("profileObj" in response){
            setUser(response.profileObj.name);
            setEmail(response.profileObj.email)
            localStorage.setItem('user', response.profileObj.name)
            localStorage.setItem('email', response.profileObj.email)
            fetchData();
        }
    }
    const handleLoginFailure = () => {
        alert('Failed to log in')
    }
    return(
        <div>
            <GoogleLogin
                clientId={ clientId }
                buttonText='Login'
                onSuccess={login}
                onFailure={handleLoginFailure }
                cookiePolicy={ 'single_host_origin' }
                responseType='code,token'
            />
        </div>
    )
}

export { LoginPage as default };