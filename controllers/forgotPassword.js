const createSecret = require ('../cors/createSecret')
const tokenAndLink = require ('../cors/tokenAndLink')
const sentEmail = require('../cors/sendEmail')


const forgotPasswordHadler = (req, res,db)=>{
    const { email} = req.body;

    // check if email is in db
    db.select('*').from('login')
    .where('email','=',email) 
    .then(response =>{
        if (response.length > 0){
            const secret = createSecret.createSecret(response[0].hash)
            const link = tokenAndLink.createLink(response, secret)
            sentEmail.sendUserEmail(response[0].email,link)
            res.status(200).json(link)
        } else{
            res.satatus(400).json('something went woring')
        }
    })
    .catch(err =>res.status(400).json('unable to get user'))
}

module.exports = {
    forgotPasswordHadler : forgotPasswordHadler
}