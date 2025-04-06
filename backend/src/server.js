import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path, {dirname} from 'path'
import settingsRoute from './routes/settings.route.js'
import authRoute from './routes/auth.route.js'
import ticketsRoute from './routes/tickets.route.js'

import {fileURLToPath} from 'url'
const app = express()
dotenv.config()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

app.use(require('prerender-node').set('prerenderToken', 'gbzcvPHS0tl5CZabKNeZ'));

// static files
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../../frontend/dist')));


// api home / test
app.get('/api/testingtesting', (req, res) => {
    res.json({ message: 'working!' })
})



// Routes
app.use('/api/settings', settingsRoute )
app.use('/api/auth', authRoute)
app.use('/api/tickets', ticketsRoute)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  });







const port = process.env.PORT || 4040
app.listen(port, ()=> {
    console.log('app listening at port ' + port)
})