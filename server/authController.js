const User = require("./models/User");
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require("./config");

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController{

    async registration (req, res){
        try {
            const errors = validationResult(req);
            console.log("************");
            console.log(req.body);
            console.log(errors);
            console.log("************");
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if(candidate){
                return res.status(400).json({message: "Пользователь с таким именем уже существует"});     
            }
            
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword });
            await user.save();
            return res.json({message: "Пользователь успешно зарегитрирован"});
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Registration Error'});
        }
    }
    async login (req, res){
        try {
            const {username, password} = req.body;
            console.log(username);

            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({message:  `Пользователь ${username} не существует`});     
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(400).json({message:  "Введёен неверный пароль"});     
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token})
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