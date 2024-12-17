import React, { useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useSelector, useDispatch } from "react-redux";

// Material Dashboard 2 React components
import MDBox from "admin/components/MDBox";
import MDTypography from "admin/components/MDTypography";
import MDAvatar from "admin/components/MDAvatar";
import MDInput from "admin/components/MDInput";
import MDButton from "admin/components/MDButton";
import { deleteUser } from "reducers/apiUser";
import DashboardLayout from "admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "admin/examples/Navbars/DashboardNavbar";
import defaultAvatar from "admin/assets/images/user.png";

function Tables() {
  const users = useSelector((state) => state.apiUser.users);
  const posts = useSelector((state) => state.apiPost.posts);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const filteredUsers = useMemo(() => {
    return users
      .map((user) => {
        const userPosts = posts.filter((post) => post.user_id === user.id);
        const postCount = userPosts.length;
        const likeCount = userPosts.reduce(
          (acc, post) => acc + (post.likes?.length || 0),
          0
        );
        const commentCount = userPosts.reduce(
          (acc, post) => acc + (post.comments?.length || 0),
          0
        );

        return {
          ...user,
          postCount,
          likeCount,
          commentCount,
        };
      })
      .filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
  }, [users, posts, search]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={4} p={2} position="fixed" top="64px" width="50%" zIndex={10}>
          <MDInput
            placeholder="Tìm kiếm theo tên người dùng hoặc email..."
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                padding: "0 8px",
                margin: "20px",
                backgroundColor: "#fff",
              },
            }}
          />
        </MDBox>
        <MDBox pt={4} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="warning"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Tài khoản người dùng
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={3}>
                  <MDBox
                    display={{ xs: "none", md: "flex" }}
                    justifyContent="space-between"
                    mb={1}
                  >
                    <MDTypography
                      variant="caption"
                      fontWeight="medium"
                      color="text"
                      width="25%"
                    >
                      Người dùng
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      fontWeight="medium"
                      color="text"
                      width="15%"
                    >
                      Số bài blog
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      fontWeight="medium"
                      color="text"
                      width="15%"
                    >
                      Số lượt thích
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      fontWeight="medium"
                      color="text"
                      width="15%"
                    >
                      Số lượt bình luận
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      fontWeight="medium"
                      color="text"
                      width="20%"
                    >
                      Ngày tạo tài khoản
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      fontWeight="medium"
                      color="text"
                      width="10%"
                      textAlign="right"
                    ></MDTypography>
                  </MDBox>

                  {/* Render each user row */}
                  <MDBox>
                    {filteredUsers.map((user, index) => (
                      <MDBox
                        key={index}
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                        py={1}
                        borderBottom="1px solid #eee"
                      >
                        <MDBox width={{ xs: "100%", md: "25%" }}>
                          <MDTypography
                            variant="caption"
                            fontWeight="medium"
                            color="text"
                            display={{ xs: "block", md: "none" }}
                          >
                            Người dùng &nbsp;
                          </MDTypography>
                          <MDBox display="flex" alignItems="center">
                            <MDAvatar
                              src={user.avatar || defaultAvatar}
                              name={user.username}
                              size="sm"
                            />
                            <MDBox ml={2}>
                              <MDTypography
                                display="block"
                                variant="button"
                                fontWeight="medium"
                              >
                                {user.username}
                              </MDTypography>
                              <MDTypography variant="caption">
                                {user.email}
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                        </MDBox>
                        <MDBox width={{ xs: "100%", md: "15%" }}>
                          <MDTypography
                            variant="caption"
                            fontWeight="medium"
                            color="text"
                            display={{ xs: "block", md: "none" }}
                          >
                            Số bài blog &nbsp;
                          </MDTypography>
                          <MDTypography variant="caption">
                            {user.postCount}
                          </MDTypography>
                        </MDBox>
                        <MDBox width={{ xs: "100%", md: "15%" }}>
                          <MDTypography
                            variant="caption"
                            fontWeight="medium"
                            color="text"
                            display={{ xs: "block", md: "none" }}
                          >
                            Số lượt thích &nbsp;
                          </MDTypography>
                          <MDTypography variant="caption">
                            {user.likeCount}
                          </MDTypography>
                        </MDBox>
                        <MDBox width={{ xs: "100%", md: "15%" }}>
                          <MDTypography
                            variant="caption"
                            fontWeight="medium"
                            color="text"
                            display={{ xs: "block", md: "none" }}
                          >
                            Số lượt bình luận &nbsp;
                          </MDTypography>
                          <MDTypography variant="caption">
                            {user.commentCount}
                          </MDTypography>
                        </MDBox>
                        <MDBox width={{ xs: "100%", md: "20%" }}>
                          <MDTypography
                            variant="caption"
                            fontWeight="medium"
                            color="text"
                            display={{ xs: "block", md: "none" }}
                          >
                            Ngày tạo tài khoản &nbsp;
                          </MDTypography>
                          <MDTypography variant="caption">
                            {new Date(user.created_at).toLocaleDateString()}
                          </MDTypography>
                        </MDBox>
                        <MDBox
                          width={{ xs: "100%", md: "10%" }}
                          display="flex"
                          justifyContent={{ xs: "flex-start", md: "flex-end" }}
                        >
                          <MDButton
                            variant="text"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(user.id)}
                          >
                            Xóa
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    ))}
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
