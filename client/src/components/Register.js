import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
const apis = require('../apis/apis')

export const Register = ({isLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [errorMessage,setErrorMessage]= useState({status: false, message:''})
    const history = useHistory();
    useEffect(()=>{
        if(isLogin){
            history.push('/')
        }
    },[]);


    const handleChange = (e) => {
        const name = e.target.name;
        if (name === 'email') {
            setEmail(e.target.value);
        } else if (name === 'password') {
            setPassword(e.target.value);
        } else if (name === 'name') {
            setName(e.target.value);
        } else {
            setConfirmPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordMatch(false);
            setPassword('');
            setConfirmPassword('')
        } else {
            setPasswordMatch(true);
            const data = await apis.postApiCall('/user/register',{email, password,name})
            if(data.isRegister){
                setErrorMessage({status: false,message:data.message})
                history.push('/login')
            }else {
                setConfirmPassword('')
                setPassword('');
                setErrorMessage({status: true,message:data.message})
            }
        }
    }

    return (
        <div className="row d-flex justify-content-center">
            <h1 className="col-12 display-4">Register</h1>
            <form onSubmit={handleSubmit} className="col-md-6 col-lg-4 col-10 border border-dark rounded">
                {errorMessage.status ? (<small className="text-danger h6">{errorMessage.message}</small>) : (<></>)}
                <div className="form-group col-12">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" required className="form-control" onChange={handleChange}
                           placeholder="Enter Name"/>
                </div>
                <div className="form-group col-12">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" required className="form-control" onChange={handleChange}
                           placeholder="Enter Email"/>
                </div>
                <div className="form-group col-12">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"  required className="form-control" value={password} onChange={handleChange}
                           placeholder="Enter Password"/>
                    {!passwordMatch ? (<small className="text-danger">Password Does Not Match</small>) : (<></>)}
                </div>
                <div className="form-group col-12">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" required className="form-control" value={confirmPassword} onChange={handleChange}
                           placeholder="Enter Password"/>
                    {!passwordMatch ? (<small className="text-danger">Password Does Not Match</small>) : (<></>)}
                </div>
                <div className="form-group col-12">
                    <input type="submit" value="Register" className="btn btn-secondary"/>
                </div>
            </form>
        </div>
    );
};

