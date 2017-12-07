import React from "react";
import {Redirect} from "react-router-dom";

class Logout extends React.Component{

    render(){
        if (localStorage.getItem("userId"))
        {
            localStorage.setItem("userId", 0);
        }
    
        if (localStorage.getItem("token"))
        {
            localStorage.setItem("token", "");
        }

        return(
            <Redirect to="/" push/>
        );
    }
}

export default Logout;