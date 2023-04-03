const jwt = require('jsonwebtoken');
const { secret } = require('../config');
module.exports = function (req, res, next){

    if(req.method === "OPTIONS"){
        next();
    }

    try {
        console.log(req.headers.authorization);
        console.log("**************************");
        const token   = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(403).json({message: "Пользователь не авторизован"});
        }
        const decodedata = jwt.verify(token, secret);
        req.user = decodedata;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: "Пользователь не авторизован"});
    }
}