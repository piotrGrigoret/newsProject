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
    ],
    
    }),
);
// app.use(cors({
//     origin: 'http://localhost:3000',
//     // optionsSuccessStatus: 200
//   }));
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     if (req.method === "OPTIONS") {
//       res.status(200).send("OK");
//     } else {
//       next();
//     }
//   });
  
app.use("/auth", authRouter);

const start = async() => {
    try {
        await mongoose.connect("mongodb+srv://myLocalEnvironment:qeJu0Y16qXr3W1hU@cluster0.wnvgx3j.mongodb.net/news-project?retryWrites=true&w=majority")
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }


}
start();
app.post("/test", (req, res)=>{
  console.log(req.body);
})





