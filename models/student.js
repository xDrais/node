const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Student = new Schema({
    Name: {type : String , required:true}  ,
    Age: Number ,
    Class: String,
    Note: Number,
}) ;

module.exports = mongoose.model('students',Student);