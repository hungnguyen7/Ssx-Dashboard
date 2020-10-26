import React from "react";
// import InputCompany from './InputCompany';
import ListCompany from './ListCompany';
import Login from './Login';
import ListUser from './ListUser';
import DetailUser from './DetailUser';
import RechargeForUser from './RechargeForUser';
import {ActiveCommand} from './Command';
import ConfirmSession from './ConfirmSession';
import { BrowserRouter as Router, Route, Link, NavLink, BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute'
class App extends React.Component{
  render(){
    return(
      <div className='App'>
        <BrowserRouter>
          <div>
            <div className='header'>
              <NavLink exact activeClassName='active' to='/'>Đăng nhập</NavLink>
              <NavLink activeClassName='active' to='listcompany'>Danh sách công ty</NavLink>
              <NavLink activeClassName='active' to='listuser'>Danh sách user</NavLink>
              {/* <NavLink activeClassName='active' to='detailuser'>Detail User</NavLink> */}
              <NavLink activeClassName='active' to='rechargeforuser'>Nạp tiền cho user</NavLink>
              <NavLink activeClassName='active' to='activecommand'>Lệnh đang chờ</NavLink>
              <NavLink activeClassName='active' to='confirmsession'>Chốt phiên</NavLink>
            </div>
            <div className='content'>
              <Switch>
              {/* exact nghĩa là chính xác là path rỗng (“/”) thì mới hiện trang Home. */}
                <PublicRoute exact path='/' component={Login}/>
                <PrivateRoute path='/listcompany' component={ListCompany}/>
                {/* <PrivateRoute path='/inputcompany' component={InputCompany}/> */}
                <PrivateRoute path='/listuser' component={ListUser}/>
                <PrivateRoute path='/detailuser' component={DetailUser}/>
                <PrivateRoute path='/rechargeforuser' component={RechargeForUser}/>
                <PrivateRoute path='/activecommand' component={ActiveCommand}/>
                <PrivateRoute path='/confirmsession' component={ConfirmSession}/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
