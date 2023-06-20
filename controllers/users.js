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

const update = (req, res) => {
    const {id} = req.params
    pool.query(`UPDATE users SET ? WHERE id = ?`,
        [req.body, id],
        (err, results, fields) => {
            res.json(results)
    })
}

const remove = (req, res) => {
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
    update,
    remove
}