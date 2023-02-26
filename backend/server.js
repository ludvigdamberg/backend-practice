const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const userModel = require('./models/userSchema')

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
console.log("Server started")
})

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("Connected to MongoDB")
})

app.get('/users', async (req,res) => {

    const users = await userModel.find()
    res.send(users)

})

app.post('/save', async (req,res) => {

    const user = req.body

    const newUser = new userModel(user)

    await newUser.save()

    res.json(user)

    console.log(user)
})

app.post('/delete', async (req,res) => {
    const {_id} = req.body
    userModel.findByIdAndDelete(_id)
    .then(() => res.send("deleted successfully"))
    .catch((err) => console.log(err))

})
app.post('/updateAge', async (req,res) => {
    const {_id,age} = req.body
    await  userModel.findByIdAndUpdate(_id,{age})
    .then(()=> {
        console.log("Age updated successfully");
    })
    
})