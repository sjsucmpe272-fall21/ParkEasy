import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';

const theme = createTheme();

export default class SignUp extends React.Component{

  state = {
        role:"user"
  }

  onChangeField = (event) => {
    this.setState({[event.target.name]: event.target.value});
   }

  handleSubmit = async (event) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    event.preventDefault();
        let formData = new FormData();
        //formData.append("dishImage", this.state.dishImage);

        for (var key in this.state) {
            formData.append(key, this.state[key]);
        }

        console.log("state info "+JSON.stringify(this.state));

        console.log("formData "+JSON.stringify(formData));
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        await axios.post('http://localhost:8070/park-easy/api/user/register', formData)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){

                    this.props.history.push("/login");

                }
            })
            .catch(err => {
                if(err.response){
                    this.setState({
                        errorMessage: "Somethig went wrong"
                    })
                }

            });
  };

  handleImageFile = (event) => {
    console.log("Files are "+JSON.stringify(event.target.files));
    this.setState({profileImage: event.target.files[0]});
    console.log("File in state "+JSON.stringify(this.state.profileImage));
}

  render(){
        return (
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >

                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        onChange={this.onChangeField}
                        id="firstName"
                        label="First Name"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        onChange={this.onChangeField}
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        onChange={this.onChangeField}
                        id="emailId"
                        label="Email Address"
                        name="emailId"
                        autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        onChange={this.onChangeField}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        onChange={this.onChangeField}
                        id="street"
                        label="Street"
                        name="street"
                        autoComplete="street"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        onChange={this.onChangeField}
                        id="city"
                        label="City"
                        name="city"
                        autoComplete="city"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        onChange={this.onChangeField}
                        id="state"
                        label="State"
                        name="state"
                        autoComplete="state"
                        />
                     </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        onChange={this.onChangeField}
                        id="country"
                        label="Country"
                        name="country"
                        autoComplete="country"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        onChange={this.onChangeField}
                        id="zipcode"
                        label="Zipcode"
                        name="zipcode"
                        autoComplete="zipcode"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {/* <InputLabel id="demo-simple-select-label">Role</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="role"
                            value={this.state.role}
                            label="Role"
                            onChange={this.onChangeField}
                        >
                            <MenuItem value={"user"}>User</MenuItem>
                            <MenuItem value={"owner"}>Owner</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                    <input className="form-control" id="profileImage" type="file"
                                            name="profileImage"
                                            onChange = {this.handleImageFile}

                                            />
                    </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
            </ThemeProvider>
        );
    }
}