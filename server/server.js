const express = require('express');
const cors = require('cors');
const { userRoutes } = require('./routes/user.routes');

const app = express();
const PORT = 9122;

require('./config/mongoose.config');
require('dotenv').config();

const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json(), express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes)

app.listen(PORT, console.log(`server running on ${PORT}`))