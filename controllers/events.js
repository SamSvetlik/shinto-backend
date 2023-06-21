const pool = require('../sql/connection')

const list = (req, res) => {
    // lists all events in the database
    const query = `
        SELECT events.id, events.eventName, events.eventDescription, events.hostId, users.name AS hostName, DATE_FORMAT(events.eventTime, '%Y-%m-%d %H:%i:%s') AS formatted_event_time
        FROM events
        JOIN users ON events.hostId = users.id
    `
    pool.query(
        query, (err, rows, fields)=> {
        res.json(rows)
    })
}

const show = (req, res) => {
    // shows a single event in the database by id
    const {id} = req.params
    const query = `
    SELECT events.id, events.eventName, events.eventDescription, events.hostId, users.name AS hostName, DATE_FORMAT(events.eventTime, '%Y-%m-%d %H:%i:%s') AS formatted_event_time
    FROM events
    JOIN users ON events.hostId = users.id
    WHERE events.id = ${id}
`
    pool.query(query, (err, rows, fields)=> {
        res.json(rows)
    })
}

const create = async (req, res) => {
    const { eventName, eventDescription, hostId, eventTime } = req.body
    pool.query('INSERT INTO events (id, eventName, eventDescription, hostId, eventTime) VALUES (?, ?, ?, ?, ?)',
    [null, eventName, eventDescription, hostId, eventTime],
    (err, results, fields) => {
        res.json(results)
    })
}

const update = (req, res) => {
    // allows user to update any field, using event id
    const {id} = req.params
    pool.query(`UPDATE events SET ? WHERE id = ?`,
        [req.body, id],
        (err, results, fields) => {
            res.json(results)
    })
}

const remove = (req, res) => {
    // deletes event from database by ID.
    // CANNOT BE UNDONE
    const {id} = req.params
    pool.query(`DELETE FROM events WHERE id = ?`,
        [id],
        (err, results, fields)=> {
            res.json(results)
        })
}

module.exports = {
    list,
    show,
    create,
    update,
    remove
}