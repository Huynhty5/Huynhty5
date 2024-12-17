import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/apiUser"; // Assuming you have a login action

const ModalLogin = ({ isOpen, onClose, setActiveModal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.apiUser.user);

  if (!isOpen) return null;

  const handleLogin = () => {
    const loginData = {
      email,
      password,
    };
    dispatch(loginUser(loginData));
  };

  if (user) onClose();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Đăng nhập</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <input
          type="text"
          className="username-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="password-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Bạn chưa có tài khoản{" "}
          <span onClick={() => setActiveModal("signup")}>đăng ký</span>
        </p>
        <div className="modal-footer">
          <button className="login-btn" onClick={handleLogin}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
