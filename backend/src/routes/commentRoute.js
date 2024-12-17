const router = require('express').Router()
const helpers = require('../helpers')
const successHandler = require('../handler/successHandler.js')
const errorHandler = require('../handler/errorHandler.js')
const commentService = require('../services/commentService.js')

router.route('/:id')
    // Tìm kiếm comment theo id
    .get(async (req, res) => {
        try {
            const { id } = req.params

            const result = await commentService.getById(id)
            return res.send(successHandler.getObject(result))
        } catch (error) {
            res.send(errorHandler.getObject(error))
        }
    })
    // Xóa comment theo id
    .delete(async (req, res) => {
        try {
            const { id } = req.params
            const result = await commentService.deleteById(id)
            return res.send(successHandler.getObject(result))
        } catch (error) {
            res.send(errorHandler.getObject(error))
        }
    })
    // Cập nhật comment theo id
    .patch(async (req, res) => {
        try {
            const { id } = req.params
            const { content } = req.body
            const result = await commentService.updateById(id, content)
            return res.send(successHandler.getObject(result))
        } catch (error) {
            res.send(errorHandler.getObject(error))
        }
    })

router.route('/')
    // Lấy tất cả comment
    .get(async (req, res) => {
        try {
            const result = await commentService.getAll()
            return res.send(successHandler.getObject(result))
        } catch (error) {
            res.send(errorHandler.getObject(error))
        }
    })
    // Tạo mới comment
    .put(async (req, res) => {
        try {
            const { userId, postId, commentId, content } = req.body

            const result = await commentService.insert(userId, postId, commentId, content)
            return res.send(successHandler.getObject(result))
        } catch (error) {
            res.send(errorHandler.getObject(error))
        }
    })

module.exports = router