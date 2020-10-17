import React from 'react';
import {useForm} from 'react-hook-form';
import {postDataToServer} from './Utils/Common';

const ConfirmSession=()=>{
    const {register, handleSubmit}=useForm();
    const onSubmit=(data, e)=>{
        // Loai bo cac dau , phan cach phan nghin: 1,000
        postDataToServer('http://45.119.213.117:5000//api/v1/derivative/confirm-all',data)
        e.target.reset()
    }
    return(
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <table>
                <tbody>
                    <tr>
                        <th>Code</th>
                        <td><input name='derivativeCode' ref={register({ required: true })}/></td>
                    </tr>
                </tbody>
            </table>
            <button>Thêm tiền thêm vui</button>
        </form>
    )
}

export default ConfirmSession;