const jwt = require('jsonwebtoken');

exports.blacklistedTokens = new Set();

exports.checkToken = ()=>{

    return (req, res, next)=>{
        try {
            const bToken = req.headers.authorization
        
            if(!bToken){
                res.status(403).json({success:false,message:'you are not authorized'})
            }
            const token = bToken.slice(7)
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
            // Add email from decoded token to req.body
            req.body.userId = decoded.userId;

            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({message:'you are not authorized lll'})
        }
    }
}