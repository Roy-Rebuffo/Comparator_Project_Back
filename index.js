const express = require ('express');
const dotenv = require('dotenv');
dotenv.config();

const {connect} = require('./src/utils/db')
const PORT = process.env.PORT;

const app = express();
connect();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(PORT, () => console.log(`escuchando en el puerto: http://localhost:${PORT}`))