import React, { useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";

// Material Dashboard 2 React components
import MDBox from "admin/components/MDBox";
import MDTypography from "admin/components/MDTypography";
import MDAvatar from "admin/components/MDAvatar";
import MDInput from "admin/components/MDInput";
import MDButton from "admin/components/MDButton";
import { deletePost } from "reducers/apiPost";
import DashboardLayout from "admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "admin/examples/Navbars/DashboardNavbar";
import defaultAvatar from "admin/assets/images/user.png";

function Blogs() {
  const users = useSelector((state) => state.apiUser.users);
  const posts = useSelector((state) => state.apiPost.posts);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const filteredUsers = useMemo(() => {
    return users
      .map((user) => ({
        ...user,
        posts: posts.filter(
          (post) =>
            post.user_id === user.id &&
            (user.username.toLowerCase().includes(search.toLowerCase()) ||
              post.title.toLowerCase().includes(search.toLowerCase()) ||
              post.content.toLowerCase().includes(search.toLowerCase()))
        ),
      }))
      .filter((user) => user.posts.length > 0); // filter users with posts matching search
  }, [users, posts, search]);

  const noPostsFound = filteredUsers.every((user) => user.posts.length === 0);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={2} p={2} position="fixed" top="64px" width="50%" zIndex={10}>
          <MDInput
            placeholder="Tìm kiếm theo tiêu đề hoặc nội dung..."
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
          {/* Adjust padding to account for the fixed search bar */}
          <Grid container spacing={6}>
            {noPostsFound ? (
              <MDBox display="flex" justifyContent="center" width="100%" mt={3}>
                <MDTypography variant="h6" color="textSecondary">
                  Blog không tồn tại !
                </MDTypography>
              </MDBox>
            ) : (
              filteredUsers.map((user) => (
                <Grid item xs={12} key={user.id}>
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
                        Blog của {user.username}
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={3} px={3}>
                      <Grid container spacing={3}>
                        {user.posts.map((post) => (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                            <MDBox
                              mb={2}
                              p={2}
                              border="1px solid #eee"
                              borderRadius="8px"
                              style={{
                                minHeight: "380px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              <div>
                                <MDBox
                                  display="flex"
                                  alignItems="center"
                                  mb={1}
                                >
                                  <MDAvatar
                                    src={user.avatar || defaultAvatar}
                                    name={user.username}
                                    size="sm"
                                  />
                                  <MDBox ml={2}>
                                    <MDTypography
                                      variant="button"
                                      fontWeight="medium"
                                    >
                                      {user.username}
                                    </MDTypography>
                                    &nbsp;
                                    <MDTypography
                                      variant="caption"
                                      color="text"
                                    >
                                      {user.email}
                                    </MDTypography>
                                  </MDBox>
                                </MDBox>

                                {post.hash_img && (
                                  <MDBox
                                    mb={2}
                                    display="flex"
                                    justifyContent="center"
                                    style={{
                                      borderRadius: "8px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <img
                                      src={post.hash_img}
                                      alt="Post Image"
                                      style={{
                                        width: "100%",
                                        maxWidth: "100px",
                                        objectFit: "contain",
                                      }}
                                    />
                                  </MDBox>
                                )}

                                <MDBox mb={1}>
                                  <MDTypography
                                    variant="caption"
                                    fontWeight="medium"
                                    color="text"
                                  >
                                    Tiêu đề:
                                  </MDTypography>
                                  <MDTypography variant="caption">
                                    {post.title}
                                  </MDTypography>
                                </MDBox>

                                <MDBox mb={1}>
                                  <MDTypography
                                    variant="caption"
                                    fontWeight="medium"
                                    color="text"
                                  >
                                    Nội dung:
                                  </MDTypography>
                                  <MDTypography
                                    variant="caption"
                                    dangerouslySetInnerHTML={{
                                      __html: DOMPurify.sanitize(post.content),
                                    }}
                                  />
                                </MDBox>

                                <MDBox mb={1}>
                                  <MDTypography
                                    variant="caption"
                                    fontWeight="medium"
                                    color="text"
                                  >
                                    Thể loại:
                                  </MDTypography>
                                  <MDTypography variant="caption">
                                    {post.categories
                                      .map((category) => category.title)
                                      .join(", ")}
                                  </MDTypography>
                                </MDBox>
                              </div>

                              <MDBox
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mt={2}
                              >
                                <MDTypography
                                  variant="caption"
                                  fontWeight="medium"
                                  color="text"
                                >
                                  Ngày đăng:{" "}
                                  {new Date(
                                    post.create_at
                                  ).toLocaleDateString()}
                                </MDTypography>
                                <MDButton
                                  variant="text"
                                  color="error"
                                  size="small"
                                  onClick={() => handleDelete(post.id)}
                                >
                                  Xóa
                                </MDButton>
                              </MDBox>
                            </MDBox>
                          </Grid>
                        ))}
                      </Grid>
                    </MDBox>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Blogs;
