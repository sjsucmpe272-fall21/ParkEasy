/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../config';
import parking_spot_default from '../../assets/images/parking_spot_default.jpeg';
require('dotenv').config();
const theme = createTheme();

export default function OwnerDashBoard() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    const ownerID = sessionStorage.getItem('userId');
    const url = `${backendUrl}/park-easy/api/parkingSpot/getAll`;
    console.log(url);
    const response = await axios.get(url);
    setCards(response.data);
    console.log(cards);
  }, []);

  const onAddParking = () => {
    sessionStorage.setItem('action','create');
    navigate('/owner/add-parkinglot');
  };

  const onViewParking = (parking) => {
    sessionStorage.setItem('action','view');
    sessionStorage.setItem('selectedParkingId',parking._id);
    navigate('/owner/add-parkinglot');
  };

  const onEditParking = (parking) => {
    sessionStorage.setItem('action','edit');
    sessionStorage.setItem('selectedParkingId',parking._id);
    navigate('/owner/add-parkinglot');
  };

  const onViewBookings = () => {
    navigate('/owner/bookings');
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                ParkEasy
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                One stop solution for renting parking spaces
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" onClick={() => onAddParking()}>Add Parking</Button>
                <Button variant="outlined" onClick={() => onViewBookings()}>View Bookings</Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {console.log(cards)}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card.DishId} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: '0.25%',
                      }}
                      image={parking_spot_default}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>
                        {card.description}
                      </Typography>
                      <Typography>
                        from:
                        {' '}
                        {card.availableFrom}
                      </Typography>
                      <Typography>
                        to:
                        {' '}
                        {card.availableTo}
                      </Typography>
                      <Typography>
                        rate: $
                        {card.rate}/hr
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => onEditParking(card)}>Edit</Button>
                      <Button size="small" onClick={() => onViewParking(card)}>View</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
}
