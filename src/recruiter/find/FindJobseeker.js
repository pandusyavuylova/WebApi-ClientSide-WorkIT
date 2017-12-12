import React from "react";
import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";

class FindJobseeker extends React.Component
{
    constructor()
    {
        super()
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            Status: 0,
            Title: "",
            Level: -1,
            JobseekersInfo: [],
        }
    }

    updateField(event){
        this.setState({
            [event.target.id] : event.target.value,
        });
    }
    
    getLevelTitle = function(level)
    {
        var titles = ['Basic', 'Intermediate', 'Advanced'];
        return titles[level];
    }

    handleClick = function()
    {
        this.setState({
            Status: 1,
        });
        $.ajax({
            type: "POST",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/user/search/jobseekers",
            dataType: "json",
            data: JSON.stringify({
                "name": this.state.Title,
                "level": this.state.Level,
            }),
            success: response => {
                
      

                // if (response['status'] === 1)
                // {
                     this.setState({
                         Status: 2,
                     });
                   this.setState({
                    JobseekersInfo: response
                   });
                   console.log(response);
                // }
                // else
                // {  
                //     this.setState({
                //         Status: 0,
                //     });
                //     NotificationManager.error(response['message']);
                // }
            },

            error: function (jqXHR, exception) {
                // this.setState({
                //     Status: 0,
                // });
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
        if (this.state.Status === 0)
        {
            return (
                <div>
                    <form class="form-skill">
                        <table>
                            <tr>
                                <td>
                                    <label for="Title"><b>Skill title</b></label>
                                </td>
                                <td>
                                    <input type="text" id="Title"  class="form-control" value={this.state.Title} onChange={event => this.updateField(event)}/>
                                </td>
                            </tr>
        
                            <tr>
                                <td>
                                    <label for="Level"><b>Level</b></label>
                                </td>
        
                                <td>
                                    <select id="Level" value={this.state.Level}  onChange={event => this.updateField(event)}>
                                        <option value="-1">
                                            Nо matter
                                        </option>
        
                                        <option value="0">
                                            Basic
                                        </option>
       
                                        <option value="1">
                                            Intermediate
                                        </option>
        
                                        <option value="2">
                                            Advanced
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        
                            <tr>
                                <td colspan="2">
                                    <input type="button" onClick={this.handleClick} class="btn btn-primary" value="Find" />
                                </td>
                            </tr>
        
                        </table>
                        <div>
                            <NotificationContainer/>
                        </div>
                    </form>
                 </div>
            );
        }
        
        if (this.state.Status === 1)
       {
            return (
                <div>
                    <form class="form-skill">
                        <table>
                            <tr>
                                <td>
                                    <label for="Title"><b>Skill title</b></label>
                                </td>
                                <td>
                                    <input type="text" id="Title"  class="form-control" value={this.state.Title} onChange={event => this.updateField(event)}/>
                                </td>
                            </tr>
        
                            <tr>
                                <td>
                                    <label for="Level"><b>Level</b></label>
                                </td>
        
                                <td>
                                    <select id="Level" value={this.state.Level}  onChange={event => this.updateField(event)}>
                                        <option value="-1">
                                            Nо matter
                                        </option>
        
                                        <option value="0">
                                           Basic
                                        </option>
        
                                        <option value="1">
                                            Intermediate
                                        </option>
        
                                        <option value="2">
                                            Advanced
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        
                            <tr>
                                <td colspan="2">
                                    <input type="button" onClick={this.handleClick} class="btn btn-primary" value="Find" />
                                </td>
                            </tr>
        
                        </table>
                       <div>
                            <NotificationContainer/>
                        </div>
                    </form>
                    <br/>
                    <span>Searching...</span>
                 </div>
            );
        }

        if (this.state.Status === 2)
        {
            return (
                <div>
                    <form class="form-skill">
                        <table>
                            <tr>
                                <td>
                                    <label for="Title"><b>Skill title</b></label>
                                </td>
                                <td>
                                    <input type="text" id="Title"  class="form-control" value={this.state.Title} onChange={event => this.updateField(event)}/>
                                </td>
                            </tr>
        
                            <tr>
                                <td>
                                    <label for="Level"><b>Level</b></label>
                                </td>
        
                                <td>
                                    <select id="Level" value={this.state.Level}  onChange={event => this.updateField(event)}>
                                        <option value="-1">
                                            Nо matter
                                        </option>
        
                                        <option value="0">
                                            Basic
                                        </option>
        
                                        <option value="1">
                                            Intermediate
                                        </option>
        
                                        <option value="2">
                                            Advanced
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        
                            <tr>
                                <td colspan="2">
                                    <input type="button" onClick={this.handleClick} class="btn btn-primary" value="Find" />
                                </td>
                            </tr>
        
                        </table>
                       <div>
                            <NotificationContainer/>
                        </div>
                    </form>
                    <br/>
                    <table class="table table-striped table-dark" id="posts">
                        <thead>
                            <th colSpan="3">JOBSEEKERS</th>
                        </thead>
                        <tbody>
                        {this.state.JobseekersInfo.map(function(item, key) {
                            
                                    return (
                                        <tr key = {key}>
                                            <td id="skill">{item.firstname} {item.lastname}</td>
                                            {/* <td id="skill">{this.getLevelTitle(item.level)}</td> */}
                                            <td id="skill">
                                            {item.skills.map(function(item1, key1){
                                                return (
                                                    <tr key = {key1}>
                                                        <td id="skill">{item1.name} </td>
                                                        <td id="skill">{item1.level}</td>
                                                    </tr>
                                                )
                                            }, this)}
                                            </td>
                                        </tr>
                                        )
                                    }, this)}
                        </tbody>
                    </table>
                 </div>
            );
        }
    }
}

export default FindJobseeker;