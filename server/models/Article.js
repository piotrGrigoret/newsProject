const {Schema, model} = require('mongoose');


const Article = new Schema({

    author : {type: String,  required: true},
    content : {type: String,  required: true},
    description : {type: String,  required: true },
    publishedAt : {type: String,  required: true },
    title : {type: String,  required: true },
    url : {type: String,  required: true },
    urlToImage : {type: String,  required: true },
    userId : {type: String,  required: true },
    privat : {type: String,  required: true},
    source: { type: Object, default: {}},
    // username : [{type: String, ref: 'Role'}],

});

module.exports = model('Article', Article);