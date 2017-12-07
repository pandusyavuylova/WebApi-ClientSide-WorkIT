import React from "react";
import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";

class CreateResume extends React.Component{
    
    constructor()
    {
        super()
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            Title: "",
            URL: "",
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
            userId = localStorage.getItem("userId");
        
        var token = "";
        if (localStorage.getItem("token"))
            token = localStorage.getItem("token");

        $.ajax({
            type: "POST",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/resumes/add",
            dataType: "json",
            data: JSON.stringify({
                "userId": userId,
                "token": token,
                "name": this.state.Title,
                "file_name": this.state.URL,
            }),

            success: data => {
                if (data['status'] === 1)
                {
                    this.setState({
                        Title: "",
                        URL: "",
                    });
                   
                    NotificationManager.success(data['message']);
                }
                else
                {  
                    NotificationManager.error(data['message']);
                }
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
            <form class="form-resume">
            <table>
                <tr>
                    <td>
                        <label for="Title"><b>Resume title</b></label>
                    </td>
                    <td>
                        <input type="text" id="Title"  class="form-control" value={this.state.Title} onChange={event => this.updateField(event)}/>
                    </td>
                </tr>
                <br></br>
                <tr>
                    <td>
                        <label for="URL"><b>URL</b></label>
                    </td>

                    <td>
                        <input type="text" id="URL"  class="form-control" value={this.state.URL} onChange={event => this.updateField(event)}/>
                    </td>
                </tr>
                <br></br>
                <tr>
                    <td colspan="2">
                        <input type="button" class="btn btn-primary" value="Add resume" onClick={this.handleClick} />
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

export default CreateResume;
