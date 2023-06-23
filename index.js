const express = require('express')
require('dotenv').config()
const app = express()
const pool = require('./sql/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const signinRoutes = require("./routes/signin")
const signupRoutes = require("./routes/signup")
const usersRoutes = require("./routes/users")
const eventsRoutes = require("./routes/events")
const attendanceRoutes = require("./routes/attendance")

const PORT = process.env.PORT || 5000
const { JWT_PHRASE } = process.env

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) return res.sendStatus(401)
    jwt.verify(token, JWT_PHRASE, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.use(express.json());
app.use(cors())
// cors is defaultly configured to allow requests from all origins.
// before shipping, extra work will need to be done to only allow methods
// from approved sources, ie the site hosting the front end
app.use('/signup', signupRoutes)
app.use('/users',authenticateToken, usersRoutes)
app.use('/events', eventsRoutes)
app.use('/attendance', attendanceRoutes)
app.use('/signin', signinRoutes)

app.get("/", (req, res)=> {
    res.json({
        message: "Welcome!"
    })
})


app.get("/admin", (req, res) => {
    pool.query("SELECT * FROM users WHERE isAdmin = 1", (err, rows, fields) => {
        res.json(rows)
    })
})

app.listen(PORT, () => console.log(`I am listening on port ${PORT}!`))