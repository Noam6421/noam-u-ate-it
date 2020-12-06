import axios from 'axios';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import AppContext from '../context/context';

const clientId = process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID : '';


const LoginPage = () => {
    const { setUser, setEmail, setValue } = useContext(AppContext);    
    const history = useHistory();
    const login = (response: GoogleLoginResponseOffline | GoogleLoginResponse) => {
        if ("profileObj" in response){
            setUser(response.profileObj.name);
            setEmail(response.profileObj.email)
            localStorage.setItem('user', response.profileObj.name)
            localStorage.setItem('email', response.profileObj.email)
            setValue(0)
            history.push("/home");
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