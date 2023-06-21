const pool = require('../sql/connection')

const list = (req, res) => {
    // lists all events in the database
    pool.query("SELECT id, eventName, eventDescription, hostId, DATE_FORMAT(eventTime, '%Y-%m-%d %H:%i:%s') AS formatted_event_time FROM events", (err, rows, fields)=> {
        res.json(rows)
    })
}

const show = (req, res) => {
    // shows a single event in the database by id
    const {id} = req.params
    pool.query(`SELECT id, eventName, eventDescription, hostId, DATE_FORMAT(eventTime, '%Y-%m-%d %H:%i:%s') AS eventTimeString FROM events WHERE id = ${id}`, (err, rows, fields)=> {
        res.json(rows)
    })
}

const create = async (req, res) => {
    const { eventName, eventDescription, hostId, eventTime } = req.body
    const dateObj = new Date(eventTime)
    const formattedTime = dateObj.toISOString().slice(0, 19).replace('T', ' ')
    console.log(formattedTime)
    pool.query('INSERT INTO events (id, eventName, eventDescription, hostId, eventTime) VALUES (?, ?, ?, ?, ?)',
    [null, eventName, eventDescription, hostId, eventTime],
    (err, results, fields) => {
        res.json(results)
    })
}

module.exports = {
    list,
    show,
    create
}