const express = require('express')
const router = express.Router()
const attendanceControllers = require('../controllers/attendance')

router.get('/', attendanceControllers.list)
// shows every event and attendee.  not very useful

router.get('/events/:eventId', attendanceControllers.eventAttendance)
// takes an eventId and returns all the students who attended the event

router.get('/users/:userId', attendanceControllers.userAttendance)
// takes a userId and returns all the events that user has attended

router.post('/', attendanceControllers.create)
// adds an entry to the table of the eventId and userId of the attendee

router.delete('/', attendanceControllers.remove)
// removes an attendance entry from the table, using both the eventId and userId

module.exports = router

//there will still be attendance records if a user or event is deleted.
//todo: link up some foreign keys with ON DELETE CASCADE in the db.  