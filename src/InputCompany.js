import React, {useState } from 'react';
import {getUser, removeUserSession, postDataToServer, getStockCode} from './Utils/Common';
import {useForm} from 'react-hook-form';
let InputCompany=(props)=>{
    const user=getUser();
    const handleLogout=()=>{
        removeUserSession();
        props.history.push('/');
    }
    // console.log(getToken())
    //handle form
    const {register, handleSubmit, reset, errors}=useForm();
    const [loading, setLoading]=useState(false);
    const [companyName, setCompanyName]= useState([])
    const onSubmit=(data, e)=>{
        data.price=parseInt(data.price)
        data.volume=parseInt(data.volume)
        data.marketCapRate=parseInt(data.marketCapRate)
        data.currentListedVolume=parseInt(data.currentListedVolume)
        data.baseListedPrice=parseInt(data.baseListedPrice)
        data.baseListedVolume=parseInt(data.baseListedVolume)
        data.baseMarketCap=parseInt(data.baseMarketCap)
        data.numberOfShortSale=parseInt(data.numberOfShortSale)
        data.marketCap=parseInt(data.marketCap)
        postDataToServer('http://45.119.213.117:5000/api/v1/company/create', data)
        e.target.reset()
    }
    console.log(companyName)
    return(
        <div>
            Welcome <strong>{user}</strong> <br/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td><input name='name' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>StockExchange</th>
                            <td><input type='text' name='stockExchange' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Price</th>
                            <td><input type='number' name='price' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Career</th>
                            <td><input type='text' name='career' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Stock code</th>
                            <td><input type='text' name='stockCode' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Volume</th>
                            <td><input type='number' name='volume' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Market cap rate</th>
                            <td><input type='number' name='marketCapRate' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Current listed volume</th>
                            <td><input type='number' name='currentListedVolume' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Base Listened Price</th>
                            <td><input type='number' name='baseListedPrice' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Base Listened Volume</th>
                            <td><input type='number' name='baseListedVolume' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Base Market Cap</th>
                            <td><input type='number' name='baseMarketCap' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Number of short sale</th>
                            <td><input type='number' name='numberOfShortSale' ref={register({ required: true })}/></td>
                        </tr>
                        <tr>
                            <th>Market Cap</th>
                            <td><input type='number' name='marketCap' ref={register({ required: true })}/></td>
                        </tr>
                    </tbody>
                </table>
                <input type='submit' value={loading?'Sending...':'Submit'} disabled={loading}></input>
                {/* <input type='button' onClick={resetForm} value='Reset'/> */}
            </form>
            <input type='button' value='Logout' onClick={handleLogout}/>
        </div>
    )
}

export default InputCompany;