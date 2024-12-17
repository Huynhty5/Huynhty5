const router = require("express").Router();
const helpers = require("../helpers");
const successHandler = require("../handler/successHandler.js");
const errorHandler = require("../handler/errorHandler.js");
const postService = require("../services/postService.js");
const userService = require("../services/userService.js");
const categoryService = require("../services/categoryService.js");
const commentService = require("../services/commentService.js");
const likeService = require("../services/likeService.js");

// Tìm kiếm tất cả các post của user theo user_id
router.get("/search/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // lấy tất cả các post
    const posts = await postService.getByUserId(userId);

    // lấy tất cả user
    const users = (await userService.getAllUsers()).map((user) => {
      user["password"] = null;
      return user;
    });
    const userDict = {};
    users.forEach((user) => (userDict[user.id] = user));

    // lấy tất cả category
    const categories = await categoryService.getAllCategories();
    const categoryDict = {};
    categories.forEach((category) => (categoryDict[category.id] = category));

    // thêm comments, likes, categories vào post
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      post.author = userDict[post.user_id];
      post.comments = await commentService.getByPostId(post.id);
      post.comments.forEach((cmt) => {
        cmt.user = userDict[cmt.user_id];
      });

      post.likes = await likeService.getByPostId(post.id);
      post.likes.forEach((like) => (like.user = userDict[like.user_id]));

      post.categories = await categoryService.getByPostId(post.id);
    }

    res.send(
      successHandler.getObject({
        post: posts,
      })
    );
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

// Tìm kiếm các post theo `title`
router.get("/search/title", async (req, res) => {
  try {
    const { value, sort } = req.query;

    if (value === undefined) {
      res.send(successHandler.getObject(null));
      return;
    }

    const searchValue = helpers.transformStringForSearch(value);
    const sortStr = helpers.getSortString("title", sort);

    const result = await postService.getByTitle(searchValue, sortStr);

    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

// Tìm kiếm các post theo `createAt`
router.get("/search/createAt", async (req, res) => {
  try {
    const { timeStart, timeEnd, sort } = req.query;

    if (timeStart === undefined || timeEnd === undefined) {
      res.send(successHandler.getObject(null));
      return;
    }

    const sortStr = getSortString("create_at", sort);

    const result = await postService.getByCreateAt(timeStart, timeEnd, sortStr);
    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

// Tìm kiếm các post theo `authorDipslayName`
router.get("/search/authorDisplayName", async (req, res) => {
  try {
    const { value } = req.query;

    if (value === undefined) {
      res.send(successHandler.getObject(null));
      return;
    }

    const result = await postService.getByDisplayName(value);
    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

// Tìm kiếm các post theo `categoryTitle`
router.get("/search/categoryTitle", async (req, res) => {
  try {
    const { value } = req.query;

    if (value === undefined) {
      res.send(successHandler.getObject(null));
      return;
    }

    const result = await postService.getByCategoryTitle(value);
    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

router
  .route("/:id")
  // Cập nhật post theo `id`
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, title, content, hashImg } = req.body;
      const params = helpers.camelToSnake({ userId, title, content, hashImg });

      helpers.removeNullProps(params);
      const result = await postService.updatePostById(id, params);

      res.send(successHandler.getObject(result));
    } catch (error) {
      res.send(errorHandler.getObject(error));
    }
  })
  // Xóa post theo `id`
  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const result = await postService.deleteUserById(id);
      res.send(successHandler.getObject(result));
    } catch (error) {
      res.send(errorHandler.getObject(error));
    }
  })
  // Tìm kiếm post theo `id`
  .get(async (req, res) => {
    try {
      const { id } = req.params;

      const result = await postService.getById(id);
      res.send(successHandler.getObject(result));
    } catch (error) {
      res.send(errorHandler.getObject(error));
    }
  });

// /api/post
router
  .route("/")
  // lấy tất cả post
  .get(async (req, res) => {
    try {
      // lấy tất cả các post
      const posts = await postService.getAll();

      // lấy tất cả user
      const users = (await userService.getAllUsers()).map((user) => {
        user["password"] = null;
        return user;
      });
      const userDict = {};
      users.forEach((user) => (userDict[user.id] = user));

      // lấy tất cả category
      const categories = await categoryService.getAllCategories();
      const categoryDict = {};
      categories.forEach((category) => (categoryDict[category.id] = category));

      // thêm comments, likes, categories vào post
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        post.author = userDict[post.user_id];
        post.comments = await commentService.getByPostId(post.id);
        post.comments.forEach((cmt) => {
          cmt.user = userDict[cmt.user_id];
        });

        post.likes = await likeService.getByPostId(post.id);
        post.likes.forEach((like) => (like.user = userDict[like.user_id]));

        post.categories = await categoryService.getByPostId(post.id);
      }

      res.send(
        successHandler.getObject({
          posts,
        })
      );
    } catch (error) {
      res.send(errorHandler.getObject(error));
    }
  })
  // Tạo post
  .put(async (req, res) => {
    try {
      const { userId, title, content, hashImg } = req.body;

      const result = await postService.insert(userId, title, content, hashImg);
      res.send(successHandler.getObject(result));
    } catch (error) {
      res.send(errorHandler.getObject(error));
    }
  });

module.exports = router;
