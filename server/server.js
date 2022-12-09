const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
require('dotenv').config()


const app = express()





const PORT = 8001 || process.env.PORT;

app.use(PORT, (req, res) => {
    console.log(`app running on port ${PORT}`)
})