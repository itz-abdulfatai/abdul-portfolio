import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import settingsRoute from './routes/settings.route.js'

const app = express()

dotenv.config()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))




// Routes
app.use('/settings', settingsRoute )




// api home / test
app.get('/', (req, res) => {
    res.json({ message: 'working!' })
})



const port = process.env.PORT || 2020
app.listen(port, ()=> {
    console.log('app listening at port ' + port)
})