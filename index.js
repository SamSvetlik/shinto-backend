const express = require('express')
const app = express()
const pool = require('./sql/connection')
const signinRoutes = require("./routes/signin")
const signupRoutes = require("./routes/signup")
const usersRoutes = require("./routes/users")
const eventsRoutes = require("./routes/events")

const PORT = process.env.PORT || 5000

app.use(express.json());

app.use('/signup', signupRoutes)
app.use('/users', usersRoutes)
app.use('/events', eventsRoutes)

app.get("/", (req, res)=> {
    res.json({
        message: "Welcome!"
    })
})

app.get("/users", (req, res) => {
    pool.query("SELECT * FROM users", (err, rows, fields) => {
        res.json(rows)
    })
})

app.listen(PORT, () => console.log(`I am listening on port ${PORT}!`))