import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login/Login';
import Home from './User/Home';
import LocationSearchModal from './Dashboard/Location';
import ParkingLot from './Dashboard/ParkingLot';
import OwnerDashBoard from './Dashboard/OwnerDashboard';
//Create a Main Component
class Main extends Component {
    render(){
        return(
                <Routes>
                    <Route path="/" exact element={<LandingPage/>}></Route>
                    <Route path="/login" exact element={<Login/>}></Route>
                    <Route path="/user/home" exact element={<Home/>}></Route>
                    <Route path="/owner/home" exact element={<OwnerDashBoard/>}></Route>
                    <Route path="/owner/add-parkinglot" exact element={<ParkingLot/>}></Route>
                </Routes>

        )
    }
}
//Export The Main Component
export default Main;