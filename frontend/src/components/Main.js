import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login/Login';
import Home from './User/Home';
import SearchParking from "./User/SearchParking";
import ViewLot from "./ViewLot";

//Create a Main Component
class Main extends Component {
    render(){
        return(
                <Routes>
                    <Route path="/" exact element={<LandingPage/>}></Route>
                    <Route path="/login" exact element={<Login/>}></Route>
                    <Route path="/user/home" exact element={<Home/>}></Route>
                    <Route path = "/user/search" exact element = {<SearchParking />}></Route>
                    <Route path = "/lots/:lotID" exact element = {<ViewLot/>} ></Route>
                </Routes>

        )
    }
}
//Export The Main Component
export default Main;