const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

module.exports = locationSchema;