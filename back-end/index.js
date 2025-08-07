//Basic packages
const express = require('express')
require('dotenv').config()
const session = require('express-session')
const cors=require("cors")
const cookieParser = require("cookie-parser");



const app = express() //Create an instace of ExpressJS
const port = process.env.PORT || 5049

console.log('./models/pacientDB.js'==1)

app.use(cookieParser());

// // set a cookie
app.use(function (req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
      // no: set a new cookie
      var randomNumber=Math.random().toString();
      randomNumber=randomNumber.substring(2,randomNumber.length);
      res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
      console.log('cookie created successfully');
    } else {
      // yes, cookie was already present 
      console.log('cookie exists', cookie);
    } 
    next(); // <-- important!
  });


// Configuration if we had cross origin enabled.
// let sess = {
//     secret: 'our litle secret',
//     resave: false,
//     proxy: true,
//     saveUninitialized: true,
//     cookie: {
//         secure: true,
//         sameSite: 'none'
//     }
// }

let sess = {
    secret: 'our litle secrett',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}
// let sess = {
//     secret: 'our litle secret',
//     saveUninitialized: true,
//     resave: false,
//     proxy: true,
//     name:"app",
//     cookie: {
//         httpOnly: true,
//     }
// }

app.use(session(sess))

//Some configurations
app.use(express.urlencoded({extended : true}));
app.use(cors({
 methods:["GET", "POST"],
  credentials: true, 
  origin: ['http://localhost:3000','http://localhost:3001']
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pacient = require('./routes/pacient')
const zdravnik = require('./routes/zdravnik')
const ambulanta = require('./routes/ambulanta')

app.use('/p', pacient)
app.use('/z', zdravnik)
app.use('/a', ambulanta)

/* od profesorja -----------------------------------
const novice = require('./routes/novice')
const users = require('./routes/users')
const upload = require('./routes/upload')

app.use('/novice', novice)
app.use('/users', users)
app.use('/uplodeFile', upload)
*///-------------------------------------------------

const path = require('path')
app.use(express.static(path.join(__dirname, "build")))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html")) 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
