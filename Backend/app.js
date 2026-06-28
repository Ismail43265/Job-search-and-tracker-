const express= require("express");
const dotenv=require("dotenv");
const cookieParser= require("cookie-parser");

const connectDB= require("./DB/db.js");
const userRoutes = require("./routes/User.routes.js");

const app=express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/user' , userRoutes);

connectDB();

module.exports=app;