import React, { useState } from 'react';
import {setUserSession} from './Utils/Common';
import axios from 'axios';
let Login=(props)=>{
    // const [state, setState] = useState(initialStateValue)
    // state: định nghĩa tên của state
    // setState: định nghĩa tên function dùng cho việc update state
    // initialStateValue: là giá trị ban đầu của state.
    // useState(initialState) returns an array where the first item is the state value. Luckily, the second item is a function that updates the state!
    const username=useFormInput('');
    const password=useFormInput('');
    const [error, setError]=useState(null);
    const [loading, setLoading]=useState(false);

    const handleLogin=()=>{
        setError(null);
        setLoading(true);
        axios.post('http://45.119.213.117:5000/api/v1/users/login',{
            username: username.value,
            password: password.value
        }).then(res=>{
            // console.log(res)
            setLoading(false);
            setUserSession(res.data.accessToken.value, username.value)
            props.history.push('/listcompany');
        }).catch(error=>{
            setLoading(false);
            if (error.response.data.code === 404) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        })
        // Chuyen vao trang dashboard khi nguoi dung dang nhap thanh cong
    }
    // console.log({...username})
    return(
        <div>
            Login<br/>
            Username<br/>
            <input type='text' {...username} autoComplete='new-password'/><br/>
            Password<br/>
            <input type='password' {...password} autoComplete='new-password'/>
            {error && <><small style={{ color: 'red' }}>{error}</small><br/></>}<br/>
            <input type='button' value={loading?'Loading...':'Login'} onClick={handleLogin} disabled={loading}/>
        </div>
    )
}
const useFormInput=initialValue=>{
    const [value, setValue]=useState(initialValue);
    const handleChange=event=>{
        setValue(event.target.value)
    }
    return{
        value,
        onChange: handleChange
    }
}

export default Login;