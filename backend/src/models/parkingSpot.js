const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSpotSchema = new Schema({

    name : {
        type: String
    },
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description : {
        type: String,
        trim: true
    },
    address: {
        addressLine1: { 
            type: String, 
            required: true 
        },
        addressLine2: { 
            type: String 
        },
        city: { 
            type: String, 
            required: true 
        },
        state: {
             type: String, 
             required: true 
        },
        zipCode: { 
            type: String, 
            required: true 
        },
        country: { 
            type: String, 
            required: true 
        },
    },
    latitude : {
        type: Number
    },
    longitude : {
        type: Number
    },
    rate : {
        type: Number
    },
    email : {
        type: String,
        trim: true
    },
    contactNumber : {
        type : Number,
        maxlength: 10
    },
    availableFrom :{
        type : String
    },
    availableTo : {
        type : String
    },
    startTime :{
        type : String
    },
    endTime :{
        type : String
    },
    spotImageUrl: {
        type: String,
    },
    createdDate : {
        type: Date,
        default : Date.now
    }

})

const parkingSpot = mongoose.model("ParkingSpot", parkingSpotSchema);

module.exports = parkingSpot;