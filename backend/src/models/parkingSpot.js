const mongoose = require('mongoose');
// const locationSchema = require('./locationSchema');
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
    // location : {
    //     type: locationSchema
    // },
    location: {
        type: {
            type:  String,
            default: "Point",
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            required: true
        }
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

// Create a 2dsphere index on `location` to enable geodistance queries
parkingSpotSchema.index({ location: '2dsphere' });

const parkingSpot = mongoose.model("ParkingSpot", parkingSpotSchema);

module.exports = parkingSpot;