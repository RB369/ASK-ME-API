require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.use(cors({
    origin:"*"
}))


app.get('/', function (req, res) {
    res.send("This is Home Page....!!!")
});

const user_controller = require('./controller/UserController')
app.use('/user', user_controller)

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})