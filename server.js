const express= require ('express');
const {response} = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const dotenv = require('dotenv');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const forgotPassword = require('./controllers/forgotPassword');
const resetPassword = require('./controllers/resetPassword');


dotenv.config(); //to grab the env variables

// conecting to the database
 const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1', // indicates where the db is. For now it is in my computer 
      user : 'postgres', //user of the db. just give \d to find out
      password : ' ',
      database : 'wondering'
    }
  });


const app = express();
app.use(express.urlencoded({extented:false}));
app.use(express.json()); 
app.use(cors());



app.get('/', (req, res)=>{
    res.json('this is working')
})

app.post('/signin', (req, res) => {signin.signinHandler(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.registerHandler(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.profileHandler(req, res, db)})

app.put('/image', (req, res) => {image.imageHandler(req, res, db)})
app.post('/imageurl', (req, res) => {image.apiCallHandler(req, res)})

app.post('/forgotPassword', (req, res)=>(forgotPassword.forgotPasswordHadler(req, res, db)))

app.get('/resetPassword/:id/:token', (req, res)=>(resetPassword.resetPasswordHandler(req, res, db)))
app.post('/updatePassword', (req, res)=>(resetPassword.updatePasswordHandler(req, res, db, bcrypt)))

app.listen(process.env.PORT, ()=>{
    console.log(`app is up running ${process.env.PORT}`)
})
