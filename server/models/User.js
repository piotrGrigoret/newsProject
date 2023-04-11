const {Schema, model} = require('mongoose');


const User = new Schema({

    username : {type: String, unique: true, required: true},
    password : {type: String,  required: true},
    nickname :{type: String,  required: true },
    // username : [{type: String, ref: 'Role'}],
    image:  {type: String, required:true},
    date:   {type: Date, default: Date.now},

});

module.exports = model('User', User);