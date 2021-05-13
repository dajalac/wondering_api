const express= require ('express');
const {response} = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const dotenv = require('dotenv');
const {check, validationResult } = require('express-validator');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const forgotPassword = require('./controllers/forgotPassword');
const resetPassword = require('./controllers/resetPassword');
const setting = require('./controllers/setting');



dotenv.config(); //to grab the env variables

// conecting to the database
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});


const app = express();
app.use(express.urlencoded({extented:false}));
app.use(express.json()); 
app.use(cors());



app.get('/', (req, res)=>{
    res.json('this is working')
})

app.post('/signin',[
                    check('email').isEmail(),
                    check('password').isAlphanumeric()
                  ], (req, res) => {signin.signinHandler(req, res, db, bcrypt,validationResult)})

app.post('/register', [
                      check('email').isEmail(),
                      check('password').isAlphanumeric(),
                      check('name').isAlpha()
                      ], (req, res) => { register.registerHandler(req, res, db, bcrypt, validationResult) });


app.put('/image', (req, res) => {image.imageHandler(req, res, db)});
app.post('/imageurl', (req, res) => {image.apiCallHandler(req, res)});

app.post('/forgotPassword',[
                            check('email').isEmail()
                          ], (req, res)=>(forgotPassword.forgotPasswordHadler(req, res, db,validationResult)));

app.get('/resetPassword/:id/:token', (req, res)=>(resetPassword.resetPasswordHandler(req, res, db)));

app.post('/updatePassword',[
                          check('password1').isAlphanumeric(),
                          check('password2').isAlphanumeric(),
                          ], (req, res)=>(resetPassword.updatePasswordHandler(req, res, db, bcrypt,validationResult)));

app.post('/updateName',[
                          check('name').isAlphanumeric()
                        ], (req,res)=>{setting.editNameHandler(req, res, db,validationResult)});

app.post('/deleteUser',(req,res)=>{setting.deleteAccountHandler(req,res,db)});

app.listen(process.env.PORT, ()=>{
    console.log(`app is up running ${process.env.PORT}`)
})
