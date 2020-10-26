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
    // tự động logout sau 3 tiếng
    setTimeout(()=>removeUserSession(), 1000*60*60*3)
}

export const postDataToServer=async (link ,data)=>{
    await axios.post(link,data,{
        headers:{
            'Authorization': `Bearer ${getToken()}`
        }
    }).then(res=>{
        alert("Success")
    }).catch(error=>{
        alert(error.response.data.message)
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
export const getDataFromServer=async (link)=>{
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
export const deleteDataFromServer=async (link)=>{
    await axios.delete(link,{
        headers:{
            'Authorization': `Bearer ${getToken()}`
        }
    }).then(res=>{
        alert("Success")
    }).catch(error=>{
        alert('Something wrong, try again')
    })
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

export const getIdUser=(user)=>{
    axios.get('//45.119.213.117:5000/api/v1/account/all', {
        headers:{
            'Authorization': `Bearer ${getToken()}`,
          }
    }).then(res=>res).catch(err=>console.log(err))
}

export const getStockCode=async()=>{
    let result=await getDataFromServer('//45.119.213.117:5000/api/v1/company/all')
    let data = result.data.data.map((value, index)=>{
        return value.stockCode
    })
    return data
}