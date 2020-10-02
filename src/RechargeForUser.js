import React from 'react';
import {useForm} from 'react-hook-form';
import {patchDataToServer} from './Utils/Common';
import NumberFormat from 'react-number-format';
import { TextField } from 'react-textfield';
 const RechargeForUser=()=>{
    const {register, handleSubmit, reset, errors}=useForm();
    const onSubmit=(data, e)=>{
        let asset = data.asset.replace(/,/g, '');
        console.log(asset)
        patchDataToServer(`http://45.119.213.117:5000/api/v1/account/asset/username/${data.username}`, {
            "asset": parseInt(asset)
        })
        e.target.reset()
    }
    return(
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <td><input name='username' ref={register({ required: true })}/></td>
                    </tr>
                    <tr>
                        <th>Số tiền</th>
                        {/* <td><input type='number' name='asset' ref={register({ required: true })}/></td> */}
                        <td><NumberFormat customInput={TextField} thousandSeparator={true} name='asset' getInputRef={register({ required: true })}/></td>
                    </tr>
                </tbody>
            </table>
            <button>Thêm tiền thêm vui</button>
        </form>
    )
 }

 export default RechargeForUser;