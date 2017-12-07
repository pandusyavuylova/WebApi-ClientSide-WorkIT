import React from "react";
import $ from "jquery";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Redirect} from "react-router-dom";

class Home extends React.Component{
    constructor()
    {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            postsInfo: [],
            postId: 0,
            isClicked: false,

        };
    }
    
    handleClick = function(pId){
        this.setState({
            postId: pId,
            isClicked: true,
        });
    };

    componentDidMount(){
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:65300/posts/get",
            dataType: "json",
            data: JSON.stringify({
                "userId" : 0,
            }),
            success: response => {
                console.log(response);
                this.setState({
                    postsInfo: response
                });
                /*if (response['status'] === 1)
                {
                   this.setState({
                        postsInfo: response['data']
                   });
                   
                }
                else
                {  
                    NotificationManager.error(response['message']);
                }*/
            },

            error: function (jqXHR, exception) {
                var msg = '';
                console.log("Error here!");
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

    render(){
        if (this.state.isClicked)
        {
            return (
                <Redirect to={"/post/" + this.state.postId} push/>
            );
        }
        return (
            <div>
                <table class="table table-striped table-dark" id="posts">
                    <thead>
                        <th colSpan="2">ACTIVE POSTS</th>
                    </thead>
                <tbody>
                {this.state.postsInfo.map(function(item, key) {
                    
                           return (
                               <tr key = {key}>
                                   <td id="post">{item.title}<br></br>
                                   {item.description}
                                   </td>
                                   <td align="right"><input type="button" className="btn btn-primary" value="Review" onClick={event => this.handleClick(item.id)}/></td>
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

export default Home;