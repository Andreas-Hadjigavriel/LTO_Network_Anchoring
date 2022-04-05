const express       = require('express')
const mongoose      = require('mongoose')
const path          = require('path')  
const bodyParser    = require('body-parser')  
const app           = express()

mongoose.connect('mongodb://localhost/anchorFiles')
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err) )

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

require('./routes/anchor')(app)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})