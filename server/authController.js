const User = require("./models/User");
const Article = require("./models/Article")
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
            const {username, password, nickname, image, date} = req.body;
            const candidate = await User.findOne({username});
            if(candidate){
                
                return res.status(400).json({message: "a user with the same name already exists"});     
            }
            
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword, nickname, image, date});
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
                return res.status(400).json({message:  `User ${username} is not exist`});     
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

    async changeUser (req, res) {
        try {
            const user = req.body;
            // console.log(user);
            const candidate = await User.findOne({username: user.username});
            // console.log(candidate);
            if(candidate){
                console.log("a user with the same username already exists");
                return res.status(400).json({message: "a user with the same username already exists"});     
            }
            else{
                await User.findByIdAndUpdate(
                    {_id: user._id},
                    {
                        username:user.username,
                        nickname:user.nickname,
                        password:user.password,
                    }
                );
                console.log("user change");
                return res.json({message: "userChange"});
            }
        } catch (error) {
            res.send(error);
        }
    }

    async getUser(req, res){
        
        try {
        const userId = req.body._id;
        // console.log(userId);
           const responseUser = await User.find({_id:userId});
        //    console.log(responseUser);                 /// НЕ ВОЗВРАЩАЕТ
            res.json({responseUser});
        } catch (error) {
            res.send(error);
        }
    }
    async deleteUser(req, res){
        try {
            const idUser = req.body._id;
            User.findByIdAndRemove({_id: idUser}) 
            .then((doc) => {
                console.log("user " + " delete");
            })
            .catch((err) => {
                console.error(err);
            });
        } catch (error) {
            console.log(error);
        }
    }
    async newPassword(req, res){
        try {
            // console.log(req.body);
            const {username, password} = req.body.userDataObj;
            const {newPassword, confirm}  = req.body.newPassword;
            const userId = req.body.userDataObj._id;
            const user = await User.findOne({username});
            const validPassword = bcrypt.compareSync(password, user.password);

            if(!validPassword){
                return res.status(400).json({message:  "Wrong password entered"});     
            }
            if(newPassword !== confirm){
                return res.status(400).json({message:"Password mismatch"});     
            }

            const newHashPassword = bcrypt.hashSync(newPassword, 7);
            await User.findByIdAndUpdate(
                {_id: userId},
                {
                    password:newHashPassword,
                }
            );
            console.log("new hash passwoard");
            res.json({message:"Password changed successfully"});
            
        } catch (error) {
            console.log(error);
        }
    }
    async addarchieve (req, res){
        
            const {author, title, description, url, urlToImage, publishedAt, content, userId, privat, source} = req.body;
            try {
                const article = new Article({author, title, description, url, urlToImage, publishedAt, content, userId, privat, source});
                const isArticleCopy = Article.find(title);
                if(isArticleCopy.title == article.title){
                    console.log("repeat article");
                }else{
                    await article.save();
                    console.log("article " + author + " save");
                    res.json({article});
                }
            } catch (error) {
                console.log(error)
            }
        
    }
    async deletearchieve (req, res){
        
        try {
            const {_id} = req.body;
            Article.findByIdAndDelete(_id)      ///узнать почему колбэки не работают тут  
            .then((doc) => {
              console.log("article " + " delete");
            })
            .catch((err) => {
              console.error(err);
            });         
        } catch (error) {
            console.log(error);
        }
    }
    async getArchieve (req, res){
        
        try {
            const userId = req.body._id;

          const arhArticles = await Article.find({userId: userId});
        //   console.log(arhArticles);
            res.json({arhArticles});
        } catch (error) {
            console.log(error)
        }
    
    }
    
    async comments (req, res){
        try {
            console.log("hello");
        } catch (error) {
            console.log(error)
        }
    }
   
    
}

module.exports = new authController();