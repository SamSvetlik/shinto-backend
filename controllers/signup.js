const pool = require('../sql/connection')
const bcrypt = require('bcrypt')

const create = async (req, res) => {
    console.log(req)
    const { name, email, password, emergencyContact, emergencyNumber, birthday, profilePic } = req.body
    const today = new Date().toISOString().slice(0, 10)
    const hashedPassword = await bcrypt.hash(password, 10)
    pool.query('INSERT INTO users (id, name, email, password, isAdmin, memberSince, renewalDate, emergencyContact, emergencyNumber, birthday, notes, beltRank, beltProgress, profilePic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [null, name, email, hashedPassword, 0, today, today, emergencyContact, emergencyNumber, birthday, null, "White", 0, profilePic],
    (err, results, fields) => {
        res.json(results)
    })
}

module.exports = {create}