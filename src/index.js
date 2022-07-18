require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

app.use(express.json({ extended: true }));  

app.get('', (req, res) => res.send('SERVER STARTED!!!'));
require('./config/config-passport');
app.use(passport.initialize());
app.use(cors())
app.use('/api', require('./routes'));


async function start() {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => console.log(`PORT is ${PORT}...`));
    } catch (err) {
        console.log(err.stack);
    }
};

start();

module.exports = app;