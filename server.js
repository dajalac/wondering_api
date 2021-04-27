const express= require ('express');
const {response} = require('express');
const knex = require('knex')
const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config(); //to grab the env variables

// conecting to the database
const knex = require('knex')({
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

app.listen(process.env.PORT, ()=>{
    console.log(`app is up running ${process.env.PORT}`)
})
