const router = require("express").Router();
const successHandler = require("../handler/successHandler.js");
const errorHandler = require("../handler/errorHandler.js");
const userService = require("../services/userService.js");
const helpers = require("../helpers");
const bcrypt = require("bcryptjs");

// Xóa tài khoản theo ID
router.route("/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUserById(id);
    res.send(successHandler.getObject(result));
  } catch (error) {
    res.send(errorHandler.getObject(error));
  }
});

// Các API cho /api/user
router
  .route("/")
  // Lấy danh sách tất cả user trong db
  .get(async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.send(successHandler.getObject(users));
    } catch (error) {
      res.send(errorHandler.getObject(error));
    }
  })
  // Đăng nhập tài khoản
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userService.getUserByEmail(email);

      if (user === null) {
        res.send(successHandler.getObject(null));
        return;
      }

      // So sánh mật khẩu đã mã hóa
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // Nếu mật khẩu chính xác, gửi thông tin người dùng (loại bỏ mật khẩu)
        const { password, ...userData } = user;
        res.send(successHandler.getObject(userData));
      } else {
        res.send(successHandler.getObject({ password: false }));
      }
    } catch (error) {
      res.send(errorHandler.getObject(error));
    }
  })
  // Đăng ký tài khoản (Mã hóa mật khẩu)
  .put(async (req, res) => {
    try {
      const { email, username, password } = req.body;

      // Mã hóa mật khẩu trước khi lưu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Gọi service để lưu tài khoản với mật khẩu đã mã hóa
      const result = await userService.insert(email, username, hashedPassword);
      res.send(successHandler.getObject(result));
    } catch (error) {
      res.send(errorHandler.getObject(error));
    }
  })
  // Cập nhật tài khoản
  .patch(async (req, res) => {
    try {
      const { username, password, email, gender, address, avatar } = req.body;
      const params = helpers.camelToSnake({
        username,
        password,
        gender,
        address,
        avatar,
      });

      helpers.removeNullProps(params);

      // Nếu mật khẩu có thay đổi, mã hóa lại mật khẩu
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        params.password = hashedPassword;
      }

      const result = await userService.updateUserByEmail(email, params);

      res.send(successHandler.getObject(result));
    } catch (error) {
      res.send(errorHandler.getObject(error));
    }
  })
  // Xóa tài khoản theo username
  .delete(async (req, res) => {
    try {
      const { username } = req.body;
      const result = await userService.deleteUserByUsername(username);
      res.send(successHandler.getObject(result));
    } catch (error) {
      res.send(errorHandler.getObject(error));
    }
  });

module.exports = router;
