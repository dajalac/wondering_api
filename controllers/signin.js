
const signinHandler = (req, res, db, bcrypt, validationResult) => {

    //user input validation 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        res.json({ errors: errors.array() })
    }
    else {

        const { email, password } = req.body;

        db.select('email', 'hash').from('login')
            .where('email', '=', email) //check if the email exists in the db
            .then(response => {
                //compare password
                const isPasswordValid = bcrypt.compareSync(password, response[0].hash)
                if (isPasswordValid) {
                    //go to user database end get its informations
                    return db.select('*').from('users')
                        .where('email', '=', email)
                        .then(user => {
                            res.json(user[0])
                        })
                        .catch(err => res.status(400).json('unable to get user'))
                }
                else {
                    res.status(400).json('wrong credentials')
                }
            })
            .catch(err => res.status(400).json('wrong credentials'))
    }
}

module.exports = {
    signinHandler: signinHandler
}