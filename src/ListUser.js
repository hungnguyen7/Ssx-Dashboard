import React, { useEffect, useState } from 'react';
import {getDataFromServer, renderTheadTable, RowDetail} from './Utils/Common';
const ListUser=()=>{
    const [data, setData]=useState([])
    useEffect(()=>{
        const fetchData=async ()=>{
            const result=await getDataFromServer('http://45.119.213.117:5000/api/v1/users/all')
            console.log(result.data.data[1].account)
        }
        fetchData();
    }, []);
    console.log(data)    
    // let titleArr = ['ID', 'name', 'stockCode', 'stockExchange', 'volume', 'currentListedVolume', 'numberOfShortSale', 'price', 'marketCap', 'marketCapRate', 'baseListedVolume','baseListedPrice',
// 'baseMarketCap', 'career']
    // setData(data.account.shares)
    return(
        <p>fsd</p>
    )
}

export default ListUser;