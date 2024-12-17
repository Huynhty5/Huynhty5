const db = require("../db");

/**
 * chuyển đổi list [1, 2, 3, 4] thành chuỗi '(1, 2, 3, 4)'
 * @param {Array} list
 * @returns
 */
function convertListToString(list) {
  return `(${list.join(", ")})`;
}

/**
 * chuyển đổi id=1 và mảng list=[2, 9, 10] thành chuỗi '(1,2), (1, 9), (1, 10)'
 * @param {Number} id
 * @param {Array} list
 * @returns
 */
function convertListToPair(id, list) {
  return list.map((item) => `(${id}, ${item})`).join(", ");
}

async function getAllCategories() {
  const query = `SELECT * FROM tbl_category;`;
  const { rows, fields } = await db.Query(query);
  return rows;
}

async function getById(id) {
  const query = `SELECT * FROM tbl_category WHERE id = '${id}';`;
  const { rows, fields } = await db.Query(query);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}

async function getAllByCategoryTitle(searchValue, sortStr) {
  const query = `SELECT * FROM tbl_category WHERE title LIKE '%${searchValue}%' ${sortStr};`;
  const { rows, fields } = await db.Query(query);
  return rows;
}

async function getByPostId(postId) {
  const query = `SELECT pc.post_id, c.* FROM tbl_post_category pc INNER JOIN tbl_category c ON pc.category_id = c.id WHERE pc.post_id = '${postId}';`;
  const { rows, fields } = await db.Query(query);
  return rows;
}

// Thêm mới danh mục
async function createCategory(title, description) {
  const query = `INSERT INTO tbl_category (title, description) VALUES ('${title}', '${description}');`;
  console.log(query);

  const { rows, fields } = await db.Query(query);
  return rows;
}

// Sửa danh mục
async function updateCategory(id, title, description) {
  const query = `UPDATE tbl_category SET title = '${title}', description = '${description}' WHERE id = '${id}';`;
  console.log(query);

  const { rows, fields } = await db.Query(query);
  return rows;
}

// Xóa danh mục
async function deleteCategory(id) {
  const query = `DELETE FROM tbl_category WHERE id = '${id}';`;
  console.log(query);

  const { rows, fields } = await db.Query(query);
  return rows;
}

// Xóa các danh mục liên kết với bài viết
async function updateCategories_delete(postId, toDelList) {
  const delString = convertListToString(toDelList);
  const query = `DELETE FROM tbl_post_category WHERE post_id = '${postId}' AND category_id IN ${delString};`;
  console.log(query);

  const { rows, fields } = await db.Query(query);
  return rows;
}

// Thêm các danh mục liên kết với bài viết
async function updateCategories_insert(postId, toAddList) {
  const addString = convertListToPair(postId, toAddList);
  const query = `INSERT INTO tbl_post_category (post_id, category_id) VALUES ${addString} ON DUPLICATE KEY UPDATE post_id = VALUES(post_id), category_id = VALUES(category_id);`;
  console.log(query);

  const { rows, fields } = await db.Query(query);
  return rows;
}

module.exports = {
  getAllCategories,
  getById,
  getAllByCategoryTitle,
  getByPostId,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategories_delete,
  updateCategories_insert,
};
