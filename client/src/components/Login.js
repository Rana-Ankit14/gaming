import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'


const apis = require('../apis/apis')


export const Login = ({setIsLogin,isLogin}) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage,setErrorMessage]= useState({status: false, message:''})

    useEffect(()=>{
        if(isLogin){
            history.push('/')
        }
    },[]);

    const handleChange = (e) => {
        const name = e.target.name;
        if (name === 'email') {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('******** Login **********')

        const data = await apis.postApiCall('/user/login',{email, password})

        if(data.isLogin){
            setErrorMessage({status: true,message:data.message})
            localStorage.setItem('user', JSON.stringify(data));
            setIsLogin(true);
            history.push('/standings');
        }else {
            setPassword('');
            setErrorMessage({status: true,message:data.message})
        }
    }

    return (
        <div className="row d-flex justify-content-center">
            <h1 className="col-12 display-4">Login</h1>
            <form onSubmit={handleSubmit} className="col-md-6 col-lg-4 col-10 border border-dark rounded">
                {errorMessage.status ? (<small className="text-danger h6">{errorMessage.message}</small>) : (<></>)}
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' required className="form-control" value={email} onChange={handleChange}
                           placeholder="Enter Email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required value={password} className="form-control" onChange={handleChange}
                           placeholder="Enter Password"/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-secondary"/>
                </div>
            </form>
        </div>
    );
};

