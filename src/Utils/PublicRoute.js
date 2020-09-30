import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getToken} from './Common';

let PublicRoute=({component: Component, ...rest})=>{
    return(
        <Route {...rest} render={(props)=>{
            //sau khi dang nhap chuyen huong den listcompany
            return !getToken()?<Component {...props}/>:<Redirect to={{pathname:'listcompany'}}/>
        }}/>
    )
}

export default PublicRoute;