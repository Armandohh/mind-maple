const { verify } = require("jsonwebtoken");


//define secret key
const SECRET_KEY = "4F%R)Xrj8!2sP7#z"

//validate token function to validate access token
const validateToken = (request, response, next) => {

    //extract access token from Authorization header from request
    const accessToken = request.header("Authorization");

    //if there is no access token
    if (!accessToken) {
        //then the user is not logged in
        return response.json({ error: "User not logged in!" });
    }

    try {
        //verify access token using provided secret key
        const validToken = verify(accessToken, SECRET_KEY);

        //assign decoded/valid token to request.user
        request.user = validToken;

        //if there was a valid token then  
        if (validToken) {
            //move request to next function
            return next();
        }
    } catch (err) {
        return response.json({ error: err });
    }
}

module.exports = { validateToken, SECRET_KEY };