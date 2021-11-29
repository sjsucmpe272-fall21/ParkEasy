const ParkingSpot = require('../models/parkingSpot');

module.exports = {
    GetAllParkingSpotOfUser: function(req) {
        console.log("Inside Manager")
        return ParkingSpot.find({ userId : req.body.userId })
            .exec()
            .then((papers) => {
                return papers;
            })
            .catch(error=>{
                return {
                    error: "No Spots available for this User"
                };
            })
    }
}