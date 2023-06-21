const pool = require('../sql/connection')

const list = (req, res) => {
    // lists all people in the database
    pool.query("SELECT * FROM users", (err, rows, fields)=> {
        res.json(rows)
    })
}

const search = (req, res) => {
    // searches database for names containing $name
    // inclusive, so searching for "son" would return both Sonny and Person
    const {name} = req.params
    pool.query(`SELECT * FROM users WHERE name LIKE "%${name}%"`, (err, rows, fields) => {
        if (err) {
            res.sendStatus(404)
        }
        else res.json(rows)
    })
}

const admin = (req, res) => {
    console.log("pinging admin")
    pool.query(`SELECT * FROM users WHERE isAdmin = 1`, (err, rows, fields) => {
        if (err) {
            res.sendStatus(404)
        }
        else res.json(rows)
    })
}

const update = (req, res) => {
    // allows user to update any field, using id
    // DO NOT USE FOR TO UPDATE OR RESET PASSWORDS
    const {id} = req.params
    pool.query(`UPDATE users SET ? WHERE id = ?`,
        [req.body, id],
        (err, results, fields) => {
            res.json(results)
    })
}

const remove = (req, res) => {
    // deletes user from database by ID.
    // CANNOT BE UNDONE
    const {id} = req.params
    pool.query(`DELETE FROM users WHERE id = ?`,
        [id],
        (err, results, fields)=> {
            res.json(results)
        })
}

module.exports = {
    list,
    search,
    admin,
    update,
    remove
}