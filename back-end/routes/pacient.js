const express= require("express")
const pacient = express.Router();
const pacientDB= require('../models/pacientDB.js')

//Inserts a new user in our database id field are complete
pacient.post('/register', async (req, res, next) => {
    try {
        const ime = req.body.ime
        const priimek = req.body.priimek
        const email = req.body.email
        const password = req.body.password
        const telefon = req.body.telefon

        if (ime && priimek && email && password && telefon) {
            const queryResult = await pacientDB.create({ime, priimek, email, password, telefon});
            if (queryResult.affectedRows) {
                res.statusCode = 200;
                res.send({ status: { success: true, msg: "New user created" } })
                console.log("New user added!!")
            }
        }
        else {
            res.statusCode = 200;
            res.send({ status: { success: false, msg: "Input element missing" } })
            console.log("A field is missing!")
        }
        res.end();
    } catch (err) {
        console.log(err)
        res.statusCode = 500;
        res.send({ status: { success: false, msg: err } })
        next()
    }

});


pacient.post('/login', async (req, res, next) => {

    try {
        console.log(req.body);
        const username = req.body.username; //email
        const password = req.body.password;
        if (username && password) {
            const queryResult = await pacientDB.verification(username)
            if (queryResult.length > 0) {
                if (password === queryResult[0].password) { //tale if stavek me skrbi
                    //console.log(queryResult)
                    req.session.user = queryResult  //nerazumem cist
                    req.session.logged_in = true
                    res.statusCode = 200;
                    console.log(req.session)
                    console.log(req.cookies)
                    res.json({ user: queryResult[0], status: { success: true, msg: "Logged in" } })
                } else {
                    res.statusCode = 200;
                    res.json({ user: null, status: { success: false, msg: "Username or password incorrect" } })
                    console.log("INCORRECT PASSWORD")
                }
            } else {
                res.statusCode = 200;
                res.send({ user: null, status: { success: false, msg: "Username not registsred" } })
            }
        }
        else {
            res.statusCode = 200;
            res.send({ logged: false, user: null, status: { success: false, msg: "Input element missing" } })
            console.log("Please enter Username and Password!")
        }
        res.end();
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
        next()
    }
});


pacient.get('/session', async (req, res, next) => {
    try {
        res.json(req.session)
    } catch (error) {
        res.sendStatus(500)
    }
})

pacient.get('/logout', async (req,res, next)=>{
    try{
        req.session.destroy(function(err) {
            // cannot access session here
            //res.send({status:{success: false, msg: err}})
          })
 
        res.send({status:{success: true, msg: "Session destroyed"}})
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
        next()
    }
})
 
//manjka: spremeni, delete


module.exports=pacient
