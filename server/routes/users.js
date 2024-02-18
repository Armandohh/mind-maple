const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require('../models');
const { sign } = require("jsonwebtoken");
const { SECRET_KEY, validateToken } = require('../middleware/AuthMiddleware');

//post route to create user
router.post("/", async (request, response) => {
    //get username, email, birthday and password from request body
    const { username, email, birthday, password } = request.body;

    //encrypt the password
    bcrypt.hash(password, 12).then((hash) => {
        //create the user in database
        Users.create({
            username: username,
            email: email,
            birthday: birthday,
            password: hash,
        })

        //return a response
        response.json("User created.");
    })
})

//post route to login
router.post("/login", async (request, response) => {
    //get the username and password from request body
    const { username, password } = request.body;

    //find if user exists in database
    const user = await Users.findOne({ where: { username: username } });

    //if user doesn't exist respond with error
    if (!user) {
        response.json({ error: "User doesn't exist" });
    }
    else {
        //encrypt and compare the password entered to user's actual password
        bcrypt.compare(password, user.password).then(async (match) => {
            //if the passwords dont match respond with error
            if (!match) {
                response.json({ error: "Wrong username and password combination!" });
            }
            else {
                //generate JWT using sign function with secret key, containing username and id
                const accessToken = sign({ username: user.username, id: user.id }, SECRET_KEY);

                //return the JWT back to the client
                response.json({ token: accessToken, username: user.username });
            }
        })
    }
});

//get route to get user information (pass middleware function)
router.get("/", validateToken, (request, response) => {
    //request.user after we validated that there is a user with our middleware
    response.json(request.user);
});

module.exports = router;
