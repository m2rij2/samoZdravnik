const express= require("express")
const auth = express.Router();

//const DB=require('./db/dbConn.js')
const pacientDB= require('../models/pacientDB.js')

auth.get('/',(req,res)=>{
    console.log("The route has been reached")
    res.send("autentikacija")
});
















module.exports = auth