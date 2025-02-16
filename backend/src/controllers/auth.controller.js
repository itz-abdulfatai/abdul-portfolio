import db from "../utils/config/prisma.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function loginCOntroller(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        // console.log('user sent invalid request data')
        return res.status(400).send({message: 'invalid request data'})
    }

    try {
        const user = await db.user.findUnique({
            where: {
                name: username,
                softDelete: false
                
            }
        })

        if (!user) {
            return res.status(404).send({message: 'user not found'})
        }

        // compare password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) return res.status(401).send({message: 'password is incorrect'})

        // generate token
        const token = jwt.sign({username:user.name, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})


        return res.status(200).send({message: 'login successful', token})


        
    } catch (error) {
        console.log( error.message)
        console.error(error.stack)
        return res.status(500).send({message: 'internal server error'})
        
    }

    

}