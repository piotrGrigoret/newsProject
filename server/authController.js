const User = require("./models/User");
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require("./config");

const generateAccessToken = (id, roles) => {                 // ПОКА НЕ ЗНАЮ КАК С ТОКЕНАМИ ДЕЛАТЬ  - ПОТОМ НАДО УЗНАТЬ 

    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController{

    async registration (req, res){
        console.log(req);

        try {
            const errors = validationResult(req);
           
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Registration error", errors});
            }
            const {username, password, nickname} = req.body;
            const candidate = await User.findOne({username});
            if(candidate){
                
                return res.status(400).json({message: "a user with the same name already exists"});     
            }
            
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword, nickname});
            await user.save();
            console.log("user save sucess");
            return res.json({message: "Пользователь успешно зарегитрирован"});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Registration Error'});
        }
    }
    async login (req, res){
        try {
            const {username, password} = req.body;

            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({message:  `User ${username} is not exist`});// УЗНАТЬ МОЖНО ЛИ ЧИТАТЬ СООБЩЕНИЯ ИЗ СТАТУСА 400 И ПЕРЕДАВАТЬ ИХ ВО ФРОНТЕНД     
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(400).json({message:  "Wrong password entered"});     
            }
            // const token = generateAccessToken(user._id); // ПОКА НЕ ЗНАЮ КАК С ТОКЕНАМИ ДЕЛАТЬ  - ПОТОМ НАДО УЗНАТЬ , ПОКА ПО ПРОСТОМУ ДЕЛАТЬ
            console.log(username + "login");
            return res.json({user});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'login Error'});

        }
    }
    async getUsers (req, res){
        try {
            const users = await User.find();
            res.json(users);       
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new authController();