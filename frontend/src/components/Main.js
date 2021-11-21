import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login/Login';
import Home from './User/Home';
//Create a Main Component
class Main extends Component {
    render(){
        return(
                <Routes>
                    <Route path="/" exact element={<LandingPage/>}></Route>
                    <Route path="/login" exact element={<Login/>}></Route>
                    <Route path="/user/home" exact element={<Home/>}></Route>
                </Routes>

        )
    }
}
//Export The Main Component
export default Main;