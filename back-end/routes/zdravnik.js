const express= require("express")
const zdravnik = express.Router();
const zdravnikDB= require('../models/zdravnikDB.js')

//Inserts a new user in our database id field are complete
zdravnik.post('/register', async (req, res, next) => {
    try {
        const password = req.body.password
        const ime = req.body.ime
        const priimek = req.body.priimek
        const naziv = req.body.naziv
        const specializacija = req.body.specializacija
        const ambulanta_id = req.body.ambulanta_id
        const opis = req.body.opis

        if (password && ime && priimek && naziv && specializacija && ambulanta_id && opis) {
            const queryResult = await zdravnikDB.create({password, ime, priimek, naziv, specializacija, ambulanta_id, opis});
            if (queryResult.affectedRows) {
                res.statusCode = 200;
                res.send({ status: { success: true, msg: "New doctor created" } })
                console.log("New doctor added!!")
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


zdravnik.post('/login', async (req, res, next) => {

    try {
        console.log(req.body);
        const username = req.body.username; //zdravnik_id
        const password = req.body.password;
        if (username && password) {
            const queryResult = await zdravnikDB.verification(username)
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


zdravnik.get('/session', async (req, res, next) => {
    try {
        res.json(req.session)
    } catch (error) {
        res.sendStatus(500)
    }
})

zdravnik.get('/logout', async (req,res, next)=>{
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
 



module.exports=zdravnik
