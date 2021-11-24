const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingSpotSchema = new Schema({

    /*
    ownerID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    parkingLotID:{
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    */
    description : {
        type: String,
        trim: true
    },
    address :{
        type: String,
        trim: true
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
        type : Date
    },
    availableTo : {
        type : Date
    },
    createdDate : {
        type: Date,
        default : Date.now
    }

})

const parkingSpot = mongoose.model("ParkingSpot", parkingSpotSchema);

module.exports = parkingSpot;