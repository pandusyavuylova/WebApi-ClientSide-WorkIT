import React from "react";
import {Redirect} from "react-router-dom";
import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Posts extends React.Component{
    constructor(){
        super()
        this.getPostsList = this.getPostsList.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.reviewPost = this.reviewPost.bind(this);
        this.state = {
            CreateNew: false,
            postsInfo: [],
            ReviewPost: false,
            ReviewPostId: 0,
            EditPost: false,
            EditPostId: 0,
        }
    }

    updateState(event){
        this.setState({
            [event.target.id] : true,
        });
    }

    reviewPost = function(postId)
    {
        this.setState({
            ReviewPost: true,
            ReviewPostId: postId,
        });
    }

    editPost = function(postId)
    {
        this.setState({
            EditPost: true,
            EditPostId: postId,
        });
    }

    deletePost = function(postId)
    {
        let userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 0;
        let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/posts/" + postId,
            dataType: "json",
            data: JSON.stringify({
                "userId": userId,
                "token": token,
                "postId": postId,
            }),
            success: response => {
                if (response['status'] === 1)
                {
                    NotificationManager.success(response['message']);
                    this.getPostsList();
                }
                else
                {  
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
            }
        });
    }

    getPostsList = function()
    {
        let userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 0;
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:65300/posts/user/" + userId,
            dataType: "json",
            data: {
                "id" : userId,
            },
            success: response => {
                /*if (response['status'] === 1)
                {*/
                    console.log(response);
                   this.setState({
                        postsInfo: response
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
       this.getPostsList()
    }

    render()
    {
        if (this.state.EditPost)
        {
            return (
                <Redirect to={'/recruiter/edit/post/' + this.state.EditPostId} push/>
            );
        }
        
        if (this.state.ReviewPost)
        {
            return (
                <Redirect to={'/post/' + this.state.ReviewPostId} push/>
            );
        }

        if (this.state.CreateNew)
        {
            return (
                <Redirect to="/recruiter/create/post" push/>
            );
        }

        return (
            <div>
                <button type="button" class="btn btn-success" id="CreateNew" onClick={event => this.updateState(event)}>
                    Create new post
                </button>  
                <br/>
                <br/>
                <table class="table table-striped table-dark" id="posts">
                    <thead>
                        <th colSpan="2">YOUR ACTIVE OFFERS</th>
                    </thead>
                <tbody>
                {this.state.postsInfo.map(function(item, key) {
                    
                           return (
                               <tr key = {key}>
                                   <td id="post">{item.title}</td>
                                   <td align="right">
                                       <input type="button" className="btn btn-primary" value="Review"/>
                                       <input type="button" className="btn btn-warning" value="Edit"/>
                                       <input type="button" className="btn btn-danger" value="Delete" onClick={event => this.deletePost(item.id)}/>
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

export default Posts;
