const db = require("../db");

async function getAllUsers() {
  const query = `select * from tbl_user;`;
  const { rows, fields } = await db.Query(query);
  return rows;
}

async function getUserByUsername(username) {
  const query = `select * from tbl_user where username='${username}';`;
  const { rows, fields } = await db.Query(query);

  if (rows.length == 0) {
    return null;
  }

  return rows[0];
}

async function getUserByEmail(email) {
  const query = `select * from tbl_user where email='${email}';`;
  const { rows, fields } = await db.Query(query);

  if (rows.length == 0) {
    return null;
  }

  return rows[0];
}

async function insert(email, username, password) {
  const query = `insert into tbl_user (email, username, password)  values ('${email}', '${username}', '${password}');`;
  const { rows, fields } = await db.Query(query);
  return {
    insertId: rows.insertId,
    affectedRows: rows.affectedRows,
  };
}

async function deleteUserById(id) {
  const query = `delete from tbl_user where id = '${id}';`;
  const { rows, fields } = await db.Query(query);
  return {
    affectedRows: rows.affectedRows,
  };
}

async function deleteUserByUsername(username) {
  const query = `delete from tbl_user where username = '${username}';`;
  const { rows, fields } = await db.Query(query);
  return {
    affectedRows: rows.affectedRows,
  };
}

async function updateUserByEmail(email, params) {
  let str = "";
  Object.keys(params).forEach((key) => (str += `${key}='${params[key]}',`));
  str = str.slice(0, str.length - 1);

  const query = `update tbl_user set ${str} where email='${email}';`;
  const { rows, fields } = await db.Query(query);

  return {
    affectedRows: rows.affectedRows,
  };
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  insert,
  deleteUserById,
  deleteUserByUsername,
  updateUserByEmail,
  getUserByEmail,
};
