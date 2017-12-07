import React from "react";
import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";

class CreatePost extends React.Component{
    
    constructor()
    {
        super()
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            Title: "",
            Description: "",
            Email: "",
            Phone: "",
            Salary: 0,
            Industries: ""
        }
    }

    updateField(event){
        this.setState({
            [event.target.id] : event.target.value,
        });
    }

    handleClick = function()
    {
        var userId = 0;
        if (localStorage.getItem("userId"))
        {
            userId = localStorage.getItem("userId");
            console.log(userId);
        }
        
        var token = "";
        if (localStorage.getItem("token"))
        {
            token = localStorage.getItem("token");
            console.log(token);
        }

        $.ajax({
            type: "POST",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/posts/add",
            dataType: "json",
            data: JSON.stringify({
                "userId": userId,
                "token": token,
                "title" : this.state.Title,
                "description" : this.state.Description,
                "email": this.state.Email,
                "phone": this.state.Phone,
                "salary": this.state.Salary,
                "industries": this.state.Industries
            }),

            success: data => {
                /*if (data['status'] === 1)
                {*/
                    this.setState({
                        Title: '',
                        Description: '',
                        Phone: '',
                        Email: '',
                    });
                   
                /*    NotificationManager.success(data['message']);
                }
                else
                {  
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

    render()
    {
        return (
            <form class="form-post">
            <table>
                <tr>
                    <td>
                        <label for="Title"><b>Title </b></label>
                    </td>
                    <td>
                        <input type="text" id="Title"  class="form-control" value={this.state.Title} onChange={event => this.updateField(event)}/>
                    </td>
                </tr>
                <br></br>
                <tr>
                    <td>
                        <label for="Description"><b>Description </b></label>
                    </td>
                    <td>
                        <textarea id="Description" class="form-control" value={this.state.Description} onChange={event => this.updateField(event)} />
                    </td>
                </tr>
                <br></br>
                <tr>
                    <td>
                        <label for="Email"><b>Contact email </b></label>
                    </td>
                    <td>
                        <input type="email" id="Email" class="form-control" value={this.state.Email}  onChange={event => this.updateField(event)} />
                    </td>
                </tr>
                <br></br>
               
                <tr>
                    <td>
                        <label for="Phone"><b>Phone number </b></label>
                    </td>
                    <td>
                        <input type="text" id="Phone" class="form-control" value={this.state.Phone}  onChange={event => this.updateField(event)} />
                    </td>
                </tr>
                <br></br>
                <tr>
                    <td>
                        <label for="Salary"><b>Lower salary </b></label>
                    </td>
                    <td>
                        <input type="text" id="Salary" class="form-control" value={this.state.Salary}  onChange={event => this.updateField(event)} />
                    </td>
                </tr>
                <br></br>
                <tr>
                    <td colspan="2">
                        <input type="button" onClick={this.handleClick} class="btn btn-primary" id="btnRegistrate" value="Create post" />
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

export default CreatePost;
