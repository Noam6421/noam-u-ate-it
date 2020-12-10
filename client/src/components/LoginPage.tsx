import axios from 'axios';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { getUser } from '../store/actions';
import AppContext from '../context/context';

const clientId = process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID : '';

const LoginPage = () => {

    const dispatch = useDispatch()
    const history = useHistory();

    const {
        setUser, 
        setEmail, 
        setUserId, 
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
                dispatch(getUser({...res.data.userData}))
                setUserId(res.data.userData.id)
                setTab(0);
                history.push("/home");
            }
        }
    }

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
        alert('Failed to log in');
    }
    
    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={login}
                onFailure={handleLoginFailure}
                cookiePolicy='single_host_origin'
                responseType='code,token'
            />
        </div>
    )
}

export { LoginPage as default };