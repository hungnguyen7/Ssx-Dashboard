import React from 'react';
import {useForm} from 'react-hook-form';
import {patchDataToServer} from './Utils/Common';
import NumberFormat from 'react-number-format';
import { TextField } from 'react-textfield';
 const RechargeForUser=()=>{
    const {register, handleSubmit}=useForm();
    const onSubmit=(data, e)=>{
        // Loai bo cac dau , phan cach phan nghin: 1,000
        let asset = data.asset.replace(/,/g, '');
        if(data.checkValue){
            patchDataToServer(`http://45.119.213.117:5000/api/v1/account/asset-derivative/username/${data.username}`, {
                "assetDerivative": parseInt(asset)/1000
            })
        }
        else{
            patchDataToServer(`http://45.119.213.117:5000/api/v1/account/asset/username/${data.username}`, {
                "asset": parseInt(asset)/1000
            })
        }
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
                    <tr>
                            <th>Phái sinh</th>
                            <td>
                                {/* <select name='isShortSale' ref={register({ required: true })}>
                                    <option value='true'>Yes</option>
                                    <option value='false'>No</option>
                                </select> */}
                                <label className="container"> <input type="checkbox" name='checkValue' ref={register({})}/> <span className="background"></span> <span className="mask"></span> </label>
                            </td>
                        </tr>
                </tbody>
            </table>
            <button>Thêm tiền thêm vui</button>
        </form>
    )
 }

 export default RechargeForUser;