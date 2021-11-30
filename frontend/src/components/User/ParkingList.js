import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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
                        <ListItem 
                        alignItems="flex-start"
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}
                        key = {index}
                        >
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src = {lot.displayPicture} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={lot.title}
                                secondary = {
                                    <React.Fragment>
                                        <Typography component="span" color="textPrimary">
                                            {lot.address}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom component="div">
                                            {lot.distance}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                            <ListItemButton 
                            focusRipple={true}
                            divider={true}
                            onClick={(event) => handleSlotSelected(event, lot.id)}
                            >
                                Available @ {lot.price}$/hour
                            </ListItemButton>
                        </ListItem>    
                    )
                })
            }
                    
        </List>
    )
}

export default ParkingList;