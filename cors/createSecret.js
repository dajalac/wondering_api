const dotenv = require('dotenv');

dotenv.config(); 

const createSecret = (userPassword) =>{
     const JWT_SECRET = process.env.JWT_SECRET;

     const secret = JWT_SECRET + userPassword; 


     return secret; 

} 

module.exports = {
    createSecret:createSecret
}