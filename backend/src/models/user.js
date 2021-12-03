const mongoose = require('mongoose');
const AddressSchema = require('./AddressModel');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({

    firstName : {
        type: String,
        trim: true
    },
    lastName : {
        type: String,
        trim: true
    },
    emailId : {
        type: String,
        trim: true,
        index: true,
        unique: true
    },
    password : {
        type: String,
        trim: true
    },
    profileImageUrl: {
        type: String,
    },
    address : {
        type : AddressSchema,
    },
    role : {
        type : String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

userSchema.pre('save', function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash) => {
            if(err){
                return next(err);
            }

            this.password = hash;
            next();
        });
    }
});


userSchema.methods.comparePassword = async function(password) {
    if(!password) throw new Error('Password is missing.');
    try{
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch(err){
        console.log('Error while comparing password : '+err.message);
    }
}


const user = mongoose.model("User", userSchema);

module.exports = user;