import React from 'react'
import { Component } from 'react'
import { Grid } from '@mui/material';
// import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Maps from "./../Maps";
import ParkingList from "./../User/ParkingList";
import TopBar from "./../TopBar";
import Autocomplete from 'react-google-autocomplete';

class SearchParking extends Component  {

    componentDidMount() {
        console.log("On Mount", this.props);
    };

    render(){
        const parkingLots = [{
            "id": "parkingSlot1",
            "displayPicture": "https://st2.depositphotos.com/1009634/7235/v/950/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg",
            "title": "Parking behind San Pedro Square",
            "address": "77 N Almaden Blvd, San Jose, CA 95113",
            "coordinates": {
                "lat": 37.335310,
                "lng": -121.896890
            },
            "review": "4",
            "price": "50",
            "distance": "4.5m"
        }, {
            "id": "parkingSlot2",
            "displayPicture": "https://st2.depositphotos.com/1009634/7235/v/950/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg",
            "title": "Parking behind San Pedro Square",
            "address": "77 N Almaden Blvd, San Jose, CA 95113",
            "coordinates": {
                "lat": 37.339680,
                "lng": -121.921760
            },
            "review": "4",
            "price": "50",
            "distance": "5.5m"
        }]

        const mapMarkers = parkingLots.map((lot) => {
            return lot.coordinates
        });

        return (
            <Grid container spacing={2} columns={16} style = {{ height: "100%"}}>
                {/* NAVIGATION */}
                <Grid item xs = {16}>
                    <TopBar />
                </Grid>


                {/* SEARCH */}
                <Grid item xs = { 16 }>
                    {/* <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={[]}
                        renderInput={(params) => <TextField {...params} label="Find Parking At" />}
                        value = "Finding Parking near"
                        onChange = { (e) => e.target.value = e.target.value }
                    /> */}
                    <div style = {{border: "1px solid black"}}> 
                        <Autocomplete
                            inputAutocompleteValue={"San Jose State University"}
                            onPlaceSelected={(place) => console.log(place)}
                            options={{
                                types: ["geocode", "establishment"],
                            }}
                            style = {{height: "100%", width: "99%"}}
                        />
                    </div>
                </Grid>

                {/* PARKING SPOTS AND THEIR POSITIONS ON MAP */}
                <Grid item xs={8}>
                    <div style = {{border: "1px solid black", height: "80vh"}}>
                        <ParkingList 
                        parkingLots = { parkingLots }
                        />
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div style = {{border: "1px solid black", height: '80vh'}}>
                        <Maps
                        markers = { mapMarkers }
                        zoom = {12} 
                        />
                    </div>  
                </Grid>
            </Grid>
        )
    }

}

export default SearchParking
