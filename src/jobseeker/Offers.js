import React from "react";
import $ from "jquery";
import {Redirect} from "react-router-dom";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Offers extends React.Component{
    constructor()
    {
        super()
        this.reviewOffer = this.reviewOffer.bind(this);
        this.state = {
            OffersInfo : [],
            Redirecting: false,
            RedirectOfferId: 0,
        }
    }

    reviewOffer = function(offerId)
    {
        this.setState({
            Redirecting: true,
            RedirectOfferId: offerId,
        });
    }

    componentDidMount()
    {
        let userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 0;
        $.ajax({
            type: "GET",
            contentType: "application/json",
            headers: {
                "authorization": "bearer " + localStorage.getItem("token")
            },
            url: "http://localhost:65300/offers/jobseeker",
            dataType: "json",
            data: JSON.stringify({
                "jobseekerId": userId,
            }),
            success: response => {
                //if (response['status'] === 1)
                //{
                   this.setState({
                        OffersInfo: response
                   });
                   console.log(response);
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
    render(){
        if (this.state.Redirecting)
        {
            return(
                <Redirect to={'/jobseeker/offer/' + this.state.RedirectOfferId} push/>
            );
        }
        return (
            <div>
                <table class="table table-striped table-dark" id="posts">
                    <thead>
                        <th colSpan="2">OFFERS</th>
                    </thead>
                <tbody>
                
                {this.state.OffersInfo.map(function(item, key) {
                            return (
                                    <tr key = {key} class={(item.status === false) ? "unread" : ""}> 
                                    <td>
                                        <span class="title">{item.message}</span>
                                        <br/>
                                        <span class="extra-info">{item.date}</span>
                                    </td>
                                    <td align="right">
                                            <input type="button" className="btn btn-primary" value="Review offer" onClick={event => this.reviewOffer(item.id)}/>
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

export default Offers;