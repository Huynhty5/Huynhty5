const router = require('express').Router()

router.use('/user', require('./userRoute.js'))
router.use('/admin', require('./adminRoute.js'))
router.use('/post', require('./postRoute.js'))
router.use('/category', require('./categoryRoute.js'))
router.use('/comment', require('./commentRoute.js'))
router.use('/like', require('./likeRoute.js'))

module.exports = router