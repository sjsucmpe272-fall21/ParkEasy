const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingLot = new Schema({
    spotID: { type: mongoose.Types.ObjectId, auto: true },
    ownerID: { type: String, required: true },
    description: { type: String },
    address: {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    availableFrom: { type: Date },
    availableTo: { type: Date },
    rate: { type: String },
    contactInfo: {
        email: { type: String, required: true },
        contactnumber: { type: String, required: true }
    }
})

const ParkingLot = mongoose.model('ParkingLot', parkingLot);
module.exports = ParkingLot;