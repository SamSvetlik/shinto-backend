const pool = require('../sql/connection')

const list = (req, res) => {
    pool.query('SELECT * FROM attendance', (err, rows, fields) => {
        res.json(rows)
    })
}

const eventAttendance = (req, res) => {
    const {eventId} = req.params;
  
    const query = `
      SELECT users.name
      FROM attendance
      JOIN users ON attendance.userId = users.id
      WHERE attendance.eventId = ?;
    `;
  
    pool.query(query, [eventId], (error, results) => {
      if (error) {
        console.error(error);
      } else {
        res.json(results);
      }
    });
  }

const userAttendance = (req, res) => {
    const userId = req.params.userId;
  
    const query = `
      SELECT events.id, events.eventName, events.eventDescription, events.eventTime, users.name AS hostName
      FROM attendance
      JOIN events ON attendance.eventId = events.id
      JOIN users ON events.hostId = users.id
      WHERE attendance.userId = ?;
    `;
  
    pool.query(query, [userId], (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error appropriately
      } else {
        res.json(results);
        // Respond with the retrieved data
      }
    });
  };

const create = async (req, res) => {
    const { eventId, userId } = req.body
    pool.query('INSERT INTO attendance (eventId, userId) VALUES (?, ?)', [eventId, userId], (err, rows, fields) => {
        res.json(rows)
    })
}

const remove = (req, res) => {
    const { eventId, userId} = req.body
    pool.query('DELETE FROM attendance WHERE eventId = ? AND userId = ?', [eventId, userId], (err, rows, fields) => {
        res.json({"message": "Deleted!"})
    })
}

module.exports = {
    list,
    eventAttendance,
    userAttendance,
    create, 
    remove
}