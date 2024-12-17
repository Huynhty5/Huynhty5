import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTab } from "../reducers/showTab";
import { setSearch } from "../reducers/search";
import { fetchAllPostEachUser } from "../reducers/apiPost";
import ThemeToggle from "./ThemeToggle";

const RightSidebar = ({ theme, toggleTheme }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.apiUser.users);
  const search = useSelector((state) => state.search.search);

  return (
    <div className="right-sidebar p-3">
      <div className="right-sidebar-item">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Tìm kiếm blog"
          value={search}
          onClick={() => dispatch(saveTab("home"))}
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
          }}
        />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <ul className="blog-list">
        <p>Blog nổi bật</p>
        {users?.map((user) => (
          <li>
            <span>{user.username}</span>
            <button
              onClick={() => {
                dispatch(fetchAllPostEachUser(user.id));
                dispatch(saveTab("personal-blog"));
              }}
            >
              Xem
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightSidebar;
