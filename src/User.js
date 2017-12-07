
import $ from "jquery";

export function getUserType()
{
    if (!localStorage.getItem("userType"))
    {
        localStorage.setItem("userType", "2");
    }

    var userType = localStorage.getItem("userType");

    if ((userType !== "2") && (userType !== "0") && (userType !== "1"))
    {
        localStorage.setItem("userType", "2");
    }
    
    return localStorage.getItem("userType");
}

export function CheckUserAuth()
{
    if (!localStorage.getItem("userId"))
    {
        localStorage.setItem("userId", 0);
    }

    if (!localStorage.getItem("token"))
    {
        localStorage.setItem("token", "");
    }

    var response = {};
    /*$.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:5000/api/user/checkAuth",
        async: false,
        dataType: "json",
        data: JSON.stringify({
            "userId" : localStorage.getItem("userId"),
            "token" : localStorage.getItem("token"),
        }),

        success: function(data){
            response = data;
        },

        error: function(){
            response = {"status" : 0, "userType" : 0};
        }
    })*/

    response.token = localStorage.getItem("token");
    response.userType = localStorage.getItem("userType");

    return response;
}

