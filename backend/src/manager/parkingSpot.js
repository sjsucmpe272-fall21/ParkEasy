const ParkingSpot = require('../models/parkingSpot');
const Bookings = require('../models/bookings');

module.exports = {
    GetAllParkingSpotOfUser: function(req) {
        console.log("Inside Manager")
        return ParkingSpot.find({ userId : req.body.userId })
            .exec()
            .then((spots) => {
                return spots;
            })
            .catch(error=>{
                return {
                    error: "No Spots available for this User"
                };
            })
    }
}



module.exports = {
    GetAllBookingsOfUser: function(req) {
        console.log("Inside Manager")
        return Bookings.find({ userId : req.params.userId })
            .exec()
            .then((bookings) => {
                return bookings;
            })
            .catch(error=>{
                return {
                    error: "No bookings available for this User"
                };
            })
    }
}