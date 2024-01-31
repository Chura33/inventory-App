const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateMiddleware = async(req, res, next) =>{
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.SECRET); // Replace with your actual secret key
        console.log(decoded);
        // Find the user associated with the token
        const user = await User.findOne({ _id: decoded.userId, 'tokens.token': token});
        if (!user) {
            throw new Error(); // Trigger catch block
          }

          // Attach user information to the request object
        req.user = user;
        req.token = token;
        
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Authentication failed' });
    }
}

module.exports = authenticateMiddleware;