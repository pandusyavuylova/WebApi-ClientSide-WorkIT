import React from "react";
import {Redirect, Route} from "react-router-dom";
import Component from "react";

import {CheckUserAuth} from "./User";

const PrivateRoute = ({ component: Component,  ...rest }) => (
    <Route {...rest} render={props => (
        ((CheckUserAuth()['token'] !== '')) ? (
            <Component {...props}/>
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }}/>
          )
    )}/>
  )
/*
class PrivateRoute extends React.Component{
    
    constructor(props){
        super(props);
        console.log(this.props);
    }

    render = () =>{
        let userInfo = CheckUserAuth();
        console.log(userInfo);
        console.log(this.props.AllowUser + ' ' + userInfo['userType']);
        if ((userInfo['status'] === 0) || (userInfo['userType'] !== this.props.AllowUser))
        {
            console.log('exec');
            return (
                <Redirect to={{
                    pathname: '/',
                    state: { from: this.props.location }
                  }}/>
            );
        }
        console.log('load component:' + this.props);
        return (
            <Route {...this.props} component={this.props.component}/>
        );
       
    }
}
*/
export default PrivateRoute;