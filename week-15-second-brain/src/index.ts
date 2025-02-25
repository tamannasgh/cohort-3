import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  res.json({msg: "hey"});
});


const port = process.env.PORT || 3001;
app.listen(port, ()=>{
  console.log("app listening on port " + port);
  
});