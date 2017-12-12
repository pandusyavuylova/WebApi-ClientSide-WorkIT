import React from "react";
import $ from "jquery";
import {Redirect} from "react-router-dom";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Profile extends React.Component
{
    constructor(){
        super()
        this.getSkillsData = this.getSkillsData.bind(this);
        this.getPostsData = this.getPostsData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            userType: -1,
            Name: "",
            Surname: "",
            DateOfBirth: "",
            Email: "",
            Address: "",
            Phone: "",
            UserId: 0,
            SkillsData: [],
            PostsData: [],
            Redirecting: 0,
            RedirectPostId: 0,

            /* Address = user.Address,
            DateOfBirth = user.DateOfBirth,
            Email = user.Email,
            Firstname = user.FirstName,
            Lastname = user.Lastname,
            Phone = user.Phone */
        }
    }

    handleClick = function(postId)
    {
        this.setState({
            Redirecting: 1, 
            RedirectPostId: postId,
        });
    }

    getSkillLevelTitle = function(level)
    {
        var titles = ['Basic', 'Intermediate', 'Advanced'];
        return titles[level];
    }

    getSkillsData = function()
    {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:65300/skills/get/" + this.state.userId,
            dataType: "json",
            data: JSON.stringify({
                "userId": this.state.userId,
            }),
            success: response => {
                if (response['status'] === 1)
                {
                   this.setState({
                        SkillsData: response['data']//?
                   });
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
            },
        });
    }

    getPostsData = function()
    {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:65300/posts/user" + this.state.userId,
            dataType: "json",
            data: JSON.stringify({
                "userId": this.state.userId,
            }),
            success: response => {
                if (response['status'] === 1)
                {
                   this.setState({
                        PostsData: response['data']//?
                   });
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
            },
        });
    }

    componentDidMount()
    {
        this.setState({
            userId:  this.props.match.params.id,
        });

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:65300/user/profile/" + this.state.userId,
            dataType: "json",
            data: JSON.stringify({
                "userId" : this.props.match.params.id,
            }),

            success: response => {
                if (response['status'] === 1)
                {
                   this.setState({
                        userType: response['userType'],
                        Name: response['name'],
                        Surname: response['surname'],
                        DateOfBirth: response['dateOfBirth'],
                        Email: response['email'],
                        Address: response['address'],
                        Phone: response['phone'],
                   });
                   if (this.state.userType == 0)
                   {
                       this.getSkillsData();
                   }
                   else
                   {
                       this.getPostsData();
                   }
                }
                else
                {  
                    this.setState({
                        userId: -1,
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

    render(){
        if (this.state.Redirecting == 1)
        {
            return (
                <Redirect to={"/post/" + this.state.RedirectPostId} push/>
            );
        }

        if (this.state.userType == -1)
        {
            return (
                <div>
                    <NotificationContainer/>
                </div>
            );
        }

        if (this.state.userType == 0)
        {
            return (
                <div>
                    <span>{this.state.Name} {this.state.Surname}</span>
                    <br/>
                    <span>Jobseeker</span>
                    <br/>
                    <span>Email: {this.state.Email}</span>
                    <br/>
                    <span>Phone: {this.state.Phone}</span>
                    <br/>

                    <table class="table table-striped table-dark" id="posts">
                    <thead>
                        <th colSpan="2">SKILLS</th>
                    </thead>

                    <tbody>
                    
                    {this.state.SkillsData.map(function(item, key) {
                                return (
                                    <tr key = {key}>
                                        <td id="skill">{item.title}</td>
                                        <td id="skill">{this.getSkillLevelTitle(item.level)}</td>
                                    </tr>
                                    )
                                }, this)}
                    </tbody>
                    </table>
                    <NotificationContainer/>
                </div>
            ); 
        }

        if (this.state.userType == 1)
        {
            return (
                <div>
                    <span>{this.state.Name} {this.state.Surname}</span>
                    <br/>
                    <span>Recruiter</span>
                    <br/>
                    <span>Email: {this.state.Email}</span>
                    <br/>
                    <span>Phone: {this.state.Phone}</span>
                    <br/>

                    <table class="table table-striped table-dark" id="posts">
                    <thead>
                        <th colSpan="2">POSTS</th>
                    </thead>
                    <tbody>
                    {this.state.PostsData.map(function(item, key) {
                        
                            return (
                                <tr key = {key}>
                                    <td id="post">{item.title}</td>
                                    <td align="right"><input type="button" className="btn btn-primary" value="Review" onClick={event => this.handleClick(item.postId)}/></td>
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
}

export default Profile;