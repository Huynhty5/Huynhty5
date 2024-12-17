const db = require("../db")


async function getAll() {
    const query = `select * from tbl_comment;`
    const { rows, fields } = await db.Query(query)
    return rows
}

async function getById(id) {
    const query = `select * from tbl_comment where id = '${id}';`
    const { rows, fields } = await db.Query(query)

    if (rows.length == 0) {
        return null
    }

    return rows[0]
}

async function getByPostId(postId)
{
    const query = `select * from tbl_comment where post_id = ${postId};`
    const { rows, fields } = await db.Query(query)
    return rows
}

async function insert(userId, postId, commentId, content) {
    let query;
    if (commentId == null) 
    {
        query = `INSERT INTO tbl_comment (user_id, post_id, content) VALUES ('${userId}', '${postId}', '${content}');`
    }
    else
    {
        query = `INSERT INTO tbl_comment (user_id, post_id, comment_id, content) VALUES ('${userId}', '${postId}', '${commentId}', '${content}');`
    }
    const { rows, fields } = await db.Query(query)
    return {
        insertId: rows.insertId,
        affectedRows: rows.affectedRows
    }
}

async function deleteById(id) {
    const query = `delete from tbl_comment where id='${id}';`
    const { rows, fields } = await db.Query(query)
    return {
        insertId: rows.insertId,
        affectedRows: rows.affectedRows
    }
}

async function updateById(id, content) {
    const query = `update tbl_comment set content = '${content}' where id = ${id};`
    const { rows, fields } = await db.Query(query)
    return {
        affectedRows: rows.affectedRows
    }
}

module.exports = {
    getById,
    getAll,
    insert,
    deleteById,
    getByPostId,
    updateById
}