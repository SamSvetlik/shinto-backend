const pool = require('../sql/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { JWT_PHRASE } = process.env

const generateToken = (user) => {
    return jwt.sign(user, JWT_PHRASE)
}

const signin = (req, res) => {
    const { email, password } = req.body

    pool.query('SELECT * FROM users WHERE email = ?', [email], async(err, results, fields) => {
        if (err) {
            console.error(err)
        }

        const match = await bcrypt.compare(password, results[0].password)

        if (match) {
            const token = generateToken(results[0])
            res.json({
                token,
                user: req.user
            })
        } else {
            res.sendStatus(403)
        }
    })
}

module.exports = {
    signin
}