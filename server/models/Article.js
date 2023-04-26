const {Schema, model} = require('mongoose');


const Article = new Schema({

    author : {type: String,  default: ""},
    content : {type: String,  default: ""},
    description : {type: String,  default:"" },
    publishedAt : {type: String,  required: true },
    lastUpdate : {type: String, default: new Date()},
    title : {type: String,  required: true },
    url : {type: String,  required: true },
    urlToImage : {type: String,  default: "" },
    source: { type: Object, default: {}},
    public: { type: Boolean, default: false},

    // username : [{type: String, ref: 'Role'}],

});

module.exports = model('Article', Article);
