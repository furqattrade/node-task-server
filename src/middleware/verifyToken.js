const jwt = require('jsonwebtoken');
const path=require('path')
const fs=require('fs')

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");

const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

 const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    jwt.verify(token, PUB_KEY,{
      algorithm: ["RS256"],
      expiresIn: "3d",
    } ,(err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.userId = decoded.sub;
      next();
    });
  };
  
module.exports = verifyToken
  