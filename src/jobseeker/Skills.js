import React from "react";
import {Redirect} from "react-router-dom";
import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Skills extends React.Component{

    constructor()
    {
        super()
        this.getSkillsList = this.getSkillsList.bind(this);
        this.getLevelTitle = this.getLevelTitle.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
        this.state = {
            createNew: false,
            skillsInfo: [],
        }
    }

    editSkill = function(skillId){
        
        this.setState({
            IsEditClicked: true,
            EditSkillId:skillId,
        });
    }

    deleteSkill = function(skillId){
        let userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 0;
        let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/skills/delete/" + skillId,
            dataType: "json",
            data: JSON.stringify({
                "userId": userId,
                "token": token,
                "skillId": skillId,
            }),
            success: response => {
                if (response['status'] === 1)
                {
                    NotificationManager.success(response['message']);
                    this.getSkillsList();
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

    updateState(event){
        this.setState({
            [event.target.id] : true,
        });
    }
    
    getLevelTitle = function(level)
    {
        var titles = ['Basic', 'Intermediate', 'Advanced'];
        return titles[level];
    }

    getSkillsList = function()
    {
        let userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 0;
        let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
        $.ajax({
            type: "GET",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/skills/get",
            dataType: "json",
            data: JSON.stringify({
                "userId": userId,
                "token": token,
            }),
            success: response => {
                /*if (response['status'] === 1)
                {*/
                   this.setState({
                        skillsInfo: response
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
        this.getSkillsList()
    }

    render(){

        if (this.state.createNew)
        {
            return (
                <Redirect to="/jobseeker/create/skill" push/>
            );
        }

        if (this.state.IsEditClicked)
        {
            return (
                <Redirect to={"/jobseeker/edit/skill/" + this.state.EditSkillId} push/>
            );
        }

        return(
            <div>
                <button type="button" class="btn btn-success" id="createNew" onClick={event => this.updateState(event)}>
                        Add new skill
                </button>
                <br/>
                <br/>
                <table class="table table-striped table-dark" id="posts">
                    <thead>
                        <th colSpan="3">YOUR SKILLS</th>
                    </thead>
                <tbody>
                {this.state.skillsInfo.map(function(item, key) {
                    
                            return (
                                <tr key = {key}>
                                    <td id="skill">{item.name}</td>
                                    <td id="skill">{this.getLevelTitle(item.level)}</td>
                                    <td align="right">
                                        <input type="button" className="btn btn-warning" value="Edit" onClick={event => this.editSkill(item.id)}/>
                                        <input type="button" className="btn btn-danger" value="Delete" onClick={event => this.deleteSkill(item.id)}/>
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

export default Skills;