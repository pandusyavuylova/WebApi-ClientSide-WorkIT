import React from "react";
import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";

class NewPost extends React.Component{
    constructor()
    {
        super()
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
        }
    }

    componentDidMount()
    {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:5000/api/user/get/PostInfo",
            dataType: "json",
            data: JSON.stringify({
                "postId" : this.props.match.params.id,
            }),

            success: response => {
                if (response['status'] === 1)
                {
                   var postInfo = response['data'][0];
                   console.log(postInfo);
                   this.setState({
                        isFound: 1,
                        Title: postInfo['title'],
                        Description: postInfo['description'],
                        Email: postInfo['email'],
                        Phone: postInfo['phone'],
                   });
                }
                else
                {  
                    this.setState({
                        isFound: 0
                    });
                    NotificationManager.error(response['message']);
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
        if (this.state.isFound == 0){
            return (
                <h1>Post not found!</h1>
            );
        }
        else if (this.state.isFound == 1)
        {
            return (
                <div>
                    <span class="post-title">{this.state.Title}</span>
                    <br/>
                    <span class="post-info">Posted on {this.state.CreationData} by <a href={'/profile/' + this.state.OwnerId}>{this.state.Name} {this.state.Surname}</a></span>
                    <br/>
                    <span class="post-description">{this.state.Description}</span>
                    <br/>
                    <br/>
                    <span class="post-contacts">
                         Contacts:
                         <br/>
                         {this.state.Phone}
                         <br/>
                         {this.state.Email}
                    </span>
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
