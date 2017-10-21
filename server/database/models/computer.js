const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultImageLink = 'http://www.doornmore.com/media/customoptions/66/88676/56/no_icon.png';

let schemaComputer = new Schema({
    title: {
        type: String
    },
    description:{
        brand: {type:String,required:true},
        processor: {type:String,required:true},
        cooler: {type:String,required:true},
        motherBoard: {type:String,required:true},
        ram: {type:String,required:true},
        hdd: {type:String,required:true},
        ssd: {type:String,default: 'none',required:true},
        videoCard: {type:String,required:true,default:'none'},
        font: {type:String,required:true},
    },
    price: {
        type: Number,
        required : true
    },
    imageLink: [{link:{type:String,required:true,default:defaultImageLink}}]
});



module.exports = mongoose.model('Computer',schemaComputer);