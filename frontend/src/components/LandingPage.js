import React from 'react'
import { Component } from 'react'
import { get_cookie } from '../utilities/Utility'

class LandingPage extends Component  {

    componentDidMount() {
        const userId = get_cookie(document, 'userId');
            if (!userId) {
                window.open("/login", "_self");
            };
    };

    render(){
        return (
            <div>
                Welcome to Park Easy!
            </div>
        )
    }

}

export default LandingPage
