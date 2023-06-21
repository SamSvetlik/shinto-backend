const express = require('express')
const router = express.Router()
const eventsControllers = require('../controllers/events')

router.get("/", eventsControllers.list)
router.get("/:id", eventsControllers.show)
router.post("/", eventsControllers.create)
// router.put()
// router.delete()

module.exports = router