const ParkingSpot = require('../models/parkingSpot');
const User = require('../models/user');
var ParkingSpotManager = require("../manager/parkingSpot")

exports.addParkingSpot = (req,res) => {
    console.log(req.body)
    const payload = req.body;
    const newParkingSpot = new ParkingSpot(payload);

    console.log(newParkingSpot)
    newParkingSpot.save((err, newParkingSpot) => {
        if(err){
            return res.status(400).json({
                err: "NOT able to save user in DB "+"Error is "+err});
        }
        return res.json({
            message: "Parking Spot added successfully with id: " + newParkingSpot._id 
        })
    })
    
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
              error: "Updating the user is not successful!!"
         });
        }
        res.json(parkingSpotId);
        }
    )
}


// delete a parkingspot based on parkingspot id in body
exports.deleteParkingSpot = (req,res)=>{
    ParkingSpot.findByIdAndDelete(req.body.parkingSpotId,(err,spot)=>{
        if (err){
            console.log(err);
            return res.status(400).json({
                error: "No Parking Spot Deleted"
            });
        }
        else{
            console.log("Deleted : ", spot);
            return res.json();
        }
        
    })
}



// get all the parkingspots for a given user(owner)
exports.getAllParkingSpotsOfOwner = async (req,res)=>{
    console.log("Inside Controller")
    console.log(req.body.userID)
    let spots = await ParkingSpotManager.GetAllParkingSpotOfUser(req);
    if(spots==undefined || spots.hasOwnProperty('error'))
        return res.status(400).json(spots.error);
    return res.json(spots);
}

