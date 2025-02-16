import jwt from 'jsonwebtoken'

export async function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({message: 'unauthorized'})
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        if (!decoded) {
            return res.status(401).send({message: 'unauthorized'})
        }

        // console.log(decoded)
    
        req.user = decoded; // not needed for now but can be used in the future
        next();
    } catch (error) {

        if (error.message.includes('Please check your connection')) return res.status(500).send('connection error, kindly retry')

            if (error.message.includes('jwt expired')) return res.status(401).send({message:'token expired'})

        res.status(500).send({message: `an error occured: ${error.message}`})
        
    }

}
