const User = require("./models/User");
const Article = require("./models/Article");
const Comment = require("./models/Comment");
const UserArticle = require("./models/UserArticle"); 

const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require("./config");

// const cloudinary = require("cloudinary").v2;
// const multer = require('multer');

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
            console.log(candidate);
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
            const candidate = await User.findOne({username: user.username});
            if(candidate){
                if(candidate._id.toString() !== user._id){
                    console.log("a user with the same username already exists");
                    return res.status(400).json({message: "a user with the same username already exists"});     
                }else{
                    await User.findByIdAndUpdate(
                        {_id: user._id},
                        {
                            username:user.username,
                            nickname:user.nickname,
                            password:user.password,
                        }
                    );
                    console.log("user change sucess");
                    return res.json({message: "user change sucess"});    
                }
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
                console.log("user change sucess");
                return res.json({message: "user change sucess"});
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
        //    console.log(responseUser);                 
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
            
            if(newPassword.length < 4 || newPassword.length > 10 || newPassword === ""){
                return res.status(400).json({message:  "Password cannot be less than 4 and more than 10 characters"});
                console.lo


            }
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


    // РАБОТА С  АРХИВОМ


    async getArchieve (req, res){
        
        try {
            const userId = req.body._id;

            const userArticle = await UserArticle.find({userId});
            const ids = userArticle.map(obj => obj.articleId);
            
           
            const articlesPublic =  await Article.find({public: true});
            // console.log(articlesPublic)
           
            const articlesPrivat = [];
            for (let id of ids) {
                const article = await Article.findById(id);
                articlesPrivat.push(article);
            }
            // console.log(articlesPrivat);
            res.json({articlesPrivat, articlesPublic});
        } catch (error) {
            console.log(error)
        }
    
    }
    // async checkDeletePrivateArhieve(req, res){
    //     try {
    //         const articleDate = req.body.publishedAt;
    //         const checkObject = await Article.find({publishedAt:articleDate})            //Я  ПРОВЕРЯЮ ЕСТЬ ЛИ ОБЪЕКТ В БД И ЕСЛИ ДА ТО  Я ПРОСТО МЕНЯЮ ЕМУ ЗНАЧЕНИЕ   
    //         // const checkObject1 = await Article.find(articleContent)               
    //         if(checkObject){
    //             console.log("there is already such an object in the database :" + req.body.author);
    //         }
    //         res.json({checkObject});
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async addarchieve (req, res){
        
            try {
                const {author, title, description, url, urlToImage, publishedAt, content, userId, source} = req.body;
                const isObjectInDB = await Article.findOne({publishedAt});
                
                if(isObjectInDB){
                    console.log("object is in db repeat");
                    const userArticle = new UserArticle({userId, articleId: isObjectInDB._id});
                
                    console.log("object was added in private archieve");
                    await userArticle.save();

                }else{
                    const article = new Article({author, title, description, url, urlToImage, publishedAt, content , source});
                    
                    const userArticle = new UserArticle({userId, articleId: article._id});
                    await article.save();
                    await userArticle.save();
                    console.log("UserArticle: userID = " + userArticle.userId + ", articleID = " + userArticle._id + " save");
                    console.log("article " + author + " save");
                    res.json({article});
                
                }
                
            } catch (error) {
                console.log(error)
            }
    }
 
    async deletearchieve (req, res){
        // временно поменяю - всё работает

        // try {
        //     const {_id} = req.body;
        //     Article.findByIdAndDelete(_id)        
        //     .then((doc) => {
        //       console.log("article " + " delete");
        //     })
            // .catch((err) => {
            //   console.error(err);
            // });                                                       
        // } catch (error) {
        //     console.log(error);
        // }
        
        try {
            const userId = req.body.userData._id;
            const articleId = req.body.propsObject._id;
            const isObjectinPublicArchieve = await Article.findOne({_id: articleId})
            
            if(isObjectinPublicArchieve && isObjectinPublicArchieve.public){
                console.log("_id: " + articleId + "= object already have in public archieve");
                
                const userArticle = await UserArticle.findOneAndDelete({articleId, userId});

                console.log(userArticle._id);
                console.log("archieve was deleted from privat archieve PRIVAT LIST");
            }else{
                console.log("_id: " + articleId + " = archieve already have not in public archieve");

                const userArticle = await UserArticle.findOneAndDelete({articleId, userId});
                const article = await Article.findOneAndDelete(articleId);   
                console.log(" archieve was deleted from  archieve AT ALL");
                
            }
             
        } catch (error) {
            console.log(error);
        }           
    }
   
    
    // Работа с комментарияи
    async comments (req, res){
        try {
            const {nickname, userId, image, articleId, text, date} = req.body.copyMessage;
            const {author, title, description, url, urlToImage, publishedAt, content,  privat, source, deleteFromPrivate } = req.body.currentСomment;

            const checkObjectInDB = await Article.findOne({title});
            console.log(articleId);

            if(articleId){
                console.log("******************************");
                const comment = new Comment({nickname, userId, image, articleId, text, date});
            
                await  Article.findByIdAndUpdate(
                    {_id: articleId},
                    {
                        public: true,
                        lastUpdate: comment.date
                    },
                );
                console.log("You save comment in exist object:  '" + comment.text +"', " + "save in" + " _id: '" + checkObjectInDB._id + "'" );
                comment.save();
                
            }  
            else{
                
                const {author, title, description, url, urlToImage, publishedAt, content, userId, privat, source, deleteFromPrivate } = req.body.currentСomment;
                const article = new Article({author, title, description, url, urlToImage, publishedAt, lastUpdate: date, content, userId,  source, public:true});
                
                await article.save();
                console.log("article " + author + " save");
                res.json({article});
            
                const comment = new Comment({nickname, userId, image, articleId: article._id, text, date});

                console.log("'" + comment.text +"'" + " save in new object" + " _id:" + article._id);
                comment.save();

            }
            

        } catch (error) {
            console.log(error)
        }
    }
    
    async getComments (req, res){
        
        
        try {
            if(req.body.password){
                const {_id} = req.body;
                const comments =  await Comment.find({userId: _id});
                res.json({comments});

            }else{

                const id = req.body._id;

                const comments =  await Comment.find({articleId: id});
                // console.log(comments);
                res.json({comments});
            }
            

        } catch (error) {
            console.log(error);
        }
    }
    async checkArticleOnOpenComments (req, res){
        try {
            const  {publishedAt, title} = req.body;
            const copyObject  = await Article.findOne({title});
            if(copyObject){
                console.log("this object is in DB. On front was sended copy from DB for use _id");
                res.json({copyObject});
            }
        } catch (error) {
            console.log(error);
        }
    }
  

    // async changefoto(req, res){
    //     try {
    //         console.log(req.body);
    //         console.log("****************");
    //         // настройка multer для загрузки файлов
    //         const storage = multer.diskStorage({});
    //         const upload = multer({ storage });

    //         // middleware для обработки данных формы
    //         use(express.urlencoded({ extended: true }));
    //         use(express.json());
    //         use(upload.single('file'));

    //         // маршрут для обработки POST запроса с загружаемым файлом
    //         // app.post('/changeFoto', (req, res) => {
    //             console.log(req.body);
    //             console.log(req.file);
    //         // загрузка файла в Cloudinary и т.д.
    //         // });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // Настройки Cloudinary
// cloudinary.config({
//     cloud_name: "dckzfe6y5",
//     api_key: "235978599428842",
//     api_secret: "ATMOg0dxvy2DPcKN8t8cNm4iBA4"
//   });

// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

// res.then((data) => {
//   console.log(data);
//   console.log(data.secure_url);
// }).catch((err) => {
//   console.log(err);
// });


    
}

module.exports = new authController();