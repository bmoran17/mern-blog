const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

require('dotenv').config();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// parses JSON payloads
app.use(express.json());
app.use(cookieParser());

// allows access to photos
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.mongo);

app.get('/', (req,res) => res.json({__dirname}))

// import routes
require('./routes/users')(app);
require('./routes/posts')(app);

app.listen(4000);