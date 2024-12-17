const router = require('express').Router()
const errorHandler = require('../handler/errorHandler.js')
const successHandler = require('../handler/successHandler.js')
const likeService = require('../services/likeService.js')

// Tìm kiếm like theo userId và postId
router.get('/user/:userId/post/:postId', async (req, res) => {
    try {
        const { userId, postId } = req.params
        const result = await likeService.getByUserIdAndPostId(userId, postId)
        res.send(successHandler.getObject(result))
    } catch (e) {
        res.send(errorHandler.getObject(e))
    }
})

// Tìm kiếm like theo userId
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const result = await likeService.getByUserId(userId)
        res.send(successHandler.getObject(result))
    } catch (e) {
        res.send(errorHandler.getObject(e))
    }
})

// Tìm kiếm like theo postId
router.get('/post/:postId', async (req, res) => {
    try {
        const { postId } = req.params
        const result = await likeService.getByPostId(postId)
        res.send(successHandler.getObject(result))
    } catch (e) {
        res.send(errorHandler.getObject(e))
    }
})

// Thêm like theo user_id và post_id
router.put('/', async (req, res) => {
    try {
        const { userId, postId } = req.body
        const result = await likeService.insert(userId, postId)
        res.send(successHandler.getObject({
            affectedRows: result.affectedRows,
            insertId: result.insertId
        }))
    } catch (e) {
        res.send(errorHandler.getObject(e))
    }
})

// Xóa like theo user_id và post_id
router.delete('/', async (req, res) => {
    try {
        const { userId, postId } = req.body
        const result = await likeService.deleteByUserIdAndPostId(userId, postId)
        res.send(successHandler.getObject({
            affectedRows: result.affectedRows,
            insertId: result.insertId
        }))
    } catch (e) {
        res.send(errorHandler.getObject(e))
    }
})

module.exports = router