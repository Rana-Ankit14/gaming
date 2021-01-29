import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export const PrivateRoute = ({component: Component,isLogin, setIsLogin, ...rest}) => {
    const user = JSON.parse(localStorage.getItem('user')) === null ? {isLogin : false}: JSON.parse(localStorage.getItem('user')) ;
    if (!user.isLogin){setIsLogin(false);}
    return (
        <Route
            {...rest} render={props => {
                if (user.isLogin){
                    return <Component  setIsLogin={setIsLogin} {... props} />;
                }else {
                    return <Redirect to="/login"/>
                }
        } }
        />
    );
};

