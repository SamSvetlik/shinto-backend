const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

app.get("/", (req, res)=> {
    res.json({
        message: "Welcome!"
    })
})

app.listen(PORT, () => console.log(`I am listening on port ${PORT}!`))