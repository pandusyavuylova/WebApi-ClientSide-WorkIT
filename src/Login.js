import React from "react";
import {Redirect} from "react-router-dom";
import {CheckUserAuth} from "./User";

import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Login extends React.Component{
    
    constructor()
    {
        super()
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            isAuth: false,
            Email: "",
            Password: "",
        }
    }

    updateField(event){
        this.setState({
            [event.target.id] : event.target.value,
        });
    }
    
    componentDidMount()
    {
        let userInfo = CheckUserAuth();
        if (userInfo['status'] === 1)
        {
            this.setState({
                isAuth: true,
            });
        }
    }

    handleClick = function()
    {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "http://localhost:65300/token",
            data: {"username" : this.state.Email,
            "password" : this.state.Password,
            "grant_type": "password",
            "email": this.state.Email},

            success: data => {
                console.log(data);
                /*if (data['status'] === 1)
                {*/
                //localStorage.setItem("userId", data['userId']);
                localStorage.setItem("token", data['access_token']);
                localStorage.setItem("userType", data['user_type']);
                localStorage.setItem("userId", data['id']);    
                    this.setState({
                        Email: '',
                        Password: '',
                        isAuth : true,
                    });
                /*}
                else
                {  
                    this.setState({
                        Password: '',
                    });
                    NotificationManager.error(data['message']);
                }*/
            },

            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect. Verify Network.';
                } else if (jqXHR.status === 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status === 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error. ' + jqXHR.responseText;
                }
                NotificationManager.error(msg);
            },
        });
    }
    

    render(){

        if (this.state.isAuth)
        {
            return (
                <Redirect to="/" push/>
            );
        }

        return (
            <form class='form-login'>
                <label for='inputEmail' class='sr-only'>Email address</label>
                <input type='email' id='Email' class='form-control' placeholder='Email address' value={this.state.Email} onChange={event => this.updateField(event)} required autofocus></input>
                <label for='inputPassword' class='sr-only'>Password</label>
                <input type='password' id='Password' class='form-control' placeholder='Password' value={this.state.Password} onChange={event => this.updateField(event)} required></input>
                <input type='button' class='btn btn-lg btn-primary btn-block' onClick={this.handleClick} value="Sign In"/>
                <NotificationContainer/>
            </form>
        );       
    }
}

export default Login;