import React, { useEffect, useState } from 'react';
import {getDataFromServer, renderTheadTable, postDataToServer} from './Utils/Common';
import {omit} from 'lodash';

const ListUser=(props)=>{
    const [data, setData]=useState([])
    const [totalPage, setTotalPage]=useState(0)
    useEffect(()=>{
        const fetchData=async ()=>{
            const result=await getDataFromServer('//45.119.213.117:5000/api/v1/users/all?pageSize=10&pageNumber=1&role=all')
            setTotalPage(result.data.totalPages)
            setData(result.data.data)
        }
        fetchData();
    }, []);
    // handle chuyển trang
    const handleClick=async(i)=>{
        const result=await getDataFromServer(`//45.119.213.117:5000/api/v1/users/all?pageSize=10&pageNumber=${i}&role=all`)
        setData(result.data.data)
    }

    let titleArr = ['STT', 'Tài khoản', 'Tài sản', 'Bán khống', 'Tài sản phái sinh', '']
    // Tạo số button tương ứng với số trang
    let pageButton=[];
    for(let i=1; i<totalPage+1; i++){
        pageButton.push(<button onClick={()=>handleClick(i)} key={i}>{i}</button>)
    }
    // sortData theo asset
    let sortData = Object.entries(data).sort((a, b)=>b[1].account.asset-a[1].account.asset);
    let convertArrayToObj = sortData.map((value)=>value[1])
    // console.log(convertArrayToObj)
    return(
        <div>
            <table className='responsive-table'>
                {renderTheadTable(titleArr)}
                <tbody>
                    {convertArrayToObj.map((value, index)=>{
                        value.index=index;
                        value.history=props.history;
                        return(
                            <UserDetail key={index} {...value}/>
                        )
                    })}
                </tbody>
            </table>
            <div className='buttonToRedirectPage'>
                {pageButton}
            </div>
        </div>
    )
}

let UserDetail=(props)=>{
    // console.log(props)
    //STT
    let userIndex=[props.index];
    let userId=props._id;
    // Loại bỏ các properties không cần hiển thị
    let dataAccount = omit(props.account, ['_id', 'userId', 'created', 'updated', 'shares', 'tradingMoney', 'buyingPower']);
    // Lấy username trong props
    let rawData = omit(props, ['_id', 'fullName', 'created', 'key', 'account', 'gender', 'email', 'roles', 'index', 'history', 'changeStateListUser'])
    // Convert sang array
    const dataTmp = Object.keys(rawData).map(key => rawData[key]).concat(Object.keys(dataAccount).map(key => dataAccount[key]));
    // Nối số thự tự vào
    const data = userIndex.concat(dataTmp);
    const onSubmitBlockUser=async (e)=>{
        await postDataToServer('//45.119.213.117:5000/api/v1/users/block',{
            userId: userId
        })
        window.location.reload();
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
            <td className='tdOfEditColumnInListUser'>
                <div className='box'>
                    <button className='box-item1' onClick={onSubmitBlockUser}>Block User</button>
                    <button className='box-item2'>Loading</button>
                    <button className='box-item3' onClick={directToDetailUser} title='Detail'>Chiếm quyền</button>
                </div>
            </td>
        </tr>
    )
}

export default ListUser;