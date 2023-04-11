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
router.post("/addarchieve", controller.addarchieve);
router.post("/deletearchieve", controller.deletearchieve);
router.post("/getArchieve", controller.getArchieve);
router.post("/comments", controller.comments);
router.post("/changeUser", controller.changeUser);
router.post("/getUser", controller.getUser);
router.post("/deleteUser", controller.deleteUser);
router.post("/newPassword", controller.newPassword);
module.exports = router