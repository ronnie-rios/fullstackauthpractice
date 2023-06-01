const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { userRoutes } = require('./routes/user.routes');

const app = express();

const PORT = 5555;

require('./config/mongoose.config');
require('dotenv').config();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json(), express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes)

app.listen(() => console.log(`server running on ${PORT}`))
