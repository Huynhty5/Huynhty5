import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signupUser } from "../reducers/apiUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalSignup = ({ isOpen, onClose, setActiveModal }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleSignup = () => {
    if (password.length < 8) {
      toast.error("Mật khẩu phải có 8 ký tự trở lên!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    const signupData = {
      username,
      email,
      password,
    };

    dispatch(signupUser(signupData));
    toast.success("Signup successful!");
    onClose(); // Close the modal after signup
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Đăng ký</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <input
          type="text"
          className="username-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          className="email-input"
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
        <input
          type="password"
          className="confirm-password-input"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p>
          Bạn đã có tài khoản{" "}
          <span onClick={() => setActiveModal("login")}>đăng nhập</span>
        </p>
        <div className="modal-footer">
          <button className="signup-btn" onClick={handleSignup}>
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSignup;
