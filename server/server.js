const path = require("path");

const express = require("express");
const { default: mongoose } = require("mongoose");
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: [
        'http://localhost:3000',
        "https://newsserver-vrh0.onrender.com",
        "https://newsclient.onrender.com"
    ],
    
    }),
);


app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.static("public"));

app.use("/auth", authRouter);

const start = async() => {
    try {
        await mongoose.connect("mongodb+srv://myLocalEnvironment:qeJu0Y16qXr3W1hU@cluster0.wnvgx3j.mongodb.net/news-project?retryWrites=true&w=majority")
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        console.log(path.join(__dirname, "..", "client", "build"));
    } catch (error) {
        console.log(error);
    }


}

start();

