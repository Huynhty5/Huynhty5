import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faGear } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { saveTab } from "../reducers/showTab";
import { fetchAllPostEachUser } from "../reducers/apiPost";

const Sidebar = ({ setActiveModal, toggleSidebar }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.showTab.showTab); // Get the active tab from Redux

  const user = useSelector((state) => state.apiUser.user);

  // Function to open the modal
  const openModal = () => {
    if (user == null) setActiveModal("login");
    else setActiveModal("addPost");
  };

  return (
    <div className="sidebar">
      {/* Logo */}
      <img
        className="logo"
        src="/logo2.png"
        onClick={() => {
          dispatch(saveTab("home"));
        }}
      />

      {/* Navigation */}
      <ul className="nav flex-column">
        <li
          className={`nav-item ${activeTab == "home" ? "active" : ""}`}
          onClick={() => {
            dispatch(saveTab("home"));
            toggleSidebar(false);
          }}
        >
          <FontAwesomeIcon icon={faHouse} className="me-2" /> Trang chủ
        </li>
        <li
          className={`nav-item ${activeTab == "personal-blog" ? "active" : ""}`}
          onClick={() => {
            if (user == null) setActiveModal("login");
            else {
              dispatch(fetchAllPostEachUser(user.id));
              dispatch(saveTab("personal-blog"));
            }
            toggleSidebar(false);
          }}
        >
          <FontAwesomeIcon icon={faUser} className="me-2" /> Blog của bạn
        </li>
        <li
          className={`nav-item ${activeTab == "account" ? "active" : ""}`}
          onClick={() => {
            if (user == null) setActiveModal("login");
            else dispatch(saveTab("account"));

            toggleSidebar(false);
          }}
        >
          <FontAwesomeIcon icon={faGear} className="me-2" /> Tài khoản
        </li>
      </ul>

      {/* Button to create post */}
      <button className="btn btn-primary mt-2" onClick={openModal}>
        Tạo bài viết +
      </button>
    </div>
  );
};

export default Sidebar;
