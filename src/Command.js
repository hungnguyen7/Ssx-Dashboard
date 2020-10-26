import React, {useState, useEffect} from 'react';
import {getDataFromServer, deleteDataFromServer, renderTheadTable} from './Utils/Common';
import {omit} from 'lodash';

export const ActiveCommand=(props)=>{
    const [data, setData]=useState([])
    const [totalPage, setTotalPage]=useState(0)
    useEffect(()=>{
        const fetchData=async ()=>{
            const result=await getDataFromServer('//45.119.213.117:5000/api/v1/command/admin/active?pageSize=10&pageNumber=1&role=admin')
            setTotalPage(result.data.totalPages)
            setData(result.data.data)
        }
        fetchData();
    }, []);
    //Xử lí chuyển trang
    const handleClick=async(i)=>{
        const result=await getDataFromServer(`//45.119.213.117:5000/api/v1/command/admin/active?pageSize=10&pageNumber=${i}&role=admin`)
        setData(result.data.data)
    }
    //Tạo các button dựa trên totalPage mà API trả về
    let pageButton=[];
    for(let i=1; i<totalPage+1; i++){
        pageButton.push(<button onClick={()=>handleClick(i)} key={i}>{i}</button>)
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
           <div className='buttonToRedirectPage'>
                {pageButton}
            </div>
         </div>
    )
}

let CommandDetail=(props)=>{
    let idCommand = props._id;
    // Covert dữ liệu thời gian
    let time = `${new Date(props.updatedAt).getHours()}:${new Date(props.updatedAt).getMinutes()}`
    // Loại bỏ properties không cần render
    let filterData = omit(props, ['_id', 'beginPrice', 'beginVolume', 'changes', 'createdAt', 'interestRate', 'isShortSale', 'matches', 'updatedAt', 'state', 'commandType'])
    filterData.time = time;
    // Mua hoặc bán
    filterData.buyOrSell = props.commandType===0||props.commandType===2?'Mua':'Bán'
    // Loại lệnh
    filterData.cmdType = props.commandType===0||props.commandType===1?'LO':'MP'

    // Xử lí cancel lệnh
    const onCancel=(idCommand)=>{
        deleteDataFromServer(`//45.119.213.117:5000/api/v1/command/${idCommand}`)
        window.location.reload();
    }

    //Sắp xếp lại properties trước khi render
    let orderObject = {
        stockCode: null,
        price: null,
        volume: null,
        cmdType: null,
        buyOrSell: null,
        idAccount: null
    }
    Object.assign(orderObject, filterData)
    const data = Object.keys(orderObject).map(key => orderObject[key]);

    return(
        <tr>
            {data.map((value, index)=>{
                return <td key={index}>{value}</td>
            })}
            <td>
                <button onClick={()=>onCancel(idCommand)}>Cancel</button>   
            </td>
        </tr>
    )
}