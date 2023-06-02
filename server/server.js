const express = require('express');
const cors = require('cors');
const { userRoutes } = require('./routes/user.routes');
const { noteRoutes } = require('./routes/notes.routes');

const app = express();
const PORT = 9122;

require('./config/mongoose.config');
require('dotenv').config();

const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json(), express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

app.listen(PORT, console.log(`server running on ${PORT}`))