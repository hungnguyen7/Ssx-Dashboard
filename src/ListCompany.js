import React, { useEffect, useState } from 'react';
import {getDataFromServer, renderTheadTable, patchDataToServer} from './Utils/Common';
import {omit} from 'lodash';
import {useForm} from 'react-hook-form';

const ListCompany=()=>{
    const [data, setData]=useState([])
    useEffect(()=>{
        const fetchData=async ()=>{
            const result=await getDataFromServer('http://45.119.213.117:5000/api/v1/company/all')
            console.log(result.data.data)
            setData(result.data.data);
        }
        fetchData();
    }, []);
    // console.log(data)
    let title = ['Mã CP', 'Stock Exchange','Khối lượng', 'Number of short sale', 'Giá', 'Market cap', 'Market cap rate', 'Base listed volume', 'Base listed price', 'Base market cap','Edit', 'ABC']
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
    // console.log(row)
    // Lay companyId de gui du lieu
    let companyId=row._id;
    // Loai bo mot so properties khong can thiet
    let rawData = omit(row, ['_id', 'updatedAt', 'createdAt', 'name', 'career'])
    // const key = Object.keys(row);
    const data = Object.keys(rawData).map(key => rawData[key]);
    // console.log(key)
    // console.log(data.length)
    // console.log(companyId)
    const onSubmit=async (data, e)=>{
        console.log(data)
        console.log(companyId)
         await patchDataToServer(`http://45.119.213.117:5000/api/v1/company/${companyId}`, {
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