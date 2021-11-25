const express = require('express');
const app = express();

const connectDB = require('./config/db');
const cors = require('cors');

app.use(cors());

// initiating port
const PORT = process.env.PORT || 5000;

// json formate
app.use(express.json());

//connecting database
connectDB((err, res)=> {
    console.log('Database connected');
});

// initiate backend server
app.get('/', (req, res) => {
    res.send('Hello Backend');
})

// API routes
app.use('/api/signin', require('./routes/api/signIn'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/pics', require('./routes/api/pics'));
app.use('/api/profile', require('./routes/api/profile'));

// launching server
app.listen(PORT);
