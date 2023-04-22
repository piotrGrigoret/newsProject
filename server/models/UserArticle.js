const {Schema, model} = require('mongoose');


const UserArticle = new Schema({
    userId: {type: String,  required: true},
    articleId:{type: String,  required: true},
    
});

module.exports = model('UserArticle', UserArticle);