const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
    res.send("This is User Home Page....!!!")
});

const User = require('../model/User')

router.post('/addUser', async (req, res) => {
    const data = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/loginUser', async (req, res) => {
    try{
        const data = await User.find({email: req.body.email, password: req.body.password});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/getAllUser', async (req, res) => {
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router
