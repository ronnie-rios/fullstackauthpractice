const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = 9876;

require('./config/mongoose.config');
app.use(cors());
app.use(cookieParser());
app.use(express.json(), express.urlencoded({ extended: true }));



app.listen(() => console.log(`server running on ${PORT}`))
