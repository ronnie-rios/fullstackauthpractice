const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 9122;

require('../config/mongoose.config');
require('dotenv').config();

app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

app.listen(PORT, console.log(`server running on ${PORT}`))