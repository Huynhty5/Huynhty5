const db = require('../db')

async function getByUserId(userId) {
    const query = `select * from tbl_like where user_id=${userId};`
    const { rows, fields } = await db.Query(query)
    return rows
}

async function getByPostId(postId) {
    const query = `select * from tbl_like where post_id=${postId};`
    const { rows, fields } = await db.Query(query)
    return rows
}

async function getByUserIdAndPostId(userId, postId) {
    const query = `select * from tbl_like where user_id=${userId} and post_id=${postId};`
    const { rows, fields } = await db.Query(query)
    return rows
}

async function insert(userId, postId) {
    const query = `insert into tbl_like (user_id, post_id) values (${userId}, ${postId});`
    const { rows, fields } = await db.Query(query)
    return rows
}

async function deleteByUserIdAndPostId(userId, postId) {
    const query = `delete from tbl_like where user_id=${userId} and post_id=${postId};`
    const { rows, fields } = await db.Query(query)
    return rows
}


module.exports = {
    getByUserId,
    getByPostId,
    getByUserIdAndPostId,
    insert,
    deleteByUserIdAndPostId
}