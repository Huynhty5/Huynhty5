import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import RightSidebar from "./RightSidebar";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import ModalAddPost from "./ModalAddPost";
import ModalLogin from "./ModalLogin";
import ModalSignup from "./ModalSignup";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostLiked } from "../reducers/apiLike";
import ThemeToggle from "./ThemeToggle";

const Home = () => {
  const dispatch = useDispatch();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Add theme state with local storage persistence
  const [theme, setTheme] = useState(() => {
    // Initialize theme from local storage, default to 'light-theme'
    return localStorage.getItem("app-theme") || "light-theme";
  });

  const user = useSelector((state) => state.apiUser.user);

  useEffect(() => {
    if (user) dispatch(fetchPostLiked(user.id));
  }, [user, dispatch]);

  // Effect to update local storage when theme changes
  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    // Update body class for global styling
    document.body.className = theme;
  }, [theme]);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Theme toggle function
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  return (
    <>
      <button className="mobile-menu-btn d-lg-none" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`app-container ${theme}`}>
        <div
          className={`sidebar-container ${
            isSidebarVisible ? "show-sidebar" : ""
          }`}
        >
          <Sidebar
            setActiveModal={setActiveModal}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className="main-content-container">
          <MainContent
            setSidebarVisible={setSidebarVisible}
            setActiveModal={setActiveModal}
          />
        </div>
        <div className="right-sidebar-container">
          <RightSidebar theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>

      {activeModal === "addPost" && (
        <ModalAddPost isOpen={true} onClose={closeModal} />
      )}
      {activeModal === "login" && (
        <ModalLogin
          isOpen={true}
          onClose={closeModal}
          setActiveModal={setActiveModal}
        />
      )}
      {activeModal === "signup" && (
        <ModalSignup
          isOpen={true}
          onClose={closeModal}
          setActiveModal={setActiveModal}
        />
      )}
    </>
  );
};

export default Home;
