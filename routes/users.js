const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/users')

router.get('/', usersControllers.list)

router.get('/:name', usersControllers.search)

// router.post()
// Shouldn't need a creation route, since it's handled in signup

router.put('/:id', usersControllers.update)

router.delete('/:id', usersControllers.remove)

module.exports = router;