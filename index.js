const express = require('express')
const app = express()
const pool = require('./sql/connection')

const PORT = process.env.PORT || 5000

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