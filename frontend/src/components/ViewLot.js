import React, { Component } from 'react'
import { Grid, Button, Paper,  Box, TextField } from '@mui/material';
import TopBar from "./TopBar";
import Maps from "./Maps";
import Carousel from 'react-material-ui-carousel';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import TitleIcon from '@mui/icons-material/Title';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PersonIcon from '@mui/icons-material/Person';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getHoursAndSeconds } from "./../utilities/Utility";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Swal from 'sweetalert2';
import axios from 'axios';
import { backendUrl } from "./../config";
import { calc_distance } from "./../utilities/Utility";
import NavigationBar from './User/NavigationBar';

export default class ViewLot extends Component {

    constructor(props) {
        super();
    
        this.state = {
            parkingSlot: {
                "description": "",
                "address": "",
                "rate": 4,
                "email": "",
                "contactNumber": "",
                "availableFrom": ``,
                "availableTo": ``,
                "coordinates": {
                    "lat": 37.335310,
                    "lng": -121.896890
                },
                "review": "4",
                "distance": "4.5m",
                "images": [
                    "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-morrison-park/gallery/34--building-exterior.jpg?rev=1dad7e5dfc6e4fdd83c824a73e2a0b62&w=900&h=560&as=1",
                    "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-on-the-alameda/gallery/27--on-site-retail.jpg?rev=460b3c149051434a9cf6113fc15ae03c&w=900&h=560&as=1",
                    "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-morrison-park/gallery/31--building-exterior.jpg?rev=9481122a139d44b3b281ba39783eb57e&w=900&h=560&as=1",
                    "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-on-the-alameda/gallery/27--on-site-retail.jpg?rev=460b3c149051434a9cf6113fc15ae03c&w=900&h=560&as=1"
                ],
                "contact": {
                    "name": ""
                },
            },
            currentLat: null,
            currentLng: null,
            open: true
        };
    };

