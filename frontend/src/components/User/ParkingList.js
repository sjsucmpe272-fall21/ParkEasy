import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Grid, Button } from '@mui/material';   
import Divider from '@mui/material/Divider';
import { calc_distance, convertMetersToMiles } from '../../utilities/Utility';

const ParkingList = (props) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };

    const handleSlotSelected = (event, id) => {
        window.open(`/lots/${id}`);
    };
    
    const { parkingLots } = props;

    return (
        <List> 
            {
                parkingLots.map((lot, index) => {
                    return(
                        <Grid style = {{"border": "0px solid green"}} container spacing={2} columns={16}>

                            <Grid item xs = {16} style = {{"border": "0px solid black"}}>
                                <ListItem 
                                alignItems="flex-start"
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index)}
                                onMouseEnter = { (event) => handleListItemClick(event, index)}
                                key = {index}
                                divider={true}
                                >
                                    <ListItemAvatar style = {{width: "30%"}}>
                                        <Avatar alt="Remy Sharp" src = {lot.spotImageUrl} style={{ border: "1px solid black", height: '20vh', width: '100%', borderRadius: "0" }}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={lot.title}
                                        secondary = {
                                            <React.Fragment>
                                                <Typography component="span" color="textPrimary">
                                                    {lot.address}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                        style = {{ margin: "5% 0% 0% 5%", width: "50%"}}
                                    />
                                    <ListItemButton 
                                    divider={true}
                                    >
                                        <div style = {{ margin: "15% 5% 10% 0%", width: "20%"}}>
                                            {`${
                                                    parseFloat(
                                                        convertMetersToMiles(calc_distance(props.currentLat, props.currentLng, lot.location.coordinates[1], lot.location.coordinates[0]))
                                                    ).toPrecision(2)    
                                                } miles away
                                            `}
                                        </div>
                                    </ListItemButton>
                                </ListItem>    

                                <Divider variant="inset" component="li" />

                            </Grid>


                            <Grid item xs = {16}>
                                <Button
                                fullWidth
                                variant="contained" 
                                size="large" 
                                onClick={(event) => handleSlotSelected(event, lot._id)}
                                style = {{backgroundColor: "#9DDED3", borderRadius: "4vh"}}
                                >
                                    Book at {lot.rate}$/hour
                                </Button>
                            </Grid>
                            
                            <Grid item xs = {16}>
                                <hr></hr>
                            </Grid>
                        </Grid>
                    )
                })
            }
                    
        </List>
    )
}

export default ParkingList;