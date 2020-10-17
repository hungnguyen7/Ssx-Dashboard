import React, {useState, useEffect} from 'react';
import {getDataFromServer, deleteDataFromServer, renderTheadTable} from './Utils/Common';
import {filter, omit} from 'lodash';

export const ActiveCommand=(props)=>{
    const [data, setData]=useState([])
    const [totalPage, setTotalPage]=useState(0)
    useEffect(()=>{
        const fetchData=async ()=>{
            const result=await getDataFromServer('http://45.119.213.117:5000/api/v1/command/admin/active?pageSize=10&pageNumber=1&role=admin')
            setTotalPage(result.data.totalPages)
            setData(result.data.data)
        }
        fetchData();
    }, []);
    const handleClick=async(i)=>{
        const result=await getDataFromServer(`http://45.119.213.117:5000/api/v1/command/admin/active?pageSize=10&pageNumber=${i}&role=admin`)
        console.log(result)
        setData(result.data.data)
    }
    //Tao nut chuyen trang dua tren totalPage duoc tra ve tu API
    let pageButton=[];
    for(let i=1; i<totalPage+1; i++){
        pageButton.push(<a onClick={()=>handleClick(i)} key={i}>{i}</a>)
    }
    let title = ['Mã CP', 'Giá', 'Khối lượng', 'Loại lệnh', 'Mua/Bán', 'Username', 'Thời gian đặt', 'Hủy lệnh']
    return(
        <div>
             <table className='responsive-table'>
                {renderTheadTable(title)}
                <tbody>
                    {data.map((value, index)=>{
                        return(
                      <CommandDetail key={index} {...value}/>
                     )
                    })}
                 </tbody>
           </table>
             {pageButton}
         </div>
    )
}

//Render chi tiet lenh
let CommandDetail=(props)=>{
    console.log(props);
    let idCommand = props._id;
    let time = `${new Date(props.updatedAt).getHours()}:${new Date(props.updatedAt).getMinutes()}`
    let filterData = omit(props, [,'_id', 'beginPrice', 'beginVolume', 'changes', 'createdAt', 'interestRate', 'isShortSale', 'matches', 'updatedAt', 'state', 'commandType'])
    filterData.time = time;
    filterData.buyOrSell = props.commandType===0||props.commandType===2?'Mua':'Bán'
    filterData.cmdType = props.commandType===0||props.commandType===1?'LO':'MP'
    console.log(filterData)

    const onDelete=(idCommand)=>{
        console.log(idCommand)
        deleteDataFromServer(`http://45.119.213.117:5000/api/v1/command/${idCommand}`)
        window.location.reload();
    }
    let orderObject = {
        stockCode: null,
        price: null,
        volume: null,
        cmdType: null,
        buyOrSell: null,
        idAccount: null
    }
    Object.assign(orderObject, filterData)
    console.log(orderObject)
    const data = Object.keys(orderObject).map(key => orderObject[key]);

    return(
        <tr>
            {data.map((value, index)=>{
                return <td key={index}>{value}</td>
            })}
            <td>
                <button onClick={()=>onDelete(idCommand)}>Cancel</button>   
            </td>
        </tr>
    )
}