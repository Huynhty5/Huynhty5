// React and Redux imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAdmin, logoutAdmin } from "reducers/apiAdmin"; // Import logoutAdmin

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import defaultAvatar from "admin/assets/images/user.png";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Font Awesome icon for edit
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

// Material Dashboard 2 React components
import MDBox from "admin/components/MDBox";
import MDTypography from "admin/components/MDTypography";
import DashboardLayout from "admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "admin/examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "admin/layouts/profile/components/Header";
import colors from "admin/assets/theme/base/colors";
import typography from "admin/assets/theme/base/typography";
import { Navigate, useNavigate } from "react-router-dom";

function Overview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.apiAdmin.admin);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({
    id: admin?.id,
    username: admin?.username,
    email: admin?.email,
    address: admin?.address,
    gender: admin?.gender,
    avatar: admin?.avatar,
  });

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log(updatedValues);
    dispatch(updateAdmin(updatedValues));
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("authentication/sign-in");
  };

  const postCloudinary = (pic) => {
    setLoading(true);

    if (["image/jpg", "image/jpeg", "image/png"].includes(pic.type)) {
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
      alert("Please upload an image in JPG, JPEG, or PNG format");
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      postCloudinary(file);
    }
  };

  const { socialMediaColors } = colors;
  const { size } = typography;

  const renderSocialIcons = [
    {
      link: "https://www.facebook.com/",
      icon: <FacebookIcon />,
      color: "facebook",
    },
    {
      link: "https://twitter.com/",
      icon: <TwitterIcon />,
      color: "twitter",
    },
    {
      link: "https://www.instagram.com",
      icon: <InstagramIcon />,
      color: "instagram",
    },
  ].map(({ link, icon, color }) => (
    <MDBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </MDBox>
  ));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <Card sx={{ height: "100%", boxShadow: "none" }}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  pt={2}
                  px={2}
                >
                  <MDTypography
                    variant="h6"
                    fontWeight="medium"
                    textTransform="capitalize"
                  >
                    Thông tin cá nhân
                  </MDTypography>
                  <MDBox>
                    {isEditing ? (
                      <>
                        <Tooltip title="Save Changes" placement="top">
                          <FontAwesomeIcon
                            icon={faSave}
                            onClick={handleSave}
                            style={{
                              cursor: "pointer",
                              marginRight: "8px",
                              color: "green",
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Cancel" placement="top">
                          <FontAwesomeIcon
                            icon={faTimes}
                            onClick={toggleEditMode}
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </Tooltip>
                      </>
                    ) : (
                      <Tooltip title="Edit Profile" placement="top">
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={toggleEditMode}
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </MDBox>
                </MDBox>
                <MDBox p={2}>
                  <MDBox display="flex" alignItems="center" mb={2}>
                    <img
                      src={
                        updatedValues?.avatar || admin?.avatar || defaultAvatar
                      }
                      alt="Avatar"
                      width="100"
                      height="100"
                      style={{ borderRadius: "50%", marginRight: "16px" }}
                    />
                    {isEditing && (
                      <Button variant="contained" component="label">
                        <span style={{ color: "#fff" }}>Upload Avatar</span>
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </Button>
                    )}
                  </MDBox>
                  <MDBox opacity={0.3}>
                    <Divider />
                  </MDBox>
                  <MDBox>
                    <MDBox display="flex" py={1} pr={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        Full name: &nbsp;
                      </MDTypography>
                      {isEditing ? (
                        <TextField
                          name="username"
                          value={updatedValues.username}
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          color="text"
                        >
                          &nbsp;{admin.username || "N/A"}
                        </MDTypography>
                      )}
                    </MDBox>
                    <MDBox display="flex" py={1} pr={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        Email: &nbsp;
                      </MDTypography>
                      {isEditing ? (
                        <TextField
                          name="email"
                          value={updatedValues.email}
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          color="text"
                        >
                          &nbsp;{admin.email || "Not Provided"}
                        </MDTypography>
                      )}
                    </MDBox>
                    <MDBox display="flex" py={1} pr={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        Location: &nbsp;
                      </MDTypography>
                      {isEditing ? (
                        <TextField
                          name="address"
                          value={updatedValues.address}
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <MDTypography
                          variant="button"
                          fontWeight="regular"
                          color="text"
                        >
                          &nbsp;{admin.address || "Not Provided"}
                        </MDTypography>
                      )}
                    </MDBox>
                    <MDBox display="flex" py={1} pr={2}>
                      <MDTypography
                        variant="button"
                        fontWeight="bold"
                        textTransform="capitalize"
                      >
                        Social: &nbsp;
                      </MDTypography>
                      {renderSocialIcons}
                    </MDBox>
                  </MDBox>
                  {/* Logout Button */}
                  <MDBox mt={3}>
                    <Button
                      variant="contained"
                      onClick={handleLogout}
                      fullWidth
                      style={{
                        backgroundColor: "#e67a00",
                        color: "white", // Ensures the text color contrasts well with the red background
                      }}
                    >
                      Đăng xuất
                    </Button>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
