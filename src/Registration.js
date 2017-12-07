import React from "react";
import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Registration extends React.Component{
    
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            Email: '',
            Password: '',
            PasswordConfirmation: '',
            Firstname: '',
            Lastname: '',
            DateOfBirth: '',
            Phone: '',
            Address: '',
            UserType: '0',
        };
    }

    updateField(event)
    {
        this.setState({
            [event.target.id] : event.target.value
        });
    }

    handleClick = function(){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:65300/auth/register",
            dataType: "json",
            data: JSON.stringify({
                "email" : this.state.Email,
                "password" : this.state.Password,
                "firstName" : this.state.Firstname,
                "lastName" : this.state.Lastname,
                "dateOfBirth" : this.state.DateOfBirth,
                "phone" : this.state.Phone,
                "address" : this.state.Address,
                "user_type" : this.state.UserType
            }),

            success: data => {
                /*if (data['status'] === 1)
                {*/
                    this.setState({
                        Email: '',
                        Password: '',
                        PasswordConfirmation: '',
                        Firstname: '',
                        Lastname: '',
                        DateOfBirth: '',
                        Phone: '',
                        Address: '',
                        UserType: '0',
                    });
                   
                    NotificationManager.success(data['message']);
                /*}
                else
                {  
                    this.setState({
                        Password: '',
                        PasswordConfirmation: '',
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
        return (
        <form class="form-registration">
            <table>
                <tr>
                    <td>
                        <label for="Email"><b>Email</b></label>
                    </td>
                    <td>
                        <input type="email" id="Email"  class="form-control" value={this.state.Email} onChange={event => this.updateField(event)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="Password"><b>Password</b></label>
                    </td>
                    <td>
                        <input type="password" id="Password" class="form-control"  value={this.state.Password} onChange={event => this.updateField(event)}  required/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label for="PasswordConfirmation"><b>Password Confirmation</b></label>
                    </td>
                    <td>
                        <input type="password" id="PasswordConfirmation" class="form-control"  value={this.state.PasswordConfirmation} onChange={event => this.updateField(event)} required/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label for="Name"><b>Name</b></label>
                    </td>
                    <td>
                        <input type="text" id="Firstname" class="form-control" value={this.state.Firstname} onChange={event => this.updateField(event)} />
                    </td>
                </tr>

                <tr>
                    <td>
                        <label for="Surname"><b>Surname</b></label>
                    </td>
                    <td>
                        <input type="text" id="Lastname" class="form-control" value={this.state.Lastname}  onChange={event => this.updateField(event)} />
                    </td>
                </tr>

                <tr>
                    <td>
                        <label for="DateOfBirth"><b>Date of birth</b></label>
                    </td>
                    <td>
                        <input type="date" id="DateOfBirth" class="form-control" value={this.state.DateOfBirth}  onChange={event => this.updateField(event)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="Phone"><b>Phone number</b></label>
                    </td>
                    <td>
                        <input type="text" id="Phone" class="form-control" value={this.state.Phone}  onChange={event => this.updateField(event)} />
                    </td>
                </tr>

                <tr>
                    <td>
                        <label for="Address"><b>Address</b></label>
                    </td>
                    <td>
                        <input type="text" id="Address" class="form-control" value={this.state.Address}  onChange={event => this.updateField(event)} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="UserType"><b>Who are you?</b></label>
                    </td>

                    <td>
                        <select id="UserType" value={this.state.UserType}  onChange={event => this.updateField(event)}>
                            <option value="0">
                                Jobseeker
                            </option>

                            <option value="1">
                                Recruiter
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="button" onClick={this.handleClick} class="btn btn-primary" id="btnRegistrate" value="Register" />
                    </td>
                </tr>

            </table>
            <div>
                <NotificationContainer/>
            </div>
        </form>
        );
    }
}

export default Registration;