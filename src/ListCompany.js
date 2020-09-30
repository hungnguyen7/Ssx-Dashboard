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
    console.log(data)
    // let titleArr = ['ID', 'name', 'stockCode', 'stockExchange', 'volume', 'currentListedVolume', 'numberOfShortSale', 'price', 'marketCap', 'marketCapRate', 'baseListedVolume','baseListedPrice']
    return(
        <table border='1'>
            {/* {renderTheadTable(titleArr)} */}
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
    const {register, handleSubmit, reset, errors}=useForm();
    // console.log(row)
    let companyId=row._id;
    let rawData = omit(row, ['_id', 'updatedAt'])
    // const key = Object.keys(row);
    const data = Object.keys(rawData).map(key => rawData[key]);
    // console.log(key)
    // console.log(data.length)
    // console.log(companyId)
    const onSubmit=(data, e)=>{
        console.log(data)
        console.log(companyId)
         patchDataToServer(`http://45.119.213.117:5000/api/v1/company/${companyId}`, {
             "volume": parseInt(data.volume)
         })
         e.target.reset()
     }

    return(
        <tr>
            {data.map((value, index)=>{
                return <td key={index}>{value}</td>
            })}
            <td>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type='number' name='volume' ref={register({ required: true })}/>
                    <input type='submit' value={'Submit'}></input>
                </form>
            </td>
        </tr>
    )
}
export default ListCompany;