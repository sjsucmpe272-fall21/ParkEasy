const ParkingSpot = require('../models/parkingSpot');

// add a new parkingspot
exports.addParkingSpot = (req,res) => {
    const payload = req.body;
    const newParkingSpot = new ParkingSpot(payload);

    const savedSpot = newParkingSpot.save()
    return res.status(200).send(savedSpot);
    // return res.json({
    //     message: "Parking Spot added successfully with id: " + newParkingSpot._id 
    // })
}

// get all the available parkingspots
exports.getAllParkingSpots = (req,res) => {
    ParkingSpot.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
}



// get a parkingspot based on parkingspot id
exports.getParkingSpotById = (req,res,next,id)=>{
    ParkingSpot.findById(id)
    .exec((err,parkingSpotId)=>{
        if(err)
        {
            return res.status(400).json({
                error: "Parking Spot Not Found"
            })
        }
        req.parkingSpotId = parkingSpotId;
        next();
    })
}

exports.getParkingSpot = (req,res) => {
    return res.json(req.parkingSpotId);
}


// update a parkingspot based on parkingspot id
exports.updateParkingSpot = (req,res) => {

    ParkingSpot.findByIdAndUpdate(
        { _id: req.parkingSpotId._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, parkingSpotId) => {
         if (err) {
         return res.status(400).json({
              error: "You are not authorized to update this user"
         });
        }
        res.json(parkingSpotId);
        }
    )
}


// delete a parkingspot based on parkingspot id in body
exports.deleteParkingSpot = (req,res)=>{
    ParkingSpot.findByIdAndDelete(req.body.parkingSpotId,(err,paper)=>{
        if (err){
            console.log(err);
            return res.status(400).json({
                error: "No Parking Spot Deleted"
            });
        }
        else{
            console.log("Deleted : ", paper);
            return res.json();
        }
        
    })
}

