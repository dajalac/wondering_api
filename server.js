const express= require ('express');
const {response} = require('express');
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config(); //to grab the env variables


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
