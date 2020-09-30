import React from 'react';
import {useForm} from 'react-hook-form';
import {patchDataToServer} from './Utils/Common';
 const RechargeForUser=()=>{
    const {register, handleSubmit, reset, errors}=useForm();
    const onSubmit=(data, e)=>{
        console.log(data)
        patchDataToServer(`http://45.119.213.117:5000/api/v1/account/asset/username/${data.username}`, data)
        e.target.reset()
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <td><input name='username' ref={register({ required: true })}/></td>
                    </tr>
                    <tr>
                        <th>Số tiền</th>
                        <td><input type='number' name='asset' ref={register({ required: true })}/></td>
                    </tr>
                </tbody>
            </table>
            <input type='submit' value='Thêm tiền thêm vui'></input>
        </form>
    )
 }

 export default RechargeForUser;