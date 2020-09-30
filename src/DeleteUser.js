import React from 'react';
import {useForm} from 'react-hook-form';
import {getIdUser} from './Utils/Common';
 const DeleteUser=()=>{
    const {register, handleSubmit, reset, errors}=useForm();
    const onSubmit=(data, e)=>{
        
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <td><input name='username' ref={register({ required: true })}/></td>
                    </tr>
                </tbody>
            </table>
            <input type='submit' value='Thêm tiền thêm vui'></input>
        </form>
    )
 }

 export default DeleteUser;