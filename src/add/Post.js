import React from "react";
import $ from "jquery";
import {Redirect} from "react-router-dom";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {CheckUserAuth} from "../User";

class NewPost extends React.Component{
    constructor()
    {
        super();
        this.sendRequest = this.sendRequest.bind(this);
        this.state = {
            isFound: -1,
            Title: "",
            Description: "",
            Email: "",
            Phone: "",
            OwnerId: 0,
            CreationData: "",
            Counter: 0,
            Name: "",
            Surname: "",
            ClickedSendRequest: false
        }
    }

    sendRequest = function()
    {
        this.setState({
            ClickedSendRequest: true,
        });
    }

    getRecruiter = function()
    {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:65300/user/profile/" + this.state.OwnerId,
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
                        Surname: response['lastname'],
                        OwnerId: response['id']
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
        $.ajax({
            type: "POST",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/posts" + this.props.match.params.id,
            dataType: "json",
            data: JSON.stringify({
                "postId" : this.props.match.params.id,
            }),

            success: response => {
              //if (response['status'] === 1)
                //{
                   var postInfo = response['data'][0];
                   //console.log(postInfo);
                   this.setState({
                    isFound: 1,
                    Title: postInfo['title'],
                    Description: postInfo['description'],
                    Email: postInfo['email'],
                    Phone: postInfo['phone'],
                    OwnerId: postInfo['owner_id'],
                    CreationData: postInfo['time'],
                    Counter: postInfo['counter'],
                    Name: postInfo['name'],
                    Surname: postInfo['surname'],
               });
               this.getRecruiter();
                /*}
                else
                {  
                    this.setState({
                        isFound: 0
                    });
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

    render()
    {
        if (this.state.ClickedSendRequest)
        {
            return(
                <Redirect to={'/jobseeker/create/request/' + this.props.match.params.id} push/>
            );
        }
        if (this.state.isFound == 0){
            return (
                <h1>Post not found!</h1>
            );
        }
        else if (this.state.isFound == 1)
        {
            return (
                <div>
                    <span class="title">{this.state.Title}</span>
                    <br/>
                    <span class="extra-info">Posted on {this.state.CreationData} by <a href={'/profile/' + this.state.OwnerId}>{this.state.Name} {this.state.Surname}</a></span>
                    <br/>
                    <span class="main-info">{this.state.Description}</span>
                    <br/>
                    <br/>
                    <span class="contact-info">
                         Contacts:
                         <br/>
                         {this.state.Phone}
                         <br/>
                         {this.state.Email}
                    </span>
                    <br/>
                    {
                        ( (CheckUserAuth()['userType'] == 0) && (CheckUserAuth()['status'] == 1) ) ?
                        (<input type="button" class="btn btn-primary" value="Send request" onClick={this.sendRequest}/>) :
                        (<div></div>) 
                    }
                </div>
            );
        }
        else
        {
            return(
                <div>  
                </div>
            );
        }
        
    }
}

export default NewPost;
