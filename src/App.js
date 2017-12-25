import React from "react";

import {
    Route,
    HashRouter,
    BrowserRouter
} from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import NavMenu from "./Nav";
import Profile from "./Profile";
import NewPost from "./add/Post";
import Logout from "./Logout";

import Resumes from "./jobseeker/Resumes";
import Skills from "./jobseeker/Skills";
import Offers from "./jobseeker/Offers";
import Requests from "./jobseeker/Requests";
import Posts from "./recruiter/Posts";
import Offer from "./jobseeker/Offer";

import CreatePost from "./recruiter/create/Post";
import CreateOffer from "./recruiter/create/Offer";
import CreateSkill from "./jobseeker/create/Skill";
import CreateRequest from "./jobseeker/create/Request";
import CreateResume from "./jobseeker/create/Resume";
import FindJobseeker from "./recruiter/find/FindJobseeker";
import EditPost from "./recruiter/edit/Post";
import EditSkill from "./jobseeker/edit/Skill";
import EditResume from "./jobseeker/edit/Resume";
import PrivateRoute from "./PrivateRoute";

class App extends React.Component{
    
    constructor(){
        super()
        this.state = {
            isAuth: false,
        };
    }

    render(){
        return (
            <BrowserRouter>
            <div class="container">
            
            <NavMenu />
      
            <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/registration" component={Registration} />
                <Route path="/post/:id" component={NewPost}/>
                <Route path="/profile/:id" component={Profile}/>
                <Route path="/logout" component={Logout}/>
                <PrivateRoute path="/recruiter/posts" component={Posts} AllowUser={1}/>
                <PrivateRoute path="/recruiter/create/post" component={CreatePost} AllowUser={1}/>
                <PrivateRoute path="/recruiter/create/offer/:id" component={CreateOffer} AllowUser={1}/>
                <PrivateRoute path="/recruiter/find/jobseeker" component={FindJobseeker} AllowUser={1}/>
                <PrivateRoute path="/recruiter/edit/post/:id" component={EditPost} AllowUser={1}/>
                <PrivateRoute path="/jobseeker/skills" component={Skills} AllowUser={0}/>
                <PrivateRoute path="/jobseeker/create/skill" component={CreateSkill} AllowUser={0}/>
                <PrivateRoute path="/jobseeker/edit/skill/:id" component={EditSkill} AllowUser={0}/>
                <PrivateRoute path="/jobseeker/edit/resume/:id" component={EditResume} AllowUser={0}/>
                <PrivateRoute path="/jobseeker/resumes" component={Resumes} AllowUser={0}/>
                <PrivateRoute path="/jobseeker/requests" component={Requests} AllowUser={0}/>
                <PrivateRoute path="/jobseeker/create/resume" component={CreateResume} AllowUser={0}/>
                <PrivateRoute path="/jobseeker/create/request/:id" component={CreateRequest} AllowUser={0}/>
                <PrivateRoute path="/jobseeker/offers" component={Offers} AllowUser={0}/>
                <PrivateRoute path="/jobseeker/offer/:id" component={Offer} AllowUser={0}/>
            </div>
      
            <footer class="footer">
              <p>&copy; Company 2017</p>
            </footer>
      
          </div> 
          </BrowserRouter>
        );
    }
}

export default App;