import React from 'react'
import { Component } from 'react'
import { Grid, List, ListItemAvatar, Avatar, ListItemText, ListItem, Divider } from '@mui/material';

class UserBookingList extends Component  {
    
    constructor() {
        super();
        this.state = {
            selected: 0
        }
    }

    getDayAndTime(d) {
        const newDay = new Date(d);
        return `${newDay.getDay()}: ${newDay.getUTCDate()}`
    };
    
    render(){
        let _bookings = [{
            parkingSpot: "", // ID
            fromTime : "",
            toTime : "",
            totalAmount : "",
            status : "",
            createdAt : "",
            transactionId : ""
        }]

        let count = 0;
        while (count < 10) {
            count += 1
            _bookings.push(_bookings[0]);
        };

        const { selected } = this.state;
        return (
                <List>
                {
                    _bookings.map((booking, index) => {
                        return (
                            <ListItem
                            alignItems="flex-start"
                            selected={selected === index}
                            onClick = { (event) => this.setState({selected: index})}
                            onMouseEnter = { (event) => this.setState({selected: index})}
                            key = {index}
                            >
                                <ListItemAvatar>
                                    <Avatar alt= {index}/>
                                </ListItemAvatar>

                                <ListItemText
                                    primary={`Booking on ${this.getDayAndTime(booking.createdAt)}`}
                                    secondary = {`Booked from ${booking.fromTime} to ${booking.toTime} for a total of ${booking.totalAmount}$`}
                                />
                                <Divider dark />
                            </ListItem>
                        )
                    })
                }
                </List>
        )
    };
};

export default UserBookingList