import React, { useEffect, useState } from 'react';
import {getDataFromServer, renderTheadTable, postDataToServer} from './Utils/Common';
import {omit} from 'lodash';

const ListUser=(props)=>{
    console.log(props)
    const [data, setData]=useState([])
    const [totalPage, setTotalPage]=useState(0)
    useEffect(()=>{
        const fetchData=async ()=>{
            const result=await getDataFromServer('http://45.119.213.117:5000/api/v1/users/all?pageSize=10&pageNumber=1&role=all')
            setTotalPage(result.data.totalPages)
            setData(result.data.data)
        }
        fetchData();
    }, []);

    const handleClick=async(i)=>{
        const result=await getDataFromServer(`http://45.119.213.117:5000/api/v1/users/all?pageSize=10&pageNumber=${i}&role=all`)
        console.log(result)
        setData(result.data.data)
        // console.log(i)
    }

    let titleArr = ['STT', 'Username', 'Asset', 'Short sale asset', 'Buying power', 'Block']
    let pageButton=[];
    for(let i=1; i<totalPage+1; i++){
        pageButton.push(<button onClick={()=>handleClick(i)} key={i}>{i}</button>)
    }
    console.log(data)
    let sortData = Object.entries(data).sort((a, b)=>b[1].account.asset-a[1].account.asset);
    console.log(data[1])
    let convertArrayToObj = sortData.map((value)=>value[1])
    console.log(convertArrayToObj)
    return(
        <div>
            <table className='responsive-table'>
                {renderTheadTable(titleArr)}
                <tbody>
                    {convertArrayToObj.map((value, index)=>{
                        value.index=index;
                        value.history=props.history;
                        return(
                            <UserDetail changeStateListUser={{handleClick}} key={index} {...value}/>
                        )
                    })}
                </tbody>
            </table>
            {pageButton}
        </div>
    )
}

let UserDetail=(props)=>{
    let userIndex=[props.index];
    let userId=props._id;
    let dataAccount = omit(props.account, ['_id', 'userId', 'created', 'updated', 'shares', 'tradingMoney', 'buyingPower']);
    let rawData = omit(props, ['_id', 'fullName', 'created', 'key', 'account', 'gender', 'email', 'roles', 'index', 'history', 'changeStateListUser'])
    // console.log(rawData)
    // console.log(dataAccount)
    const dataTmp = Object.keys(rawData).map(key => rawData[key]).concat(Object.keys(dataAccount).map(key => dataAccount[key]));
    const data = userIndex.concat(dataTmp);
    // console.log(data)
    const onSubmitBlockUser=async (e)=>{
        // console.log(userId);
        await postDataToServer('http://45.119.213.117:5000/api/v1/users/block',{
            userId: userId
        })
        // window.location.reload();
        props.changeStateListUser(1)
    }

    const directToDetailUser=()=>{
        props.history.push('./detailuser', {
            userId: userId
        })
    }

    return(
        <tr>
            {data.map((value, index)=>{
                return <td key={index}>{value}</td>
            })}
            <td>
                <div className='box'>
                    {/* <form className='box-item1' onSubmit={handleSubmit(onSubmitBlockUser)}> */}
                    <button className='box-item1' onClick={onSubmitBlockUser}>Block User</button>
                    {/* </form> */}
                    {/* <form className='box-item2'>
                    <input type='submit' value='Loading'></input>
                    </form> */}
                    <button className='box-item2'>Loading</button>
                    <button className='box-item3' onClick={directToDetailUser} title='Detail'>Chiếm quyền</button>
                </div>
            </td>
        </tr>
    )
}

export default ListUser;