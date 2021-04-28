const registerHandler = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;

    //check if they are empty
    if(email==='' || name ===''|| password===''){
       return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    //first inserting into login table then inserting into users table
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        }).into('login')
            .returning('email')
            .then(loginEmail => {
                // create a new user 
                return trx('users')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .returning('*') //it will insert and return all the columns of what was just inserted
                    .then(response => {
                        // display the last user entered in the database
                        res.json(response[0]) // response it what was returned from db, in our case it will be what was just insterted
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'))

}

module.exports = {
    registerHandler:registerHandler
}