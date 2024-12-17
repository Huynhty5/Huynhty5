const db = require("../db");

async function insert(userId, title, content, hashImg) {
  const query = `insert into tbl_post (user_id, title, content, hash_img)  values ('${userId}', '${title}', '${content}', '${hashImg}');`;
  const { rows, fields } = await db.Query(query);
  return {
    insertId: rows.insertId,
    affectedRows: rows.affectedRows,
  };
}

async function getByTitle(searchValue, sortStr) {
  const query = `select * from tbl_post where title like '${searchValue}' ${sortStr}`;
  const { rows, fields } = await db.Query(query);
  return rows;
}

async function getById(id) {
  const query = `select * from tbl_post where id = '${id}'`;
  const { rows, fields } = await db.Query(query);

  if (rows.length == 0) {
    return null;
  }

  return rows[0];
}

async function deleteUserById(id) {
  const query = `delete from tbl_post where id = '${id}';`;
  const { rows, fields } = await db.Query(query);
  return {
    affectedRows: rows.affectedRows,
  };
}

async function updatePostById(id, params) {
  let str = "";
  Object.keys(params).forEach((key) => (str += `${key}='${params[key]}',`));
  str = str.slice(0, str.length - 1);

  const query = `update tbl_post set ${str} where id='${id}';`;
  const { rows, fields } = await db.Query(query);

  return {
    affectedRows: rows.affectedRows,
  };
}

async function getByCreateAt(timeStart, timeEnd, sortStr) {
  const query = `select * from tbl_post where create_at between '${timeStart}' and '${timeEnd}' ${sortStr};`;
  const { rows, fields } = await db.Query(query);
  return rows;
}

async function getByDisplayName(displayName) {
  const query = `select u.display_name, p.* from tbl_user u
        inner join tbl_post p on u.id = p.user_id
        where u.display_name = '${displayName}';`;
  const { rows, fields } = await db.Query(query);
  return rows;
}

async function getByCategoryTitle(title) {
  const query = `select c.title category_title, p.* from tbl_post p
        inner join tbl_post_category pc on p.id = pc.post_id
        inner join tbl_category c on pc.category_id = c.id
        where c.title = '${title}';`;
  const { rows, fields } = await db.Query(query);
  return rows;
}

async function getByUserId(userId) {
  const query = `select * from tbl_post where user_id=${userId};`;
  const { rows, fields } = await db.Query(query);
  return rows;
}

async function getAll() {
  const query = `select * from tbl_post;`;
  const { rows, fields } = await db.Query(query);
  return rows;
}

module.exports = {
  insert,
  getByTitle,
  getById,
  deleteUserById,
  updatePostById,
  getByCreateAt,
  getByDisplayName,
  getByCategoryTitle,
  getAll,
  getByUserId,
};
