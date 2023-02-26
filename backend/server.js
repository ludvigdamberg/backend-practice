const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
console.log("Server started")
})

app.get('/get', async (req,res) => {
    const users = dataModel.find()
    res.send(users)
    console.log(users)
})

app.post('/post', async(req,res) => {
    const data = req.res
    const newData = new dataModel(data)
    await newData.save()
    res.json(data)
    console.log(data)
})