const express = require("express");
const { default: mongoose } = require("mongoose");
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const cloudinary = require("cloudinary").v2;
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: [
        'http://localhost:3000',
    ],
    
    }),
);

app.use("/auth", authRouter);

app.post("/changefoto", async(req, res) => {


    try {
        console.log(req.body);
        console.log("****************");
        // настройка multer для загрузки файлов
        const storage = multer.diskStorage({});
        const upload = multer({ storage });

        // middleware для обработки данных формы
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(upload.single('file'));

        // маршрут для обработки POST запроса с загружаемым файлом
        // app.post('/changeFoto', (req, res) => {
            console.log(req.body);
            console.log(req.file);
        // загрузка файла в Cloudinary и т.д.
        // });
    } catch (error) {
        console.log(error);
    }
});


const start = async() => {
    try {
        await mongoose.connect("mongodb+srv://myLocalEnvironment:qeJu0Y16qXr3W1hU@cluster0.wnvgx3j.mongodb.net/news-project?retryWrites=true&w=majority")
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }


}

start();

