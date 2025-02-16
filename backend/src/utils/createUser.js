import db from "./config/prisma.js";
import bcrypt from 'bcryptjs'

async function seedUser() {
    const user = {
        name: 'itz_abdulfatai',
        email: 'abdulfataialiyu4@gmail.com',
        password: await bcrypt.hash(process.env.SECRET_KEY, 10),
        role: 'ADMIN',


    }

    const newUser = await db.user.create({
        data: user
    })
}

// const pass = await bcrypt.hash(process.env.SECRET_KEY, 10)
// console.log(pass)

seedUser().then(()=> console.log('user created')).catch((error) => console.log(error))