const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultImageLink = 'http://www.doornmore.com/media/customoptions/66/88676/56/no_icon.png';

let schemaComputer = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    price: {
        type: Number,
        required : true
        
    },
    images:[
        {src:{type: String,required: true}}]

});



module.exports = mongoose.model('Computer',schemaComputer);