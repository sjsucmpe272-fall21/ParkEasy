import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  {Component} from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const theme = createTheme();

export default class SignInSide extends Component {

    state = {
        authFlag : false,
        userType: "user"
    }

    onChangeField = (event) => {
      this.setState({[event.target.name]: event.target.value});
  }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('username'),
            password: data.get('password'),
        });

        const payload = {
            email: data.get('username'),
            password: data.get('password'),
        };
        console.log("payload : "+JSON.stringify(payload));
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        await axios.post('http://localhost:8070/park-easy/api/login', payload)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                    if(this.state.userType === "owner"){
                      console.log("here in owner login");
                      this.props.history.push("/owner/home");
                    } else {
                      console.log("here in user login");
                      this.props.history.push("/user/home");
                    }
                }else {
                    this.setState({
                        authFlag : false
                    })

                }
            })
            .catch(err => {
                if(err.response && err.response.status === 400){
                    this.setState({
                        authFlag : false,
                        errorMessage: "Invalid credentials"
                    })
                }

            });
    };

  render(){
    return (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/parking_spot.jpeg)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >

                <Typography component="h1" variant="h3">
                  ParkEasy
                </Typography>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Email Address"
                    name="username"
                    autoComplete="username"
                    onChange={this.onChangeField}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={this.onChangeField}
                    autoComplete="current-password"
                  />
                  <br/><br/>
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Login as</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="userType"
                    value={this.state.userType}
                    label="Login as"
                    onChange={this.onChangeField}
                  >
                    <MenuItem value={"user"}>User</MenuItem>
                    <MenuItem value={"owner"}>Owner</MenuItem>
                  </Select>
                </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    onClick
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>

                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>

                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
  }

}