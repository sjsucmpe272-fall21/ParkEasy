import React from 'react'
import { Component } from 'react'
import { Grid, List, ListItemAvatar, Avatar, ListItemText, ListItem, Divider } from '@mui/material';
import { backendUrl } from "./../../config";
import Swal from 'sweetalert2';
import { get_cookie } from "./../../utilities/Utility";
import axios from 'axios';

class UserBookingList extends Component  {
    
    constructor() {
        super();
        this.state = {
            selected: 0,
            bookings: [{
                parkingSpot: "", // ID
                fromTime : "",
                toTime : "",
                totalAmount : "",
                status : "",
                createdAt : "",
                transactionId : "",
                description: "",
                spotImageUrl: "",
                address: ""

            }]
        }
    };

    async getUsersBookings(userId) {
        try {
            const url = `${backendUrl}/park-easy/api/user/booking/${userId}`;
            const response = await axios.get(url);
            if (!response || !response.data || response.status != 200) throw response;
            return response.data;
        } catch(e) {
            throw e;
        }
    };

    componentDidMount() {
        const userId = get_cookie(document, 'userId');
        if (!userId) {
            window.open("/login", "_self");
        }

        this.getUsersBookings(userId)
        .then((bookings) => {
            this.setState({
                bookings
            })
        }).catch(() => {
            new Swal("Failed to fetch your bookings. Please try again");
        });

    };

    getDayAndTime(d) {
        const newDay = new Date(d);
        return `${newDay.toLocaleDateString()}(${newDay.getHours()}:${newDay.getMinutes()})`;
    };
    
    render(){
        
        const { selected, bookings } = this.state;

        return (

                bookings && bookings.length > 0 ?
                (
                    <List>
                    {
                        bookings.map((booking, index) => {
                            return (
                                <ListItem
                                alignItems="flex-start"
                                selected={selected === index}
                                onClick = { (event) => this.setState({selected: index})}
                                onMouseEnter = { (event) => this.setState({selected: index})}
                                key = {index}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt= {index} src = {booking.spotImageUrl} />
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={booking.address}
                                        secondary = {booking.description}
                                        secondary = {`Booked from ${this.getDayAndTime(booking.fromTime)} to ${this.getDayAndTime(booking.toTime)} for a total of ${booking.totalAmount}$`}
                                    />

                                    {/* <ListItemText
                                        primary={booking.description}
                                        secondary = {`Booked from ${booking.fromTime} to ${booking.toTime} for a total of ${booking.totalAmount}$`}
                                    /> */}
                                    <Divider dark />
                                </ListItem>
                            )
                        })
                    }
                    </List>
                )
                :
                <div>
                    <div style = {{border: "0px solid black", marginTop: "25%", marginLeft: "25%"}}>
                        <p style = {{fontSize: "8vh"}}> No bookings yet </p>
                    </div>
                </div>
        )
    };
};

export default UserBookingList