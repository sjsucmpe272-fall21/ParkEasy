import React from 'react'
import { Component } from 'react'
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Autocomplete from 'react-google-autocomplete';
import { getLatLngFromGoogleAutoComplete } from '../../utilities/Utility';
import NavigationBar from './NavigationBar';

class Home extends Component  {
    
    onPlaceSelected(place) {
        const { lat, lng } = getLatLngFromGoogleAutoComplete(place);
        window.open(`/user/search?lat=${lat}&lng=${lng}`, "_self");
    };
    
    render(){
        return (
            <Grid style = {{ height: "119vh", backgroundColor: "black", overflow: "hidden"}} container spacing = {16} columns = {16}>

                <Grid item xs = {16}>
                        <NavigationBar type='user' />
                </Grid>

                {/* Search Input */}
                <Grid item xs = {16} style = {{ padding: 0, height: "15vh", border: "0px solid red", overflow: "hidden"}}>
                    <div style = {{ "margin-left": "28%", width: "50%"}}>
                        <Autocomplete
                            inputAutocompleteValue={"San Jose State University"}
                            onPlaceSelected={ (place) => this.onPlaceSelected(place)}
                            options={{
                                types: ["geocode", "establishment"],
                            }}
                            style = {{"border-radius": "4vh", "margin": "3vh", padding: "2.5vh", width: "99%", "border": "2px solid blue", "font-size": "3vh"}}
                        />
                    </div>
                </Grid>

                {/* Background Image */}
                <Grid item xs = {2.25}></Grid>

                <Grid 
                item 
                xs = {13} 
                style = {{ 
                    height: "70vh", 
                    border: "0px solid blue",
                    background: `url("https://filmsupply-files.s3.amazonaws.com/fs/files/production/clip_th/123978/2-h.484.VVxoiNjjmtYlENdyy3MFM2gNaptMFNfK1516Jazx.jpg") no-repeat fixed center`, 
                    backgroundSize: "100%",
                    "border-radius": "4vh"
                    }}>
                    
                </Grid>

                {/* <Grid item xs = {1}></Grid> */}
            </Grid>
        )
    }

}

export default Home

{/* <Autocomplete
                            inputAutocompleteValue={"San Jose State University"}
                            onPlaceSelected={ (place) => this.onPlaceSelected(place)}
                            options={{
                                types: ["geocode", "establishment"],
                            }}
                            style = {{height: "7vh", width: "99%", "border": "2px solid blue"}}
                        /> */}