


const forgotPasswordHadler = (req, res,db)=>{

   
    
    const { email} = req.body;

    // check if email is in db
    db.select('email').from('login')
    .where('email','=',email) 
    .then(response =>{
        console.log(response)
        if (response.length > 0){
            // send email
            res.json(true)
        } else{
            res.json(false)
        }
    })
    .catch(err =>res.status(400).json('unable to get user'))
}

module.exports = {
    forgotPasswordHadler : forgotPasswordHadler
}