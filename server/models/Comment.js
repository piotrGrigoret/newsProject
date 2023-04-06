const {Schema, model} = require('mongoose');


const Comment = new Schema({

    username : {type: String, unique: true, required: true},
    nickname :{type: String,  required: true },    
    text : {type: String,  required: true },
    userId: {type: String,  required: true},
    // username : [{type: String, ref: 'Role'}],

});

module.exports = model('Comment', Comment);