import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import "./../css/Maps.css";
import { googleAccessKey } from "./../config";

class MapMarker extends Component {

	constructor() {
		super();
		this.state = {};
	};

	markerOnClick(lat, lng) {
		if (lat & lng) {
			window.open(`https://maps.google.com/?q=${lat},${lng}`);
			console.log("UNREACHABLE");
		};
		console.log("MAP URL");
	};

	render() {
		const { props } = this;
		return (
			<div style = {{cursor: "pointer"}} onClick = {(e) => this.markerOnClick(props.lat, props.lng)}>
				<div className="pin"></div>
				<div className="pulse"></div>
			</div>
		)
	};
}

export default MapMarker;