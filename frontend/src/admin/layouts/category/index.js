import React, { useState, useMemo, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material Dashboard 2 React components
import MDBox from "admin/components/MDBox";
import MDTypography from "admin/components/MDTypography";
import MDInput from "admin/components/MDInput";
import MDButton from "admin/components/MDButton";
import DashboardLayout from "admin/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "admin/examples/Navbars/DashboardNavbar";

// Redux actions
import {
  createCategory,
  updateCategory,
  deleteCategory,
  fetchAllCategory,
} from "reducers/apiCategory";

function Category() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [formCategory, setFormCategory] = useState({
    id: null,
    title: "",
    description: "",
  }); // Dùng chung cho thêm/sửa

  // Lấy danh sách danh mục từ Redux
  const categories = useSelector((state) => state.apiCategory.categories);

  useEffect(() => {
    // Fetch tất cả danh mục khi component được load
    dispatch(fetchAllCategory());
  }, [dispatch]);

  // Lọc và sắp xếp danh mục theo từ khóa và ngày tạo (mới nhất)
  const filteredCategories = useMemo(() => {
    const sortedCategories = [...categories].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Sắp xếp theo `createdAt`
    );
    if (!search.trim()) return sortedCategories;
    return sortedCategories.filter((category) =>
      category.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  // Xử lý thêm hoặc sửa danh mục
  const handleSave = () => {
    const { id, title, description } = formCategory;
    if (!title || !description) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (id) {
      // Sửa danh mục
      dispatch(updateCategory({ id, title, description }))
        .unwrap()
        .then(() => toast.success("Cập nhật danh mục thành công!"))
        .catch(() => toast.error("Có lỗi xảy ra khi cập nhật danh mục."));
    } else {
      // Thêm mới danh mục
      dispatch(createCategory({ title, description }))
        .unwrap()
        .then(() => toast.success("Thêm danh mục thành công!"))
        .catch(() => toast.error("Có lỗi xảy ra khi thêm danh mục."));
    }

    // Reset form
    setFormCategory({ id: null, title: "", description: "" });
  };

  // Xử lý xóa danh mục
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      dispatch(deleteCategory(id))
        .unwrap()
        .then(() => toast.success("Xóa danh mục thành công!"))
        .catch(() => toast.error("Có lỗi xảy ra khi xóa danh mục."));
    }
  };

  // Đổ dữ liệu vào form để sửa
  const handleEdit = (category) => {
    setFormCategory(category);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <MDBox pt={6} pb={3}>
        {/* Ô tìm kiếm */}
        <MDBox mb={4} p={2} position="fixed" top="64px" width="50%" zIndex={10}>
          <MDInput
            placeholder="Tìm kiếm danh mục bài viết..."
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
                {/* Tiêu đề danh mục */}
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
                    Danh mục bài viết
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={3}>
                  {/* Form thêm/sửa danh mục */}
                  <MDBox mb={4}>
                    <MDTypography variant="h6">
                      {formCategory.id ? "Sửa danh mục" : "Thêm danh mục"}
                    </MDTypography>
                    <MDInput
                      placeholder="Tiêu đề"
                      value={formCategory.title}
                      onChange={(e) =>
                        setFormCategory({
                          ...formCategory,
                          title: e.target.value,
                        })
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <MDInput
                      placeholder="Mô tả"
                      value={formCategory.description}
                      onChange={(e) =>
                        setFormCategory({
                          ...formCategory,
                          description: e.target.value,
                        })
                      }
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <MDButton
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      {formCategory.id ? "Cập nhật" : "Thêm mới"}
                    </MDButton>
                    {formCategory.id && (
                      <MDButton
                        variant="outlined"
                        color="secondary"
                        onClick={() =>
                          setFormCategory({
                            id: null,
                            title: "",
                            description: "",
                          })
                        }
                        sx={{ ml: 2 }}
                      >
                        Hủy
                      </MDButton>
                    )}
                  </MDBox>

                  {/* Hiển thị danh mục */}
                  {filteredCategories.map((category) => (
                    <MDBox
                      key={category.id}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      py={2}
                      borderBottom="1px solid #ddd"
                    >
                      <MDTypography variant="body1" width="25%">
                        {category.title}
                      </MDTypography>
                      <MDTypography variant="body2" width="60%">
                        {category.description}
                      </MDTypography>
                      <MDButton
                        variant="text"
                        color="info"
                        onClick={() => handleEdit(category)}
                      >
                        Sửa
                      </MDButton>
                      <MDButton
                        variant="text"
                        color="error"
                        onClick={() => handleDelete(category.id)}
                      >
                        Xóa
                      </MDButton>
                    </MDBox>
                  ))}

                  {/* Hiển thị khi không có danh mục */}
                  {filteredCategories.length === 0 && (
                    <MDBox textAlign="center" py={3}>
                      <MDTypography variant="body2" color="textSecondary">
                        Không tìm thấy danh mục nào.
                      </MDTypography>
                    </MDBox>
                  )}
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Category;
