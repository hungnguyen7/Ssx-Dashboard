import React, { useEffect, useState } from 'react';
import {getDataFromServer, renderTheadTable, patchDataToServer} from './Utils/Common';
import {omit} from 'lodash';
import {useForm} from 'react-hook-form';

const ListCompany=()=>{
    const [data, setData]=useState([])
    useEffect(()=>{
        const fetchData=async ()=>{
            const result=await getDataFromServer('//45.119.213.117:5000/api/v1/company/all')
            setData(result.data.data);
        }
        fetchData();
    }, []);
    // console.log(data)
    let title = ['Mã CP', 'Khối lượng','Khối lượng hiện tại', 'Số lượng bán khống', 'Giá', 'Vốn hóa TT', 'Tỉ lệ vốn hóa TT', 'KL niêm yết CS', 'Giá niêm yết CS', 'Vốn hóa TT CS','Edit']
    return(
        <table className='responsive-table' border='1'>
            {renderTheadTable(title)}
            <tbody>
                {data.map((value, index)=>{
                    return(
                        <RowDetail key={index} {...value}/>
                    )
                })}
            </tbody>
        </table>
    )
}

const RowDetail=(row)=>{
    const {register, handleSubmit}=useForm();
    // Lấy companyId để gửi dữ liệu
    let companyId=row._id;
    // Loại bỏ properties không cần hiển thị
    let rawData = omit(row, ['_id', 'updatedAt', 'createdAt', 'name', 'career', 'stockExchange'])
    console.log(Object.keys(rawData))
    // Covert sang array để render
    const data = Object.keys(rawData).map(key => rawData[key]);
    const onSubmit=async (data, e)=>{
         await patchDataToServer(`//45.119.213.117:5000/api/v1/company/${companyId}`, {
             "volume": parseInt(data.volume)
         })
         e.target.reset()
         window.location.reload()
     }

    return(
        <tr>
            {data.map((value, index)=>{
                return <td key={index}>{value}</td>
            })}
            <td>
                <form className='submittable' onSubmit={handleSubmit(onSubmit)}>
                    <input type='number' name='volume' ref={register({ required: true })}/>
                    <input type='submit' value={'Submit'}></input>
                </form>
            </td>
        </tr>
    )
}
export default ListCompany;