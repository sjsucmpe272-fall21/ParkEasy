const Bookings = require('../models/bookings');
const User = require('../models/user');
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');
require('dotenv').config();
var ParkingSpotManager = require("../manager/parkingSpot");

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    Bucket: process.env.AWS_BUCKET_NAME,
    Region: process.env.AWS_BUCKET_REGION,
});


const profileImgUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: process.env.AWS_BUCKET_NAME,
     region: process.env.AWS_BUCKET_REGION,
     acl: 'public-read',
     key: function (req, file, cb) {
    //   console.log("file.originalname : "+file.originalname);
      cb(null, "/parkeasy/user/images/"+ path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    // fileFilter: function( req, file, cb ){
    //  checkFileType( file, cb );
    // }
   }).single('profileImage');

exports.addBooking = (req,res) => {
    const payload = req.body;
    const newBooking = new Bookings(payload);

    newBooking.save((err, result) => {
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

        } else {
            res.send(JSON.stringify({message: "Booking added successfully!"}));
        }
    });
}

//can be used to update the status or cancel booking
exports.updateBookingStatus = (req,res) => {
    const data = msg;
    Bookings.updateOne(
    {_id: data._id},
    {
        $set: {
            status: data.status
        }
    },
    (err, result) => {
        if (err){
            res
            .status(500)
            .send(JSON.stringify({ message: "Something went wrong!", err }));

        } else {
            res.send(JSON.stringify({message: "Booking updated successfully!"}));
        }
    });
}


exports.registerUser = ( req, res ) => {
    console.log("Inside resgiter user");
    profileImgUpload( req, res, ( error ) => {
      if( error ){
       console.log( 'errors', error );
       res.json( { error: error } );
      } else {
       // If File not found
       if( req.file === undefined ){
        console.log( 'Error: No File Selected!' );
        res.json( 'Error: No File Selected' );
       } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        const data = req.body;
        const newUser = new User({
            firstName: data.firstName,
            lastName:data.lastName,
            emailId:data.emailId,
            password:data.password,
            address:{
                city: data.city,
                street: data.street,
                state: data.state,
                country: data.country,
                zipcode: data.zipcode,
            },
            role:data.role,
            profileImageUrl: imageLocation
        });

        newUser.save((err, result) => {
            if (err){
                res
                .status(500)
                .send(JSON.stringify({ message: "Something went wrong!", err }));

            } else {
                res.send(JSON.stringify({user: result}));
            }
        });
       }
      }
     });
    }


exports.userLogin = async function (req, res) {
        const data = req.body;

        console.log(data);

        try{
            const user = await User.findOne({emailId: data.username || data.email});
            console.log("user "+user);
            const result = await user.comparePassword(data.password);
            console.log("Result from compare: "+result);
            if(result){
                console.log("Login successful");
                res.cookie('cookie',"user",{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('userId',String(user._id),{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('userEmail',user.emailId,{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('userFirstName',user.firstName,{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('userLastName',user.lastName,{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('userImageLink',user.profileImageUrl,{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('userLocation',user.address.city,{maxAge: 900000, httpOnly: false, path : '/'});

                res.writeHead(200,{
                'Content-Type' : 'text/plain'
                })
                res.end("Successful Login");


            } else {
                res
                    .status(400)
                    .send(JSON.stringify({ message: "Invalid login credentials." }));

            }
        } catch(err){
            res.status(500).send({message: "Something went wrong", err});
        }

      };    



exports.getBookingsForUser = async (req,res)=>{
        let bookings = await ParkingSpotManager.GetAllBookingsOfUser(req);
        if(bookings==undefined || bookings.hasOwnProperty('error'))
            return res.status(400).json(bookings.error);
        return res.json(bookings);
    }