const Clarifai = require('clarifai');
//const { json } = require('express');
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
    const{id, numberOfFace} = req.body;

    // increment the number of faces detected
        db('users').where('id', '=', id)
        .increment('number_faces', numberOfFace)
        .returning('number_faces')
        .then(value =>{
            db('users').countDistinct('id as ranking')
            .where('number_faces','>', value[0])
            .returning('ranking')
            .then(response =>{
                //res.json([1 +( + ranking[0].ranking),value[0] ])
                db('users').where('id', '=', id)
                .update({"ranking": 1 +( + response[0].ranking)})
                .returning(['ranking', 'number_faces'])
                .then(data =>{
                    console.log(numberOfFace)
                    console.log(data[0].number_faces)
                    res.json( [data[0].ranking,data[0].number_faces])
                })
               
                
               
               
            })
            .catch(err => res.status(400).json('unable to calculate ranking'))
        })
        .catch(err => res.status(400).json('unable to get ranking'))


    // ranking
    /* 
        db('users').count('* as ranking')
        .where('number_faces','>', 25)
        .returning('ranking')
        .then(ranking =>{
            console.log(Object.values(ranking[0])+1)
            console.log('hih', userNumberOfFaces[0])
            console.log(ranking[0])
            //res.json(ranking)
        })
        .catch(err => res.status(400).json('unable to get ranking'))*/
       

    /*
    db('users').where('id', '=', id)
        .increment('number_faces', numberOfFaces)
        .returning('number_faces')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to get entries'))*/
}

module.exports ={
    imageHandler: imageHandler,
    apiCallHandler: apiCallHandler
}
