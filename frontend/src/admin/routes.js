// Material Dashboard 2 React layouts
import Dashboard from "./layouts/dashboard";
import Tables from "./layouts/tables";
import Profile from "./layouts/profile";
import SignIn from "./layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";
import Blogs from "./layouts/blogs";
import Category from "./layouts/category";

const routes = [
  {
    type: "collapse",
    name: "Thống kê",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tài khoản",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Các blog",
    key: "blogs",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/blogs",
    component: <Blogs />,
  },
  {
    type: "collapse",
    name: "Danh mục",
    key: "category",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/category",
    component: <Category />,
  },
  {
    type: "collapse",
    name: "Hồ sơ",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    // type: "collapse",
    // name: "Đăng nhập",
    // key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
