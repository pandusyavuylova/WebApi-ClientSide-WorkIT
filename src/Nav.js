import React from "react";
import {NavLink} from "react-router-dom";
import {getUserType, CheckUserAuth} from "./User";

class NavMenu extends React.Component{

    render(){
        var userInfo = CheckUserAuth();
        
        if (userInfo['token'] === '')
        {
            return(
                <div class="header clearfix">
                  <nav>
                    <ul class="nav nav-pills float-right">
                      <li class="nav-item">
                        <NavLink className="nav-link" exact to="/" activeClassName="nav-link active">Home</NavLink>
                      </li>
                      <li class="nav-item">
                        <NavLink className="nav-link" to="/login" activeClassName="nav-link active">Login</NavLink>
                      </li>
                      <li class="nav-item">
                        <NavLink className="nav-link" to="/registration" activeClassName="nav-link active">Registration</NavLink>
                      </li>
                    </ul>
                  </nav>
                  <h3 class="text-muted">WorkIT</h3>
                </div>
            );
        }
        else if (userInfo['userType'] === "1")
        {
            return(
                <div class="header clearfix">
                <nav>
                  <ul class="nav nav-pills float-right">
                    <li class="nav-item">
                      <NavLink className="nav-link" exact to="/" activeClassName="nav-link active">Home</NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink className="nav-link" to="/recruiter/posts" activeClassName="nav-link active">Posts</NavLink>
                    </li>
                    <li class="nav-item">
                       <NavLink className="nav-link" to="/recruiter/find/jobseeker" activeClassName="nav-link active">Find jobseeker</NavLink>
                   </li>
                    <li class="nav-item">
                      <NavLink className="nav-link" to="/logout" activeClassName="nav-link active">Logout</NavLink>
                    </li>
                  </ul>
                </nav>
                <h3 class="text-muted">WorkIT</h3>
              </div>
            );
        }
        else
        {
          return(
            <div class="header clearfix">
            <nav>
              <ul class="nav nav-pills float-right">
                <li class="nav-item">
                  <NavLink className="nav-link" exact to="/" activeClassName="nav-link active">Home</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink className="nav-link" to="/jobseeker/skills" activeClassName="nav-link active">Skills</NavLink>
                </li>
                <li class="nav-item">
                      <NavLink className="nav-link" to="/jobseeker/resumes" activeClassName="nav-link active">Resumes</NavLink>
                </li>
                <li class="nav-item">
                      <NavLink className="nav-link" to="/jobseeker/offers" activeClassName="nav-link active">Offers</NavLink>
                </li>

                <li class="nav-item">
                      <NavLink className="nav-link" to="/jobseeker/requests" activeClassName="nav-link active">Requests</NavLink>
                </li>
                <li class="nav-item">
                      <NavLink className="nav-link" to="/logout" activeClassName="nav-link active">Logout</NavLink>
                </li>
              </ul>
            </nav>
            <h3 class="text-muted">WorkIT</h3>
          </div>
        );
        }
        

    }
}

export default NavMenu;
