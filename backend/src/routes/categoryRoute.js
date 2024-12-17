const router = require("express").Router();
const helpers = require("../helpers");
const successHandler = require("../handler/successHandler.js");
const errorHandler = require("../handler/errorHandler.js");
const categoryService = require("../services/categoryService.js");

// Tìm kiếm các category theo title
router.get("/title/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const { sort } = req.query;

    const searchValue = helpers.transformStringForSearch(title);
    const sortStr = helpers.getSortString("title", sort);

    const result = await categoryService.getAllByCategoryTitle(
      searchValue,
      sortStr
    );

    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

// Tìm kiếm các category theo post_id
router.get("/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await categoryService.getByPostId(postId);
    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

// Cập nhật danh sách thể loại của post
router.patch("/categories", (req, res) => {
  const { postId, categoryList } = req.body;

  categoryService
    .getByPostId(postId)
    .then((data) => {
      const newCategoryIds = categoryList;
      const oldCategoryIds = data.map((category) => category.id);

      const toAddList = newCategoryIds.filter(
        (id) => !oldCategoryIds.includes(id)
      );
      const toDeleteList = oldCategoryIds.filter(
        (id) => !newCategoryIds.includes(id)
      );

      return { toAddList, toDeleteList };
    })
    .then(({ toAddList, toDeleteList }) => {
      let promiseList = [];

      if (toAddList.length !== 0) {
        const addPromise = categoryService.updateCategories_insert(
          postId,
          toAddList
        );
        promiseList.push(addPromise);
      }

      if (toDeleteList.length !== 0) {
        const delPromise = categoryService.updateCategories_delete(
          postId,
          toDeleteList
        );
        promiseList.push(delPromise);
      }

      if (promiseList.length === 0) {
        return null;
      }

      return Promise.all(promiseList);
    })
    .then((data) => {
      if (data === null) {
        res.send(successHandler.getObject(null));
        return;
      }
      res.send(successHandler.getObject(data));
    })
    .catch((error) => res.send(errorHandler.getObject(error)));
});

// Tìm kiếm category theo id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categoryService.getById(id);
    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

// Liệt kê tất cả category
router.get("/", async (req, res) => {
  try {
    const result = await categoryService.getAllCategories();
    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

// Thêm mới danh mục
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      throw new Error("Title và Description không được để trống");
    }

    const result = await categoryService.createCategory(title, description);
    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

// Sửa danh mục
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      throw new Error("Title và Description không được để trống");
    }

    const result = await categoryService.updateCategory(id, title, description);
    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

// Xóa danh mục
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await categoryService.deleteCategory(id);
    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

module.exports = router;
