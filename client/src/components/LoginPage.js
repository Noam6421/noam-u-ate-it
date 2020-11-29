import React, { useContext } from 'react'
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/context';
import axios from 'axios';

const CLIENT_ID = '988769699236-iia7fttlj2p46hoaisu04lh81cnd10co.apps.googleusercontent.com';

const LoginPage = () => {
    const { setUser } = useContext(AppContext);
    const history = useHistory();
    const login = async (response) => {
        setUser(response.profileObj.name);
        const data = await axios.post('/login',{user: response.profileObj.name});
        if (data.status === 200) {
            localStorage.setItem('data', JSON.stringify(data.data));
        };
        localStorage.setItem('user', response.profileObj.name)
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