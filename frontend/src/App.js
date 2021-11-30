import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';



class App extends Component {
  render() {
    console.log("App called")
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;