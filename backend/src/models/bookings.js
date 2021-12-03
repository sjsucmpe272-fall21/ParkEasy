const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingsSchema = new Schema({

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
    parkingSpot : {
        type: mongoose.Schema.Types.ObjectId,
        trim: true
    },
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        trim: true
    },
    fromTime : {
        type: Date
    },
    toTime : {
        type: Date
    },
    totalAmount : {
        type: Number
    },
    status : {
        type: String,
        trim: true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    lastUpdateAt :{
        type : Date,
        default : Date.now
    },
    transactionId : {
        type : String
    },
    description: String,
    spotImageUrl: String,
    address: String,
    name: String
})

const bookings = mongoose.model("Bookings", bookingsSchema);

module.exports = bookings;