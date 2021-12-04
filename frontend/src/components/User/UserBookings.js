import React from 'react'
import { Component } from 'react'
import { Grid } from '@mui/material';
import NavigationBar from './NavigationBar';
import UserBookingList from './UserBookingList';

class UserBookings extends Component  {
    
    constructor() {
        super();
    }
    
    render(){
        return (
            <Grid container spacing = {16} columns = {16}>

                <Grid spacing={0} item xs = {16}>
                    <div style = {{"width": "100%", overflow: "hidden"}}>
                        <NavigationBar type='user' />
                    </div>
                </Grid>

                <Grid container xs = {16} style = {{height: "86vh", width: "100%", border: "0px solid black"}}>

                    <Grid item xs = {16} style = {{border: "0px solid red", height: "10%"}}></Grid>


                    <Grid item xs = {3.5} style = {{border: "0px solid red", height: "90%"}}></Grid>

                    <Grid item xs = {10} style = {{border: "0px solid green", height: "90%"}}>
                        <div style = {{ borderRadius: "4vh",  border: "2px solid black", height: "100%",  "overflow-y": "scroll", "overflow-x": "hidden"}}>
                            <UserBookingList />
                        </div>
                    </Grid>

                    <Grid item xs = {2.5} style = {{border: "0px solid blue", height: "90%"}}></Grid>
                </Grid>
            </Grid>
        )
    };
};

export default UserBookings
