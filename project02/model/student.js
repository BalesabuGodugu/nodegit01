const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        require:true,
        type:String
    },
    id:{
        required:true,
        type:Number
    },
    email: {
        required:true,
        type:String
    }
})

module.exports = mongoose.model('data',studentSchema);