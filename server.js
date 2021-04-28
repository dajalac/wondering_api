const express= require ('express');
const {response} = require('express');
const knex = require('knex')
const cors = require('cors');

const dotenv = require('dotenv');

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

app.post('/signin', (req, res)=>{
    res.json ('signing')
})

app.post('/register',(req, res)=>{
    const {name, email} = req.body;

    db('users').insert({
        email:email,
        name:name,
        joined: new Date()
    })
    .returning('*')
    .then(response =>{
        res.json(response[0])
    })
    .catch(err => res.status(400).json('unable to register'))
})

app.listen(process.env.PORT, ()=>{
    console.log(`app is up running ${process.env.PORT}`)
})
