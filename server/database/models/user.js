const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaUser = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});