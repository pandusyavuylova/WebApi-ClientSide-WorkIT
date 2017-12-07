import React from "react";
import {Redirect} from "react-router-dom";
import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Resumes extends React.Component{

    constructor()
    {
        super()
        this.getResumesList = this.getResumesList.bind(this);
        this.deleteResume = this.deleteResume.bind(this);
        this.state = {
            createNew: false,
            resumesInfo: [],
        }
    }

    deleteResume = function(resumeId){
        let userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 0;
        let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/resumes/" + resumeId,
            dataType: "json",
            data: JSON.stringify({
                "userId": userId,
                "token": token,
                "resumeId": resumeId,
            }),
            success: response => {
                /*if (response['status'] === 1)
                {
                    NotificationManager.success(response['message']);*/
                    this.getResumesList();
                /*}
                else
                {  
                    NotificationManager.error(response['message']);
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

    updateState(event){
        this.setState({
            [event.target.id] : true,
        });
    }
    
    getResumesList = function()
    {
        let userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 0;
        let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
        $.ajax({
            type: "GET",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/resumes/user/" + userId,
            dataType: "json",
            data: JSON.stringify({
                "userId": userId,
                "token": token,
            }),
            success: response => {
                /*if (response['status'] === 1)
                {*/
                   this.setState({
                        resumesInfo: response
                   });
                /*}
                else
                {  
                    NotificationManager.error(response['message']);
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

    componentDidMount()
    {
        this.getResumesList()
    }

    render(){

        if (this.state.createNew)
        {
            return (
                <Redirect to="/jobseeker/create/resume" push/>
            );
        }

        return(
            <div>
                <button type="button" class="btn btn-success" id="createNew" onClick={event => this.updateState(event)}>
                        Add new resume
                </button>
                <br/>
                <br/>
                <table class="table table-striped table-dark" id="posts">
                    <thead>
                        <th colSpan="3">YOUR RESUMES</th>
                    </thead>
                <tbody>
                
                {this.state.resumesInfo.map(function(item, key) {
                            return (
                                <tr key = {key}>
                                    <td id="skill">{item.name}</td>
                                    <td align="right">
                                        <input type="button" className="btn btn-warning" value="Edit"/>
                                        <input type="button" className="btn btn-danger" value="Delete" onClick={event => this.deleteResume(item.id)}/>
                                    </td>
                                </tr>
                                )
                            }, this)}
                </tbody>
                </table>
                <NotificationContainer/>
            </div>
           
        );
    }
}

export default Resumes;