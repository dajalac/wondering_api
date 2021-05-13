const editNameHandler = ((req, res, db,validationResult)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        console.log(errors.array())
        res.json({message: errors.array()})
    }else{
   
    const {name, id} = req.body;
      
    db('users').where('id', '=', id)
    .update({"name": name})
    .then((response)=>{
        console.log(response)
        if(response >0){
            res.json({message: 'name updated'})
        }else{
            res.json({message: 'User id is not in your database'})
        }
      
    })
    .catch(err => res.status(400).json({message: 'unable to edit name'}))

    }
})

const deleteAccountHandler = ((req, res, db)=>{
    const {id} = req.body

    db('login')
    .where('id','=', id)
    .del()
    .then(response =>{
        if(response>0){
            res.json({message:'user deleted'})
        }
        else{
            res.json({message:'unable to delete user'})
        }
    })
    .catch(err => res.status(400).json({message: 'something went wrong'}))
})

module.exports={
    editNameHandler: editNameHandler,
    deleteAccountHandler: deleteAccountHandler
}