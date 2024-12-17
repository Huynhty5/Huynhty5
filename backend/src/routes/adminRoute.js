const router = require("express").Router();
const helpers = require("../helpers");
const successHandler = require("../handler/successHandler.js");
const errorHandler = require("../handler/errorHandler.js");
const adminService = require("../services/adminService.js");
const bcrypt = require("bcryptjs");

router
  .route("/")
  // Đăng nhập tài khoản
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await adminService.getAdminByEmail(email);
      if (admin === null) {
        res.send(successHandler.getObject(null));
        return;
      }

      // So sánh mật khẩu đã mã hóa
      const isMatch = await bcrypt.compare(password, admin.password);

      if (isMatch) {
        // Nếu mật khẩu chính xác, loại bỏ mật khẩu khỏi kết quả trả về
        delete admin.password;
        res.send(successHandler.getObject(admin));
        return;
      }

      // Trả về thông báo mật khẩu sai nếu không khớp
      res.send(successHandler.getObject({ password: false }));
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
        params.password = hashedPassword; // Thay mật khẩu bằng mật khẩu đã mã hóa
      }

      const result = await adminService.updateAdminByEmail(email, params);

      res.send(successHandler.getObject(result));
    } catch (error) {
      res.send(errorHandler.getObject(error));
    }
  });

module.exports = router;
