import { configureStore } from "@reduxjs/toolkit";
import apiPost, { fetchAllPost } from "./reducers/apiPost";
import showTab from "./reducers/showTab";
import apiUser, { fetchAllUser } from "./reducers/apiUser";
import apiLike, { fetchPostLiked } from "./reducers/apiLike";
import search from "./reducers/search";
import apiCategory, { fetchAllCategory } from "./reducers/apiCategory";
import apiComment from "./reducers/apiComment";
import updatePost from "./reducers/updatePost";
import apiAdmin from "./reducers/apiAdmin";

const reduxStore = configureStore({
  reducer: {
    apiPost: apiPost,
    showTab: showTab,
    apiUser: apiUser,
    apiLike: apiLike,
    search: search,
    apiCategory: apiCategory,
    apiComment: apiComment,
    updatePost: updatePost,
    apiAdmin: apiAdmin,
  },
});

reduxStore.dispatch(fetchAllCategory());
reduxStore.dispatch(fetchAllPost());
reduxStore.dispatch(fetchAllUser());

export default reduxStore;
