import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path, {dirname} from 'path'
import settingsRoute from './routes/settings.route.js'
import {fileURLToPath} from 'url'
const app = express()
dotenv.config()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

// static files
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(express.static(path.join(__dirname, '../public')))






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