import React from "react";
import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Offer extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            Subject: "",
            Message: "",
            PostId: 0,
            Date: "",
            Name: "",
            Surname: "",
        }
    }

    getRecruiter = function()
    {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:65300/user/profile/" + this.state.Recruiter,
            dataType: "json",
            data: JSON.stringify({
                "userId": this.state.userId,
            }),
            success: response => {
                //if (response['status'] === 1)
                //{
                    console.log(response);
                    this.setState({
                        Name: response['firstname'],
                        Surname: response['lastname']
                    });
                //}
                //else
                //{  
                    //NotificationManager.error(response['message']);
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

    componentDidMount()
    {
        let userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 0;
        let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
        
        $.ajax({
            type: "GET",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/offers/" + this.props.match.params.id,
            dataType: "json",
            data: JSON.stringify({
                "userId": userId,
                "token": token,
                "offerId": this.props.match.params.id,
            }),
            success: response => {
                //if (response['status'] === 1)
                //{
                    console.log(response);
                   this.setState({
                        Subject: response['subject'],
                        Message: response['message'],
                        PostId: response['post_id'],
                        Date: response['date'],
                        Recruiter: response['recruiter_id']
                   });
                   this.getRecruiter();
                //}
               // else
                //{  
                   // NotificationManager.error(response['message']);
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

    render()
    {
        return(
            <div>
                <span class="title">{this.state.Subject}</span>
                <br/>
                <span class="extra-info">Posted on {this.state.Date} by {this.state.Name} {this.state.Surname}</span>
                <br/>
                <span class="main-info">{this.state.Message}</span>
                <br/>
                <br/>
                {
                    (this.state.PostId !== 0) ?
                    (<span class="extra-info">You can review <a href={'/post/' + this.state.PostId}>this post</a> for more information.</span>) :
                    (<div></div>)
                }
                <NotificationContainer/>
            </div>
        );
    }
}

export default Offer;