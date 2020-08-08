import path, { dirname } from 'path'
import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { MONGO_URI } from './config.js'
import { fileURLToPath } from 'url'
import urlRoutes from './routes/url.js'
import indexRoutes from './routes/index.js'
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(helmet())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(compression())




app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(express.static('public'))
app.use('/api/url', urlRoutes)
app.use('/', indexRoutes)


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URI || MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT)
    console.log('Server running on ' + PORT)
})