import React, { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUser } from "../reducers/apiUser";
import { saveTab } from "../reducers/showTab";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "react-bootstrap";

const AccoutSetting = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.apiUser.user);

  const [loading, setLoading] = useState(false);
  const [editField, setEditField] = useState(null); // Track which field is in edit mode
  const [newPassword, setNewPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [updatedValues, setUpdatedValues] = useState({
    username: user.username,
    email: user.email,
    address: user.address,
    gender: user.gender,
    avatar: user.avatar,
  });

  const postCloudinary = (pic) => {
    setLoading(true);

    if (
      pic.type === "image/jpg" ||
      pic.type === "image/jpeg" ||
      pic.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dj8ae1gpq");

      fetch("https://api.cloudinary.com/v1_1/dj8ae1gpq/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImageUrl(data.url.toString());
          setUpdatedValues((prev) => ({
            ...prev,
            avatar: data.url.toString(),
          }));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setNewPassword(value);
    } else {
      setUpdatedValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Save updated data
  const handleSave = (field) => {
    console.log(updatedValues);
    if (field === "password") {
      if (newPassword.length > 0) {
        // Dispatch an action to update password
        dispatch(updateUser({ ...user, password: newPassword }));
        setNewPassword("");
      }
    } else {
      // Update other fields
      dispatch(updateUser({ ...user, [field]: updatedValues[field] }));
    }
    setEditField(null); // Exit edit mode
    setImageUrl(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    postCloudinary(file);
  };

  return (
    <div className="account-settings">
      <div className="setting-infor">
        <img src={user.avatar || "/user.png"} />
        <p>{user.email}</p>
      </div>

      <div className="setting-row">
        <div className="label">Đổi ảnh avatar</div>
        <div className="value">
          <label className="file-label">
            <input
              type="file"
              className="file-input"
              onChange={handleImageUpload}
              disabled={loading}
            />
          </label>

          {loading && (
            <div
              style={{
                display: "block",
                margin: "0 10px",
              }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </div>
      </div>

      {imageUrl && (
        <div className="update-container">
          <img src={imageUrl} alt="Preview" className="image-preview" />
          <button className="btn-avatar" onClick={() => handleSave("avatar")}>
            Cập nhật
          </button>
        </div>
      )}

      <div className="setting-row">
        <div className="label">Họ Tên</div>
        <div className="value">
          {editField === "username" ? (
            <input
              type="text"
              name="username"
              value={updatedValues.username}
              onChange={handleChange}
            />
          ) : (
            user.username
          )}
        </div>
        {editField === "username" ? (
          <FaSave
            className="edit-icon active"
            onClick={() => handleSave("username")}
          />
        ) : (
          <FaEdit
            className="edit-icon"
            onClick={() => setEditField("username")}
          />
        )}
      </div>

      <div className="setting-row">
        <div className="label">Địa chỉ</div>
        <div className="value">
          {editField === "address" ? (
            <input
              type="text"
              name="address"
              value={updatedValues.address}
              onChange={handleChange}
            />
          ) : (
            user.address
          )}
        </div>
        {editField === "address" ? (
          <FaSave
            className="edit-icon active"
            onClick={() => handleSave("address")}
          />
        ) : (
          <FaEdit
            className="edit-icon"
            onClick={() => setEditField("address")}
          />
        )}
      </div>

      <div className="setting-row">
        <div className="label">Giới tính</div>
        <div className="value">
          {editField === "gender" ? (
            <select
              name="gender"
              value={updatedValues.gender}
              onChange={handleChange}
            >
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Giới tính khác</option>
            </select>
          ) : updatedValues.gender === "Male" ? (
            "Nam"
          ) : updatedValues.gender === "Female" ? (
            "Nữ"
          ) : (
            "Giới tính khác"
          )}
        </div>
        {editField === "gender" ? (
          <FaSave
            className="edit-icon active"
            onClick={() => handleSave("gender")}
          />
        ) : (
          <FaEdit
            className="edit-icon"
            onClick={() => setEditField("gender")}
          />
        )}
      </div>

      {/* Password Field */}
      <div className="setting-row">
        <div className="label">Mật khẩu</div>
        <div className="value">
          {editField === "password" ? (
            <input
              type="password"
              name="password"
              value={newPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới"
            />
          ) : (
            "******"
          )}
        </div>
        {editField === "password" ? (
          <FaSave
            className="edit-icon active"
            onClick={() => handleSave("password")}
          />
        ) : (
          <FaEdit
            className="edit-icon"
            onClick={() => setEditField("password")}
          />
        )}
      </div>

      <div className="setting-row">
        <button
          onClick={() => {
            dispatch(saveTab("home"));
            dispatch(logoutUser());
          }}
        >
          Đăng xuất <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default AccoutSetting;
