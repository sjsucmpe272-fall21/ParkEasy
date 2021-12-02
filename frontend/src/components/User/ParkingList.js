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
import { calc_distance } from '../../utilities/Utility';

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
                                key = {index}
                                divider={true}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src = {lot.spotImageUrl} />
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
                                    />
                                    <ListItemButton 
                                    divider={true}
                                    >
                                    { `${parseFloat(calc_distance(props.currentLat, props.currentLng, lot.location.coordinates[1], lot.location.coordinates[0]).toPrecision(2))} Kilometers`}
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
                                >
                                    Available @ {lot.rate}$/hour
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