import React, { useEffect, useState } from 'react';
import {getDataFromServer, renderTheadTable} from './Utils/Common';
import {omit} from 'lodash';

const ListUser=()=>{
    const [data, setData]=useState([])
    useEffect(()=>{
        const fetchData=async ()=>{
            const result=await getDataFromServer('http://45.119.213.117:5000/api/v1/users/all')
            setData(result.data.data)
        }
        fetchData();
    }, []);
    let titleArr = ['STT', 'Username', 'Asset', 'Short sale asset', 'Buying power']
    return(
        <table border='1'>
            {renderTheadTable(titleArr)}
            <tbody>
                {data.map((value, index)=>{
                    value.id=index;
                    {/* console.log(value) */}
                    return(
                        <RowDetail key={index} {...value}/>
                    )
                })}
            </tbody>
        </table>
    )
}

const RowDetail=(row)=>{
    // const {register, handleSubmit, reset, errors}=useForm();
    // console.log(row)
    let companyId=[row.id];
    let dataAccount = omit(row.account, ['_id', 'userId', 'created', 'updated', 'shares', 'id']);
    let rawData = omit(row, ['_id', 'fullName', 'created', 'key', 'account', 'gender', 'email', 'roles', 'id'])
    // console.log(rawData)
    // console.log(dataAccount)
    const dataTmp = Object.keys(rawData).map(key => rawData[key]).concat(Object.keys(dataAccount).map(key => dataAccount[key]));
    const data = companyId.concat(dataTmp)
    return(
        <tr>
            {data.map((value, index)=>{
                return <td key={index}>{value}</td>
            })}
        </tr>
    )
}

export default ListUser;