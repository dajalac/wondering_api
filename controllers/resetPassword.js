const createSecret = require ('../cors/createSecret');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const resetPasswordHandler = (req, res,db)=>{
    const {id, token} = req.params;

    //const secret = createSecret.createSecret(id)
    db.select('*').from('login')
    .where('id','=',id)
    .then(response =>{
        if (response.length > 0){
            const secret = createSecret.createSecret(response[0].hash)
            try {
                const payload = jwt.verify(token, secret);
                if (payload.id == id) {
                    res.json(true)
                } else {
                    res.json(false)
                }

            } catch (error) {
                console.log(error)
                res.json(false)
            }
        } else {
            res.json(false)
        }
    }) 
}

const updatePasswordHandler = (req, res,db,bcrypt)=>{
   const {password1, password2, id} = req.body;
  
  

    if (password1 !== password2) {
        res.json({ message: 'passwords do not match' })
    } else {
    const hash = bcrypt.hashSync(password1);
        db('login').where('id', '=', id)
            .update({ "hash": hash })
            .then(response => {
                console.log('sucesso!', response)
                res.json({ message: 'password updated with sucess' })           
    /*
    db('login').where('id', '=', id)
    .update({"hash": hash})
    .then(response =>{
        console.log('sucesso!',response)
        res.json({message: 'password updated with sucess'})
    })*/

   
   })
}
}

module.exports = {
    resetPasswordHandler: resetPasswordHandler,
    updatePasswordHandler:updatePasswordHandler
}