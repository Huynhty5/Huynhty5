const db = require("../db");

async function getAdminByUsername(username) {
  const query = `select * from tbl_admin where username='${username}';`;
  const { rows, fields } = await db.Query(query);

  if (rows.length == 0) {
    return null;
  }

  return rows[0];
}

async function getAdminByEmail(email) {
  const query = `select * from tbl_admin where email='${email}';`;
  const { rows, fields } = await db.Query(query);

  if (rows.length == 0) {
    return null;
  }

  return rows[0];
}

async function updateAdminByEmail(email, params) {
  // Loại trừ avatar khỏi params
  const { avatar, ...filteredParams } = params;

  // Xây dựng chuỗi câu lệnh SQL từ các thuộc tính còn lại
  let str = "";
  Object.keys(filteredParams).forEach(
    (key) => (str += `${key}='${filteredParams[key]}',`)
  );

  // Loại bỏ dấu ',' cuối cùng
  str = str.slice(0, str.length - 1);

  const query = `UPDATE tbl_admin SET ${str} WHERE email='${email}';`;

  // Thực hiện truy vấn
  const { rows, fields } = await db.Query(query);

  // Trả về số lượng dòng bị ảnh hưởng
  return {
    affectedRows: rows.affectedRows,
  };
}

module.exports = {
  getAdminByUsername,
  getAdminByEmail,
  updateAdminByEmail,
};
