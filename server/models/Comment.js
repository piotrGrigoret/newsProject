const {Schema, model} = require('mongoose');


const Comment = new Schema({
    nickname:{type: String,  required: true},        
    text : {type: String,  required: true },
    userId: {type: String,  required: true},
    articleId:{type: String,  required: true},
    date:   {type: Date, default: Date.now},
    image:  {type: String, required:true},
});

module.exports = model('Comment', Comment);