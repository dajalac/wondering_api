const express = require ('express');
const dotenv = require('dotenv')


const app = express();

app.get('/', (req, res)=>{
    res.send('this is working')
})

app.listen(process.env.PORT, ()=>{
    console.log('app is up running')
})
