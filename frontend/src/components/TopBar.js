import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ParkEasyLogo from "./../park_easy.png";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

export default function ViewLot() {
    return (
        // <Grid container spacing = {1} columns = {16}>
        //     <Grid item xs = {16}>
        //         <div 
        //         style = {{ 
        //             border: "1px solid black", 
        //             height: "10vh"
        //         }}
        //         >

        //         </div>
        //     </Grid>
        // </Grid>

        <ThemeProvider theme={darkTheme}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, height: "6vh" }}
                    >
                        <div>
                            <img height = "50" width = "50" src = {ParkEasyLogo} ></img>
                        </div>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        PARK EASY
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};