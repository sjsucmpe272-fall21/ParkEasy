import React from 'react'
import { Component } from 'react'
import { Grid } from '@mui/material';
// import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Maps from "./../Maps";
import ParkingList from "./../User/ParkingList";
import TopBar from "./../TopBar";
import Autocomplete from 'react-google-autocomplete';
import Swal from 'sweetalert2';
import axios from 'axios';
import { backendUrl } from "./../../config";
import { getLatLngFromGoogleAutoComplete } from '../../utilities/Utility';
import NavigationBar from "./NavigationBar";

class SearchParking extends Component  {

    constructor(props) {
        super();
        const queryParams = new URLSearchParams(window.location.search);
        const currentLat = queryParams.get("lat") || 37.3352;
        const currentLng = queryParams.get("lng") || -121.8811;
        this.state = {
            "parkingLots": [],
            currentLat,
            currentLng
        };
    };

    onPlaceSelected(place) {
        const { lat, lng } = getLatLngFromGoogleAutoComplete(place);
        // window.open(`/user/search?lat=${lat}&lng=${lng}`, "_self");
        this.getParkingSlotsAndUpdateView(lat, lng);
    };

    async getParkingSlotsByLatLng(lat, lng) {
        try {
            const url = `${backendUrl}/park-easy/api/parkingSpot/getAll?lat=${lat}&lng=${lng}`;
            const response = await axios.get(url)
            if (!(response && response.data)) throw response
            else return response.data;
        } catch(e) {
            // Error fetching parking slots
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'We are unable to fetch the parking slots currently. Please try again'
            })
        };
    };

    getParkingSlotsAndUpdateView(lat, lng) {
        this.getParkingSlotsByLatLng(lat, lng)
        .then((data) => {
            data.forEach(element => {
                const { address } = element;
                element["address"] = `${address.addressLine1} ${address.addressLine2}`
            });
            this.setState({
                parkingLots: data,
                currentLat: lat,
                currentLng: lng
            })
        }).catch((e) => {/** */})
    };

    componentDidMount() {        
        const { currentLat, currentLng } = this.state;
        this.getParkingSlotsAndUpdateView(currentLat, currentLng);
    };

    render(){
        const { currentLat, currentLng } = this.state;
        const parkingLots = this.state.parkingLots || [];
        const mapMarkers = parkingLots.map((lot) => {
            const { location } = lot;
            const { coordinates } = location;
            return {
                lat: coordinates[1],
                lng: coordinates[0]
            };
        });
        
        return (
            <Grid container spacing={2} columns={16} style = {{ height: "100%", overflow: 'auto'}}>
                {/* NAVIGATION */}
                <Grid item xs = {16}>
                    <div style = {{"width": "100%", overflow: "hidden"}}>
                        <NavigationBar type='user' />
                    </div>
                </Grid>

                {/* SEARCH */}
                <Grid item xs = { 16 }>
                    <div style = {{border: "0px solid black"}}> 
                        <Autocomplete
                            inputAutocompleteValue={"San Jose State University"}
                            onPlaceSelected={(place) => this.onPlaceSelected(place)}
                            options={{
                                types: ["geocode", "establishment"],
                            }}
                            style = {{height: "8vh", width: "99%", "border-radius": "4vh", "font-size": "3vh", padding: "0.5vh"}}
                        />
                    </div>
                </Grid>

                {/* PARKING SPOTS AND THEIR POSITIONS ON MAP */}
                <Grid item xs={8}>
                    <div style = {{border: "1px solid black", height: "80vh", overflow: 'auto'}}>
                        <ParkingList 
                        parkingLots = { parkingLots }
                        currentLat = {currentLat}
                        currentLng = {currentLng}
                        />
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div style = {{border: "1px solid black", height: '80vh'}}>
                        <Maps
                        markers = { mapMarkers }
                        zoom = {12} 
                        center = {{
                            lat: Number(currentLat),
			                lng: Number(currentLng)
                        }}
                        />
                    </div>  
                </Grid>
            </Grid>
        )
    }

}

export default SearchParking
