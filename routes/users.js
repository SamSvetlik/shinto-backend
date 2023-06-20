const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/users')

router.get('/', usersControllers.list)

router.get('/:name', usersControllers.search)

// router.post()

router.put('/:id', usersControllers.update)

router.delete('/:id', usersControllers.remove)

module.exports = router;