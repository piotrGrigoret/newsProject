const Router = require("express");
const router = new Router;
const controller = require("./authController");
const {check} = require("express-validator");

router.post("/registration", [
    check('username', message = "Имя не может быть пустым").notEmpty(),  
    check('password', message = "Пароль не может быть больше 4 и менее 10 символов").isLength({min:4, max:10})  
], controller.registration);
router.post("/login", controller.login);
router.get("/users", controller.getUsers);

module.exports = router