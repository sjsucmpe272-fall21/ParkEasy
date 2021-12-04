import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './LandingPage';
import SignIn from './Login/Login';
import Home from './User/Home';
import SearchParking from "./User/SearchParking";
import ViewLot from "./ViewLot";
import LocationSearchModal from './Dashboard/Location';
import ParkingLot from './Dashboard/ParkingLot';
import OwnerDashBoard from './Dashboard/OwnerDashboard';
import SignUp from './Registration/Signup';
import UserBookings from "./User/UserBookings";
//Create a Main Component
class Main extends Component {
    render(){
        return(
                <Routes>
                    <Route path="/" exact element={<LandingPage/>}></Route>
                    <Route path="/login" exact element={<SignIn/>}></Route>
                    <Route path="/signup" exact element={<SignUp/>}></Route>
                    <Route path="/user/home" exact element={<Home/>}></Route>
                    <Route path = "/user/search" exact element = {<SearchParking />}></Route>
                    <Route path = "/user/bookings" exact element = {<UserBookings />}></Route>
                    <Route path = "/lots/:lotID" exact element = {<ViewLot/>} ></Route>
                    <Route path="/owner/home" exact element={<OwnerDashBoard/>}></Route>
                    <Route path="/owner/add-parkinglot" exact element={<ParkingLot/>}></Route>
                </Routes>

        )
    }
}
//Export The Main Component
export default Main;