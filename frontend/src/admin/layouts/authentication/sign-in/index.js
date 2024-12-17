import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "admin/components/MDBox";
import MDTypography from "admin/components/MDTypography";
import MDInput from "admin/components/MDInput";
import MDButton from "admin/components/MDButton";

// Authentication layout components
import BasicLayout from "admin/layouts/authentication/components/BasicLayout";

// Images
import bgImage from "admin/assets/images/bg-sign-in-basic.jpeg";
import { loginAdmin } from "reducers/apiAdmin";
import { useNavigate } from "react-router-dom";

function Basic() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const admin = useSelector((state) => state.apiAdmin.admin);

  useEffect(() => {
    if (admin) navigate("/dashboard");
  }, [admin]);

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (email && password) {
      dispatch(loginAdmin({ email, password }));
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Đăng nhập quản lý
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleLogin}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="warning"
                fullWidth
                type="submit"
              >
                Đăng nhập
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
