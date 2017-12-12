import React from "react";
import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";

class EditResume extends React.Component{

    constructor()
    {
        super()
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            Id: 0,
            Title: "",
            Url: "",
        }
    }

    updateField(event){
        this.setState({
            [event.target.id] : event.target.value,
        });
    }
    
    componentDidMount()
    {
        let userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 0;
        let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
       
        /* this.setState({
            Id: this.props.match.params.id
        }); */

        this.state.Id = this.props.match.params.id;

        $.ajax({
            type: "GET",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/resumes/" + this.state.Id,
            dataType: "json",
            data: JSON.stringify({
                "userId": userId,
                "token": token,
                "resumeId":  this.props.match.params.id,
            }),
            success: response => {
                //if (response['status'] === 1)
                //{
                    console.log(response);
                    this.setState({
                        Title: response['name'],
                        URL: response['file_name'],
                    });
                //}
                //else
                //{  
                //    NotificationManager.error(response['message']);
                //}
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

    handleClick = function()
    {
        let userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 0;
        let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";

        $.ajax({
            type: "POST",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/resumes/edit/" + this.state.Id,
            dataType: "json",
            data: JSON.stringify({
                "userId": userId,
                "token": token,
                "resumeId": this.state.Id,
                "name": this.state.Title,
                "file_name": this.state.URL,
            }),

            success: data => {
                if (data['status'] === 1)
                {                   
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

    render(){
        return(
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
                <br/>
                <tr>
                    <td>
                        <label for="URL"><b>URL</b></label>
                    </td>

                    <td>
                        <input type="text" id="URL"  class="form-control" value={this.state.URL} onChange={event => this.updateField(event)}/>
                    </td>
                </tr>
                <br/>
                <tr>
                    <td colspan="2">
                        <input type="button" class="btn btn-primary" value="Save changes" onClick={this.handleClick} />
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

export default EditResume;