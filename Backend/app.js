const express= require("express");
const dotenv=require("dotenv");

const connectDB= require("./DB/db.js");

const app=express();
dotenv.config();

connectDB();

module.exports=app;