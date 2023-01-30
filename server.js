import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import qiwi_route from './routes/qiwi.js'

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    methods: ["GET", "DELETE", "POST", "PATCH", "PUT"]
}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use('/qiwi', qiwi_route)

app.listen(port, () => console.log('Listening on port ' + port))