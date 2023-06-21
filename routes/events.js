const express = require('express')
const router = express.Router()
const eventsControllers = require('../controllers/events')

router.get("/", eventsControllers.list)
router.get("/:id", eventsControllers.show)
router.post("/", eventsControllers.create)
router.put("/:id", eventsControllers.update)
router.delete("/:id", eventsControllers.remove)

module.exports = router