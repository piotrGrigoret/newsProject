const Router = require("express");
const router = new Router;
const controller = require("./authController");
const {check} = require("express-validator");
const authMiddleware = require("./middlewaree/authMiddleware");


router.post("/registration", [
    check('username', message = "Username cannot be empty").notEmpty(),  
    check('password', message = "Password cannot be less than 4 and more than 10 characters").isLength({min:4, max:10})  
], controller.registration);
router.post("/login", controller.login);
router.post("/newPassword", controller.newPassword);

router.post("/getUser", controller.getUser);
router.post("/changeUser", controller.changeUser);
router.post("/deleteUser", controller.deleteUser);

router.get("/getArticlesBusiness", controller.getArticlesBusiness);
router.get("/getArticlesTechnologies", controller.getArticlesTechnologies);

router.post("/getArchieve", controller.getArchieve);
router.post("/addarchieve", controller.addarchieve);
router.post("/deletearchieve", controller.deletearchieve);

router.post("/comments", controller.comments);
router.post("/getComments", controller.getComments);
router.post("/checkArticleOnOpenComments", controller.checkArticleOnOpenComments);

router.post("/changefoto", controller.changefoto);


module.exports = router