    async getParkingLotInformation(lotID) {
        try {
            const url = `${backendUrl}/park-easy/api/parkingSpot/${lotID}`;
            const response = await axios.get(url);
            if (!(response && response.data)) throw response
            else return response.data;
        } catch(e) {
            // Error fetching parking slots
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'We are unable to fetch the parking slots currently. Please try again'
            })
        }
    };

    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    currentLat: position.coords.latitude,
                    currentLng: position.coords.longitude,
                })
            })
        };
    };

    componentDidMount() {

        if (!navigator.geolocation) {
            new Swal('Geolocation is not supported by your browser');
        } 
        else {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    currentLat: position.coords.latitude,
                    currentLng: position.coords.longitude,
                }, () => {
                    const URLParameters = window.location.pathname;
                    const parameters = URLParameters.split("/");
                    const slotID = parameters[parameters.length - 1];
                    
                    this.getParkingLotInformation(slotID)
                    .then((parkingLotInformation) => {
                        this.setState({
                            ...this.state,
                            parkingSlot: {
                                "description": parkingLotInformation.description,
                                "address": `${parkingLotInformation.address.addressLine1} ${parkingLotInformation.address.addressLine2}`,
                                "rate": parkingLotInformation.rate,
                                "email": parkingLotInformation.email,
                                "contactNumber": parkingLotInformation.contactNumber,
                                "availableFrom": `Available from ${getHoursAndSeconds(new Date(parkingLotInformation.availableFrom))}`,
                                "availableTo": `To ${getHoursAndSeconds(new Date(parkingLotInformation.availableFrom))}`,
                                "coordinates": {
                                    "lat": parkingLotInformation.location.coordinates[1],
                                    "lng": parkingLotInformation.location.coordinates[0],
                                },
                                "review": parkingLotInformation.review,
                                "images": [
                                    "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-morrison-park/gallery/34--building-exterior.jpg?rev=1dad7e5dfc6e4fdd83c824a73e2a0b62&w=900&h=560&as=1",
                                    "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-on-the-alameda/gallery/27--on-site-retail.jpg?rev=460b3c149051434a9cf6113fc15ae03c&w=900&h=560&as=1",
                                    "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-morrison-park/gallery/31--building-exterior.jpg?rev=9481122a139d44b3b281ba39783eb57e&w=900&h=560&as=1",
                                    "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-on-the-alameda/gallery/27--on-site-retail.jpg?rev=460b3c149051434a9cf6113fc15ae03c&w=900&h=560&as=1"
                                ],
                                "contact": {
                                    "name": parkingLotInformation.name
                                }
                            },  
                        })
                    })
                })
            });
        }
    };

    render() {
        const { parkingSlot, currentLat, currentLng, open} = this.state;
        const fullWidth = true;
        const maxWidth = 'sm';
        
        const coordinates = parkingSlot.coordinates || {};
        console.log("Coordinates are ", coordinates);
        const slotImages = parkingSlot.images || [];

        return (
            <div>
                <Grid container spacing = {2} columns = {16} rows>
                    <Grid item xs = {16}>
                        <div style = {{"width": "100%", overflow: "hidden"}}>
                            <NavigationBar type='user' />
                        </div>
                    </Grid>

                    {/* Padding, Carousel */}
                    <Grid item xs = {1}>
                        <div></div>
                    </Grid>

                    <Grid item xs = { 14  } >
                        <div style = {{ height: "35vh"}}>
                            <Carousel
                            autoPlay
                            interval="2000"
                            navButtonsAlwaysVisible="true"
                            className = "carousel"
                            stopAutoPlayOnHover = "true"
                            style = {{ height: "100%", width: "100%"}}
                            >
                            {
                                slotImages.map((image, index) => 
                                    // <CarouselSlide style = {{border: "5px solid gold"}} key = {index}>
                                    //     <Card>
                                    //         <CardMedia
                                    //             component="img"
                                    //             image={image}
                                    //         />
                                    //     </Card>
                                    // </CarouselSlide>

                                    <Paper style = {{height: "30vh"}}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                image={image}
                                            />
                                        </Card>
                                </Paper>
                                )
                            }
                            </Carousel>
                        </div>
                    </Grid>


                    {/* Padding, Slot information */}
                    <Grid item xs = {2}>
                        <div></div>
                    </Grid>

                    <Grid item xs = { 6 }>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TitleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={parkingSlot.description} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={parkingSlot.address} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={parkingSlot.contact.name} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ContactPhoneIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={parkingSlot.contactNumber} />
                                </ListItemButton>
                            </ListItem>


                        </List>
                    </Grid>

                    <Grid item xs = { 6 }>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DirectionsCarFilledIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`${parseFloat(calc_distance(currentLat, currentLng, parkingSlot.coordinates.lat, parkingSlot.coordinates.lng).toPrecision(2))} KMs from current location`} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AttachMoneyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`${parkingSlot.rate} $ per hour`} />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AccessTimeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={parkingSlot.availableFrom} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <WatchLaterIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={parkingSlot.availableTo} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Grid>

                    {/* Padding, Book Slot button */}
                    <Grid item xs = { 16 }>
                        <Button 
                        variant="contained" 
                        color="success"
                        size="large" 
                        onClick={() => this.setState({open: true})}
                        fullWidth
                        >
                            Book at { parkingSlot.rate }$ per hour
                        </Button>
                    </Grid>

                    {/* Padding, Maps */}
                    <Grid item xs = {2}>
                        <div></div>
                    </Grid>

                    {
                        coordinates.lat && coordinates.lng && (
                            <Grid item xs = { 12 }>
                                <div style = {{ "height": "30vh"}}>
                                    <Maps 
                                    markers = { 
                                        [{
                                            "lat": coordinates.lat,
                                            "lng": coordinates.lng
                                        }]
                                    }
                                    fullscreenControl = { false }
                                    center = {{
                                        lat: coordinates.lat,
                                        lng: coordinates.lng
                                    }}
                                    zoom = {15}
                                    />    
                                </div>
                            </Grid>
                        )
                    }
                
                </Grid>
            
                <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={(e) => this.setState({open: false})}
                >
                    <DialogTitle>Book a slot now</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Choose the period of time that you would be parking your vehicle in
                            </DialogContentText>
                            <Box
                                noValidate
                                component="form"
                                sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                                }}
                            >
                                    <Grid item xs = {12}>
                                        <TextField
                                            margin="none"
                                            required
                                            fullWidth
                                            type="time"
                                            id="from"
                                            label="From time"
                                            name="fromHrs"
                                            autoComplete="type"
                                            // onChange={(e) => { setFrmHrs(e.target.value); setFromHrsError(false); setFrmHrsHelper(''); setToHrsHelper(''); setToHrsError(false); }}
                                            autoFocus
                                            // value={fromHrs}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs = {12}>
                                        <div style = {{height: "5vh"}}></div>
                                    </Grid>

                                    <Grid item xs = {12}>
                                        <TextField
                                            margin="none"
                                            required
                                            fullWidth
                                            type="time"
                                            id="from"
                                            label="To time"
                                            name="toHrs"
                                            autoComplete="type"
                                            // onChange={(e) => { setFrmHrs(e.target.value); setFromHrsError(false); setFrmHrsHelper(''); setToHrsHelper(''); setToHrsError(false); }}
                                            autoFocus
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                        />
                                    </Grid>
                            </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => new Swal("Booked")}>Confirm</Button>
                        <Button onClick={(e) => this.setState({open: false})}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};


// "images": [
//     "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-morrison-park/gallery/34--building-exterior.jpg?rev=1dad7e5dfc6e4fdd83c824a73e2a0b62&w=900&h=560&as=1",
//     "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-on-the-alameda/gallery/27--on-site-retail.jpg?rev=460b3c149051434a9cf6113fc15ae03c&w=900&h=560&as=1",
//     "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-morrison-park/gallery/31--building-exterior.jpg?rev=9481122a139d44b3b281ba39783eb57e&w=900&h=560&as=1",
//     "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-on-the-alameda/gallery/27--on-site-retail.jpg?rev=460b3c149051434a9cf6113fc15ae03c&w=900&h=560&as=1"
// ]