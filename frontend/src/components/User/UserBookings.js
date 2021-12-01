import React from 'react'
import { Component } from 'react'
import { Grid } from '@mui/material';
import NavigationBar from './NavigationBar';

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

                <Grid spacing={0} item xs = {16} style = {{height: "85vh", width: "100%", border: "2px solid black"}}>
                </Grid>
            </Grid>
        )
    };
};

export default UserBookings
