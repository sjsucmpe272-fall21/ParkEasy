import React from 'react'
import { Component } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, CardMedia } from '@mui/material';
import Autocomplete from 'react-google-autocomplete';
import { Card } from '@material-ui/core';
import { getLatLngFromGoogleAutoComplete } from '../../utilities/Utility';

class Home extends Component  {
    
    onPlaceSelected(place) {
        const { lat, lng } = getLatLngFromGoogleAutoComplete(place);
        window.open(`/user/search?lat=${lat}&lng=${lng}`, "_self");
    };
    
    render(){
        return (
            <Grid style = {{ backgroundColor: "black"}} container spacing = {16} columns = {16}>


                <Grid style = {{ height: "20vh", border: "0px solid brown"}} item xs = {16}></Grid>

                <Grid style = {{ border: "0px solid yellow"}} item xs = {3}></Grid>
                <Grid item xs = {10} style = {{  border: "0px solid blue"}}>
                    <Box
                        sx={{
                            maxWidth: '100%',
                        }}
                        >
                        <Autocomplete
                            inputAutocompleteValue={"San Jose State University"}
                            onPlaceSelected={ (place) => this.onPlaceSelected(place)}
                            options={{
                                types: ["geocode", "establishment"],
                            }}
                            style = {{height: "7vh", width: "99%", "border": "2px solid blue"}}
                        />
                    </Box>
                </Grid>
                
                <Grid 
                style = {{ 
                    height: "70vh", 
                    "background-image": `url("https://pcdn.columbian.com/wp-content/uploads/2018/03/0307_met_Dog_Moutain_Parking-1226x0-c-default.jpg")`,
                    "background-repeat": "no-repeat",
                    "background-size": "cover",
                    "background-position": "center"
                }}
                item xs = {16}
                >
                </Grid>
            </Grid>
        )
    }

}

export default Home
