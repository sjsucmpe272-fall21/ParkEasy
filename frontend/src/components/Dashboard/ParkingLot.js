import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input } from '@mui/material';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LocationSearchModal from './Location';
import axios from 'axios';

const theme = createTheme();

export default function ParkingLot() {
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [phone, setPhone] = useState('');
    const [rate, setPrice] = useState('');
    const [email, setEmail] = useState('');
    const [disabled, setDisbled] = useState(true);
    const [nameError, setNameError] = useState(false);
    const [nameHelper, setNameHelper] = useState('');
    const [rateError, setPriceError] = useState(false);
    const [rateHelper, setPriceHelper] = useState('');
    const [fromHrs, setFrmHrs] = useState('');
    const [toHrs, setToHrs] = useState('');
    const [fromHrsError, setFromHrsError] = useState(false);
    const [toHrsError, setToHrsError] = useState(false);
    const [fromHrsHelper, setFrmHrsHelper] = useState('');
    const [toHrsHelper, setToHrsHelper] = useState('');
    const [addr1, setAddr1] = useState('');
    const [addr2, setAddr2] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const navigate = useNavigate();

    const isValid = (payload) => {
        // const nameRegex = new RegExp('^[a-zA-Z ]{1,256}$');
        // if (!nameRegex.test(payload.DishName)) {
        //   setNameError(true);
        //   setNameHelper('Name should contain only characters');
        //   return false;
        // }
        // const priceRegex = new RegExp('^[0-9]*[.]?[0-9]+$');
        // if (!priceRegex.test(payload.Price)) {
        //   setPriceError(true);
        //   setPriceHelper('Enter a valid price');
        //   return false;
        // }
        // return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


        const ownerID = sessionStorage.getItem('userId');
        const payload = {
            ownerID,
            name: data.get('name'),
            description: data.get('desc'),
            email: data.get('email'),
            contactNumber: data.get('phone'),
            availableFrom: data.get('fromHrs'),
            availableTo: data.get('toHrs'),
            rate: data.get('rate'),
            address: {
                addressLine1: addr1,
                addressLine2: addr2,
                city: city,
                state: state,
                country: country,
                zipCode: pincode
            },
            latitude: latitude,
            longitude: longitude
        };
        // if (!isValid(payload)) {
        //     return;
        // }
        const response = await axios.post("http://localhost:3001/park-easy/api/parkingSpot/add", payload);
        if (response.data) {
            navigate("/owner/home");
        }
    };

    useEffect(async () => {
        setDisbled(false);
    }, []);

    const onPhotoChange = (event) => {
        if (event.target.files.length === 0) { return; }
        const file = event.target.files[0];
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
    };

    const fileStyle = {
        display: 'none',
    };

    const imageStyle = {
        'margin-left': '45%',
    };

    const onMarkerChanged = (address) => {
        console.log(address);
        setAddr1(address.addressLine1);
        setCity(address.city);
        setState(address.state);
        setCountry(address.country);
        setPincode(address.zipcode);
        setLatitude(address.latitude);
        setLongitude(address.longitude);
    }

    const onPlaceSelected = (address) => {
        console.log(address);
        setAddr1(address.addressLine1);
        setCity(address.city);
        setState(address.state);
        setCountry(address.country);
        setPincode(address.zipcode);
        setLatitude(address.latitude);
        setLongitude(address.longitude);
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <CssBaseline />
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid style={imageStyle} item xs={12} sm={6} alignItems="center">
                                    <Avatar
                                        src={imageUrl}
                                        sx={{ width: 50, height: 50 }}
                                    />
                                    <label htmlFor="image">
                                        <Input accept="image/*" style={fileStyle} id="image" name="image" type="file" onChange={onPhotoChange} />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Parking Spot Name"
                                        name="name"
                                        autoComplete="name"
                                        error={nameError}
                                        helperText={nameHelper}
                                        value={name}
                                        disabled={disabled}
                                        onChange={(e) => { setName(e.target.value); setNameHelper(''); setNameError(false); }}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        id="desc"
                                        label="Description"
                                        name="desc"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        autoComplete="desc"
                                        disabled={disabled}
                                        autoFocus
                                        multiline
                                        minRows="2"
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        id="email"
                                        type="email"
                                        value={email}
                                        label="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                        disabled={disabled}
                                        autoComplete="email"
                                        autoFocus
                                    >
                                    </TextField>

                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="text"
                                        id="phone"
                                        label="Contact Number"
                                        name="phone"
                                        disabled={disabled}
                                        autoComplete="phone"
                                        autoFocus
                                    >
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        type="datetime-local"
                                        id="from"
                                        label="Available From"
                                        name="fromHrs"
                                        autoComplete="type"
                                        error={fromHrsError}
                                        helperText={fromHrsHelper}
                                        onChange={(e) => { setFrmHrs(e.target.value); setFromHrsError(false); setFrmHrsHelper(''); setToHrsHelper(''); setToHrsError(false); }}
                                        autoFocus
                                        value={fromHrs}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        type="datetime-local"
                                        id="to"
                                        label="Available to"
                                        name="toHrs"
                                        value={toHrs}
                                        autoComplete="to"
                                        error={toHrsError}
                                        helperText={toHrsHelper}
                                        onChange={(e) => { setToHrs(e.target.value); setFromHrsError(false); setFrmHrsHelper(''); setToHrsError(false); setToHrsHelper(''); }}
                                        defaultValue="07:30 PM"
                                        autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        value={rate}
                                        error={rateError}
                                        helperText={rateHelper}
                                        onChange={(e) => { setPrice(e.target.value); setPriceError(false); setPriceHelper(''); }}
                                        type="number"
                                        step="0.01"
                                        id="rate"
                                        label="Rate/Hour"
                                        name="rate"
                                        disabled={disabled}
                                        autoComplete="rate"
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <LocationSearchModal onPlaceSelected={onPlaceSelected} onMarkerChanged={onMarkerChanged} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="address1"
                                        name="address1"
                                        label="Address line 1"
                                        fullWidth
                                        value={addr1}
                                        onChange={(e) => { setAddr1(e.target.value); }}
                                        autoComplete="delivery address-line1"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="address2"
                                        name="address2"
                                        label="Address line 2"
                                        fullWidth
                                        value={addr2}
                                        onChange={(e) => { setAddr2(e.target.value); }}
                                        autoComplete="delivery address-line2"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                        value={city}
                                        onChange={(e) => { setCity(e.target.value); }}
                                        autoComplete="delivery address-level2"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="state"
                                        name="state"
                                        label="State/Province/Region"
                                        fullWidth
                                        required
                                        value={state}
                                        onChange={(e) => { setState(e.target.value); }}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Zip / Postal code"
                                        fullWidth
                                        value={pincode}
                                        onChange={(e) => { setPincode(e.target.value); }}
                                        autoComplete="delivery postal-code"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="country"
                                        name="country"
                                        label="Country"
                                        fullWidth
                                        value={country}
                                        onChange={(e) => { setCountry(e.target.value); }}
                                        autoComplete="delivery country"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        disabled={disabled}
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Save
                                    </Button>
                                </Grid>

                            </Grid>
                        </Box>
                    </Paper>
                </Container>
            </ThemeProvider>
        </>
    );
}
