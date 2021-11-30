import React from 'react'
import { Grid, Button } from '@mui/material';
import TopBar from "./TopBar";
import Maps from "./Maps";
import Carousel from 'react-material-ui-carousel';
import CarouselSlide from 'react-material-ui-carousel';
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
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function ViewLot() {

    const slot_times = [
        "0600",
        "0700",
        "0800",
        "0900",
        "1000",
        "1100",
        "1200",
        "1300",
        "1400",
        "1500",
        "1600",
        "1700",
        "1800",
        "1900",
        "2000",
        "2100",
        "2200"
    ]
    const parkingSlot = {
        "title": "Parking behind San Pedro Square",
        "address": "77 N Almaden Blvd, San Jose, CA 95113",
        "coordinates": {
            "lat": 37.335310,
            "lng": -121.896890
        },
        "review": "4",
        "price": "50",
        "distance": "4.5m",
        "contact": {
            "name": "John Peterson",
            "phone": "669-420-6666"
        },
        "images": [
            "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-morrison-park/gallery/34--building-exterior.jpg?rev=1dad7e5dfc6e4fdd83c824a73e2a0b62&w=900&h=560&as=1",
            "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-on-the-alameda/gallery/27--on-site-retail.jpg?rev=460b3c149051434a9cf6113fc15ae03c&w=900&h=560&as=1",
            "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-morrison-park/gallery/31--building-exterior.jpg?rev=9481122a139d44b3b281ba39783eb57e&w=900&h=560&as=1",
            "https://www.avaloncommunities.com/-/media/images/community-photos/california/northern-california/avalon-on-the-alameda/gallery/27--on-site-retail.jpg?rev=460b3c149051434a9cf6113fc15ae03c&w=900&h=560&as=1"
        ]
    };

    const slotImages = parkingSlot.images || [];

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleStartTimeChange = () => {};

    return (
        <div>
            <Grid container spacing = {2} columns = {16} rows>
                <Grid item xs = {16}>
                    <TopBar />
                </Grid>

                <Grid item xs = { 16 } >
                    <div style = {{ height: "40vh", border: "1px solid red"}}>
                        <Carousel
                        autoPlay
                        interval="2000"
                        navButtonsAlwaysVisible="true"
                        className = "carousel"
                        stopAutoPlayOnHover = "true"
                        >
                        {
                            slotImages.map((image, index) => 
                                <CarouselSlide key = {index}>
                                    <Card style = {{height: "30vh", border: "1px solid black"}}>
                                        <CardMedia
                                            image={image}
                                            style = {{ height: "100%", width: "100%"}}
                                        />
                                    </Card>
                                </CarouselSlide>
                            )
                        }
                        </Carousel>
                    </div>
                </Grid>

                <Grid item xs = { 8 }>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TitleIcon />
                                </ListItemIcon>
                                <ListItemText primary={parkingSlot.title} />
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
                    </List>
                </Grid>

                <Grid item xs = { 8 }>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DirectionsCarFilledIcon />
                                </ListItemIcon>
                                <ListItemText primary={parkingSlot.distance} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AttachMoneyIcon />
                                </ListItemIcon>
                                <ListItemText primary={parkingSlot.price} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ContactPhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary={parkingSlot.contact.phone} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs = { 16 }>
                    <Button 
                    size="large" 
                    fullWidth
                    variant="contained" 
                    color="success"
                    onClick={handleOpen}
                    >
                        Book at { parkingSlot.price }$ per hour
                    </Button>
                </Grid>

                <Grid item xs = { 16 }>
                    <div style = {{ "height": "30vh"}}>
                        <Maps 
                        markers = { 
                            [{
                                "lat": parkingSlot.coordinates.lat,
                                "lng": parkingSlot.coordinates.lng
                            }]
                        }
                        fullscreenControl = { false }
                        zoom = {15}
                        />    
                    </div>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reserve your slot</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill in the below information to confirm your slot reservation
                        </DialogContentText>

                        <Select
                            labelId="demo-simple-select-label"
                            id="select-start-time"
                            label="Start time"
                            size = "medium"
                            defaultValue = { slot_times[0]}
                            onChange={handleStartTimeChange}
                            >
                            {
                                slot_times.map((time) => {
                                    return (
                                        <MenuItem value={time}>{time}</MenuItem>
                                    )
                                })
                            }
                        </Select>

                        <Select
                            labelId="demo-simple-select-label"
                            id="select-start-time"
                            label="Start time"
                            size = "medium"
                            defaultValue = { slot_times[slot_times.length - 1]}
                            onChange={handleStartTimeChange}
                            >
                            {
                                slot_times.map((time) => {
                                    return (
                                        <MenuItem value={time}>{time}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Reserve</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};