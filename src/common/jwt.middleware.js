const jwt = require("jsonwebtoken");

require("dotenv").config()

verifyJWT = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
       const email = decodedToken.email;
      req.auth = {
           email: email
      };
      next();
   } catch(error) {
       res.status(401).send(error.message);
   }
};

module.exports = {
    verifyJWT,
}