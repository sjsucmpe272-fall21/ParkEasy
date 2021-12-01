// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable import/no-named-as-default */
// /* eslint-disable max-len */
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import MenuItem from '@mui/material/MenuItem';
// import { TextField, Avatar } from '@mui/material';
// import { useHistory } from 'react-router-dom';
// // eslint-disable-next-line import/no-named-as-default-member
// import { useSelector, useDispatch } from 'react-redux';
// import TablePagination from '@material-ui/core/TablePagination';
// import NavigationBar from '../Navigation/NavigationBar';
// import backendServer from '../../Config';
// import setCustomerId from '../../state/action-creators/restaurantActionCreator';

// const theme = createTheme();

// const approvalStatus = [{
//     key: 'approved',
//     value: 'denied'
// }]
// const generalStaus = [{
//   key: 'all',
//   value: 'All Bookings',
// },
// {
//   key: 'new',
//   value: 'New Order',
// }];

// const allstatuses = [...allStatus, ...generalstatuses, ...pickupstatuses, ...deliverystatuses];

// const RestaurantOrder = () => {
//   const [initialLoad, setInitialLoad] = useState([]);
//   const [cards, setCards] = useState([]);
//   const [currentCard, setCurrentCard] = useState([]);
//   const [openOrder, setOpenOrder] = useState(false);
//   const [status, setStatus] = useState('All Orders');
//   const [currentStatus, setCurrentCardStatus] = useState('');
//   const history = useHistory();
//   const restaurant = useSelector((state) => state.login.user);
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const onStatusChange = (event) => {
//     setStatus(event.target.value);
//     if (event.target.value === 'All Orders') {
//       setCards(initialLoad);
//     } else if (event.target.value !== '') {
//       const sfilter = initialLoad.filter((item) => item.OrderStatus != null && item.OrderStatus === event.target.value);
//       setCards(sfilter);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   useEffect(async () => {
//     if (!restaurant.RestaurantId) history.push('/');
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common.Authorization = token;
//     }
//     const restaurantId = restaurant.RestaurantId;
//     const response = await axios.get(`${backendServer}/orders/restaurant/${restaurantId}`);
//     setCards(response.data);
//     setInitialLoad(response.data);
//   }, []);

//   const onUpdateStatus = (card) => {
//     setOpenOrder(true);
//     setCurrentCard(card);
//     setCurrentCardStatus(card.OrderStatus);
//   };

//   const onStatusUpdate = () => {
//     axios.post(`${backendServer}/orders/${currentCard.OrderId}/status`, { OrderStatus: currentStatus })
//       .then(() => {
//         const idx = cards.findIndex((item) => item.OrderId === currentCard.OrderId);
//         const newCards = [...cards];
//         newCards[idx].OrderStatus = currentStatus;
//         setCards(newCards);
//       })
//       .catch(() => {
//         // eslint-disable-next-line no-alert
//         alert('error while updating status');
//       });
//     setOpenOrder(false);
//   };

//   const onViewCustomer = (card) => {
//     dispatch(setCustomerId(card.CustomerId));
//     history.push('/restaurant/customer/profile');
//   };

//   return (
//     <>
//       <NavigationBar type="restaurant" search={false} />
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <main>
//           <Box
//             sx={{
//               bgcolor: 'background.paper',
//               pt: 8,
//               pb: 6,
//             }}
//           >
//             <Container maxWidth="sm">
//               <Typography
//                 component="h1"
//                 variant="h2"
//                 align="center"
//                 color="text.primary"
//                 gutterBottom
//               >
//                 Customer Orders
//               </Typography>
//               <Typography variant="h5" align="center" color="text.secondary" paragraph>
//                 Here's what people have ordered...
//               </Typography>
//               <Stack
//                 sx={{ pt: 4 }}
//                 direction="row"
//                 spacing={2}
//                 justifyContent="center"
//               />

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 select
//                 value={status}
//                 onChange={onStatusChange}
//                 name="status"
//                 label="Order Status"
//                 type="text"
//                 id="status"
//                 autoComplete="status"
//               >
//                 {allstatuses.map((option) => (
//                   <MenuItem key={option.key} value={option.value}>
//                     {option.value}
//                   </MenuItem>
//                 ))}
//               </TextField>

//             </Container>
//           </Box>
//           <Container sx={{ py: 4 }} maxWidth="md">
//             <TablePagination
//               rowsPerPageOptions={[2, 5, 10]}
//               component="div"
//               count={cards.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onChangePage={handleChangePage}
//               onChangeRowsPerPage={handleChangeRowsPerPage}
//             />
//             <Grid container spacing={1}>
//               {(rowsPerPage > 0
//                 ? cards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 : cards).map((card) => (
//                   <Grid item key={card.OrderId} xs={12}>
//                     <Card>
//                       <CardContent>
//                         <Grid container spacing={1}>
//                           <Grid item xs={12} sm={2}>
//                             <Avatar
//                               src={card.ImageUrl}
//                               sx={{ width: 50, height: 50 }}
//                             />
//                             <Typography onClick={console.log('hi')} gutterBottom variant="h5" component="h2">
//                               {card.CustomerName}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={12} sm={4}>
//                             <Typography>
//                               Ordered on :
//                               {' '}
//                               {card.CreatedAt}
//                             </Typography>
//                             <Typography>
//                               Order Type :
//                               {' '}
//                               {card.DeliveryType}
//                             </Typography>
//                             <Typography>
//                               Order Status :
//                               {' '}
//                               {card.OrderStatus}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={12} sm={3}>
//                             <Button onClick={() => { onViewCustomer(card); }} variant="text">View Customer</Button>
//                           </Grid>
//                           <Grid item xs={12} sm={3}>
//                             <Button onClick={() => { onUpdateStatus(card); }} variant="text">Update Status</Button>
//                           </Grid>
//                         </Grid>
//                       </CardContent>
//                       <CardActions />
//                     </Card>
//                   </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </main>
//         <div>
//           <Dialog width="50%" open={openOrder} aria-labelledby="form-dialog-title">
//             <DialogTitle id="form-dialog-title">Edit Status</DialogTitle>
//             <DialogContent style={{ width: '600px' }}>
//               <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
//                 <TextField
//                   required
//                   fullWidth
//                   select
//                   value={currentStatus}
//                   onChange={(event) => setCurrentCardStatus(event.target.value)}
//                   name="status"
//                   label="Order Status"
//                   type="text"
//                   id="status"
//                   autoComplete="status"
//                 >
//                   {currentCard.DeliveryType === 'Pick-Up' && foodPickupStatus.map((option) => (
//                     <MenuItem key={option.key} value={option.value}>
//                       {option.value}
//                     </MenuItem>
//                   ))}
//                   {(currentCard.DeliveryType === 'Delivery') && foodDeliveryStatus.map((option) => (
//                     <MenuItem key={option.key} value={option.value}>
//                       {option.value}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Box>
//             </DialogContent>
//             <DialogActions>
//               <Button variant="contained" onClick={() => setOpenOrder(false)} color="primary">
//                 Close
//               </Button>
//               <Button variant="contained" onClick={() => onStatusUpdate()} color="primary">
//                 Update Status
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </div>
//       </ThemeProvider>
//     </>
//   );
// };

// export default RestaurantOrder;
