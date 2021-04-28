const Clarifai = require('clarifai');
const dotenv = require('dotenv');

dotenv.config(); //to grab the env variables


const app = new Clarifai.App({
    apiKey: process.env.API_KEY 
})

const apiCallHandler =(req, res)=>{
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data =>{
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const imageHandler =(req, res,db)=>{
    const{id} = req.body;

    db('users').where('id', '=', id)
        .increment('number_faces', 1)
        .returning('number_faces')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports ={
    imageHandler: imageHandler,
    apiCallHandler: apiCallHandler
}
