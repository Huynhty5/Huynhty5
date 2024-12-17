import React, { useMemo } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "admin/components/MDBox";
import DashboardLayout from "admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "admin/examples/Navbars/DashboardNavbar";
import ReportsBarChart from "admin/examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "admin/examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "admin/examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useSelector } from "react-redux";

function Dashboard() {
  const posts = useSelector((state) => state.apiPost.posts);
  const users = useSelector((state) => state.apiUser.users);

  // Tính toán thống kê theo từng người dùng
  const userStatistics = useMemo(() => {
    return users.map((user) => {
      const userPosts = posts.filter((post) => post.user_id === user.id);
      const totalPosts = userPosts.length;
      const totalLikes = userPosts.reduce(
        (acc, post) => acc + (post.likes?.length || 0),
        0
      );
      const totalComments = userPosts.reduce(
        (acc, post) => acc + (post.comments?.length || 0),
        0
      );

      return {
        username: user.username,
        totalPosts,
        totalLikes,
        totalComments,
      };
    });
  }, [users, posts]);

  // Tạo dữ liệu cho biểu đồ
  const barChartDataPosts = {
    labels: userStatistics.map((user) => user.username),
    datasets: {
      label: "Posts",
      data: userStatistics.map((user) => user.totalPosts),
    },
  };

  const lineChartDataLikes = {
    labels: userStatistics.map((user) => user.username),
    datasets: {
      label: "Likes",
      data: userStatistics.map((user) => user.totalLikes),
    },
  };

  const barChartDataComments = {
    labels: userStatistics.map((user) => user.username),
    datasets: {
      label: "Comments",
      data: userStatistics.map((user) => user.totalComments),
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                title="Tổng số người dùng"
                count={users.length}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                title="Tổng số bài blog"
                count={posts.length}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                title="Tổng số lượt thích"
                count={posts.reduce(
                  (acc, post) => acc + (post.likes?.length || 0),
                  0
                )}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                title="Tổng số bình luận"
                count={posts.reduce(
                  (acc, post) => acc + (post.comments?.length || 0),
                  0
                )}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3} display="flex" justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Số bài blog theo người dùng"
                  chart={barChartDataPosts}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Số lượt thích theo người dùng"
                  chart={lineChartDataLikes}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="warning"
                  title="Số lượt bình luận theo người dùng"
                  chart={barChartDataComments}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
