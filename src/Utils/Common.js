import axios from 'axios';
import React from 'react';

export const getUser=()=>{
    const userStr=sessionStorage.getItem('user');
    if(userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken=()=>{
    return sessionStorage.getItem('token')||null;
}

export const removeUserSession=()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
}

export const setUserSession=(token, user)=>{
    // console.log(token, user)
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user))
}

export const postDataToServer=async (link ,data)=>{
    await axios.post(link,data,{
        headers:{
            'Authorization': `Bearer ${getToken()}`
        }
    }).then(res=>{
        alert("Success")
    }).catch(error=>{
        alert('Something wrong, try again')
    })
}
export const patchDataToServer=async (link ,data)=>{
    await axios.patch(link,data,{
        headers:{
            'Authorization': `Bearer ${getToken()}`
        }
    }).then(res=>{
        alert("Success")
    }).catch(error=>{
        alert('Something wrong, try again')
    })
}
export const getDataFromServer=async(link)=>{
    let data;
    await axios.get(link,{
        headers:{
            'Authorization': `Bearer ${getToken()}`,
          }
    }).then(res=>{
        data=res;
    })
    return data;
}
export const renderTheadTable=(arr)=>{
    return(
        <thead>
            <tr>
                {arr.map((value, index)=>{
                    return <th key={index}>{value}</th>
                })}
            </tr>
        </thead>
    )
}

// export const RowDetail=(row)=>{
//     // console.log(row)
//     let companyId=row._id;
//     let rawData = omit(row, ['_id', 'updatedAt'])
//     // const key = Object.keys(row);
//     const data = Object.keys(rawData).map(key => rawData[key]);
//     // console.log(key)
//     // console.log(data.length)
//     console.log(companyId)
//     return(
//         <tr>
//             {data.map((value, index)=>{
//                 return <td key={index}>{value}</td>
//             })}
//             <td>
//                 <form>
//                     <input type='text' name='stockExchange' ref={register({ required: true })}/>
//                 </form>
//             </td>
//         </tr>
//     )
// }

export const getIdUser= (user)=>{
    axios.get('http://45.119.213.117:5000/api/v1/account/all', {
        headers:{
            'Authorization': `Bearer ${getToken()}`,
          }
    }).then(res=>res).catch(err=>console.log(err))
}

export const getStockCode=async()=>{
    let result=await getDataFromServer('http://45.119.213.117:5000/api/v1/company/all')
    let data = result.data.data.map((value, index)=>{
        return [value.stockCode, value._id]
    })
    return data
}