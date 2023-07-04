const jwt = require('jsonwebtoken');
const Secret = 'A_SecretPassword_ForSignature';

const fetchUser = (req,res,next)=>{
    
    const token = req.header('auth-token');
    if(!token)[res.status(401).send("Please re=continue with a valid token")]

    try {

        const data = jwt.verify(token,Secret);
        req.user = data.user;
        next();
                
    } catch (error) {
      res.status(401).send('Please re-continue with a valid token');    
    }
}

module.exports = fetchUser;
