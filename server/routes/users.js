const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require('../models');
const { sign } = require("jsonwebtoken");

router.post("/", async (request, response) => {
    const {username, password} = request.body;

    bcrypt.hash(password, 12).then((hash) => {
        Users.create ({
            username: username,
            password: hash,
        })

        response.json("User created.");
    })
})

module.exports = router;
