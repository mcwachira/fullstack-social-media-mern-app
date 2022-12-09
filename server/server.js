const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const { fileUrlToPath } = require('url')

const connectDb = require('./db/db')
require('dotenv').config()



//initialize express app
const app = express()

//create our port 
const PORT = process.env.PORT || 8001

//connect our database
connectDb()

// for parsing application/json
app.use(express.json({ limit: "30mb", extended: true }))
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "30mb", extended: true }))

//enabling helmet
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

//enabling cors
app.use(cors())

//enables us to se logs in our terminal
app.use(morgan('tiny')) //used to log request from the frontend
//get cookies
//app.use(cookieParser())

/*enabling express to locate static files
app.use(express.static('public')) */

//enabling express to locate static files using virtual path /
app.use('/assets', express.static(path.join(__dirname, '/public/assets')))

// file storage
//there  is a better way == refactor
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, res, cb) {
        cb(null, file.originalName)
    }
})
const upload = multer({ storage })



//getting our routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const { hasAuthorization } = require('./middleware/auth')


//routes with files

// app.post('/api',upload.single('picture'. register))
// app.post('/api', hasAuthorization, upload.single('picture'), createPost)


app.use('/api', authRoute)
app.use('/api', userRoute)
app.use(PORT, (req, res) => {
    console.log(`app running on port ${PORT}`)
})