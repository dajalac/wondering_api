const jwt = require('jsonwebtoken');



const createLink = (user , secret) =>{

const payload ={
    email: user[0].email,
    id: user[0].id
}

const token = jwt.sign(payload,secret,{expiresIn: '1h'});

const link = `http://localhost:3001/ResetPassord/${user[0].id}/${token}`

return link
}

module.exports = {
    createLink: createLink 
}