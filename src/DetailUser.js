import React, {useState, useEffect} from 'react';
import {postDataToServer, getStockCode} from './Utils/Common';
import {useForm} from 'react-hook-form';

const DetailUser=(props)=>{
    // console.log(props.history.location.state.userId);
    const [stockCode, setStockCode]=useState([]);
    useEffect(()=>{
        const fetchData=async ()=>{
            // Lấy tất cả stockCode để làm menu dropdown
            const result=await getStockCode()
            setStockCode(result)
        }
        fetchData();
    }, []);
    const {register, handleSubmit}=useForm();
    const onSubmit=(data, e)=>{
        data.idAccount=props.history.location.state.userId;
        data.commandType=parseInt(data.commandType)
        data.price=parseInt(data.price)
        data.volume=parseInt(data.volume)
        postDataToServer('//45.119.213.117:5000/api/v1/command/insert', data)
        e.target.reset()
    }
    return(
        <div>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <table>
                    <tbody>
                        <tr>
                            <th>Mã cổ phiếu</th>
                            <td>
                                <select name='stockCode' ref={register({ required: true })}>
                                    {stockCode.map((value, index)=>{
                                        return(
                                            <option key={index} value={value}>{value}</option>
                                        )
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Mua/Bán</th>
                            <td>
                                <select name='commandType' ref={register({ required: true })}>
                                    <option value='0'>Mua</option>
                                    <option value='1'>Bán</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Giá</th>
                            <td><input type='number' name='price' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Khối lượng</th>
                            <td><input type='number' name='volume' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Bán khống</th>
                            <td>
                                <label className="container"> <input type="checkbox" name='isShortSale' ref={register({})}/> <span className="background"></span> <span className="mask"></span> </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button>Thao túng thị trường</button>
            </form>
        </div>
    )
}

export default DetailUser;