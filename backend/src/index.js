const express = require("express");
const app = express();
const loginRoute = require('./routes/Login');
const parkingSpotRoute = require('./routes/parkingSpot');
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors(
    {exposedHeaders: 'token',
    origin: true,
    credentials:true
}
))
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/park-easy/api", loginRoute);
app.use("/park-easy/api/parkingSpot", parkingSpotRoute);


app.get("/", function(req,resp){
    resp.send("ParkEasy Endpoints");
});

const mongoose = require('mongoose');
const { mongoDB } = require('../config');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 100
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});


app.listen(8070, function () {
    console.log("Server listening on port 8070");
});

module.exports = app;
