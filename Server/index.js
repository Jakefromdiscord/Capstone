require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {createMtn, createRes, getMtn, getRes, pushMount, pushRes, getWants, moveWants, getHave} = require('./controll')
const {SERVER_PORT} = process.env
const {seed} = require('./seed')

const app = express()

app.use(cors())
app.use(express.json())

//Database
app.post('/seed', seed)

// mountain endpoints: get, post(add), updateMtn, delete
app.get('/api/mountain', getMtn)
app.post('/api/create', createMtn)
app.get("/api/pushM", pushMount)
app.get('/api/want', getWants)
app.put('/api/want/:id/:name', moveWants)
app.get('/api/have', getHave)
// app.put('/api/mountain', updateMtn)

app.get('/api/gr', getRes)
app.post('/api/rcreate', createRes)
app.get('/api/pushR', pushRes)

const port = process.env.PORT || SERVER_PORT
app.listen(port, () => console.log(`Server up on ${SERVER_PORT}`))