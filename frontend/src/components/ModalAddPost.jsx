import React, { useEffect, useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../reducers/apiPost";
import { Spinner } from "react-bootstrap";
import { setUpdatePost } from "../reducers/updatePost";
import { updateCategoryPost } from "../reducers/apiCategory";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import styles

const ModalAddPost = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [warning, setWarning] = useState({
    title: "",
    content: "",
    category: "",
  });

  const user = useSelector((state) => state.apiUser.user);
  const categories = useSelector((state) => state.apiCategory.categories);
  const updatePostData = useSelector((state) => state.updatePost.updatePost);

  useEffect(() => {
    if (Object.keys(updatePostData).length > 0) {
      setTitle(updatePostData.title);
      setContent(updatePostData.content);
      setSelectedCategories(
        updatePostData.categories.map((cat) => Number(cat.id))
      ); // Map categories to IDs
      setImageUrl(updatePostData.hash_img || "");
    }
  }, [updatePostData]);

  if (!isOpen) return null;

  const postCloudinary = (pic) => {
    setLoading(true);
    if (!pic) {
      setWarning((prev) => ({
        ...prev,
        image: "Please select a valid image.",
      }));
      setLoading(false);
      return;
    }

    if (
      ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(pic.type)
    ) {
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
          setImageUrl(data.url);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setLoading(false);
        });
    } else {
      setWarning((prev) => ({ ...prev, image: "Unsupported file format." }));
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    postCloudinary(file);
  };

  const handlePost = () => {
    let valid = true;
    const newWarning = { title: "", content: "", category: "" };

    if (!title) {
      newWarning.title = "Tiêu đề không để trống !";
      valid = false;
    }
    if (!content) {
      newWarning.content = "Nội dung không để trống.";
      valid = false;
    }
    if (selectedCategories.length === 0) {
      newWarning.category = "Vui lòng chọn ít nhất 1 thẻ.";
      valid = false;
    }

    setWarning(newWarning);

    if (valid && !loading) {
      const postData = {
        userId: user.id,
        title,
        content,
        hashImg: imageUrl,
        categories: selectedCategories,
      };

      if (Object.keys(updatePostData).length > 0) {
        // Update post if updatePostData is present
        dispatch(updatePost({ ...postData, id: updatePostData.id }));
        dispatch(
          updateCategoryPost({
            postId: updatePostData.id,
            categoryList: postData.categories,
          })
        );
        dispatch(setUpdatePost({}));
      } else {
        // Add new post
        dispatch(addPost(postData));
      }

      setTitle("");
      setContent("");
      setImageUrl("");
      setSelectedCategories([]);
      onClose();
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (warning.title) setWarning((prev) => ({ ...prev, title: "" }));
  };

  const handleContentChange = (value) => {
    setContent(value); // Update content state with ReactQuill value
    if (warning.content) setWarning((prev) => ({ ...prev, content: "" }));
  };

  const handleCategoryChange = (e) => {
    const value = Number(e.target.value);
    if (!selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    }
    if (warning.category) setWarning((prev) => ({ ...prev, category: "" }));
  };

  const handleRemoveCategory = (catId) => {
    setSelectedCategories(selectedCategories.filter((id) => id !== catId));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <input
          type="text"
          className="title-input"
          placeholder="Tiêu đề"
          value={title}
          onChange={handleTitleChange}
        />
        {warning.title && <p className="warning">{warning.title}</p>}

        <ReactQuill
          value={content}
          onChange={handleContentChange}
          placeholder="Nội dung"
          theme="snow"
          className="content-input"
        />
        {warning.content && <p className="warning">{warning.content}</p>}

        <div className="modal-add">
          <label className="file-label">
            Tải ảnh bài viết
            <input
              type="file"
              className="file-input"
              onChange={handleImageUpload}
              disabled={loading}
            />
          </label>
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {imageUrl && (
            <div className="image-preview-container">
              <img src={imageUrl} alt="Preview" className="image-preview" />
              <FaTrash onClick={() => setImageUrl("")} />
            </div>
          )}
          {warning.image && <p className="warning">{warning.image}</p>}
        </div>

        <div className="category-container">
          {selectedCategories.length > 0 && <span>Thẻ đã chọn:</span>}
          <div className="selected-categories">
            {selectedCategories.map((catId) => {
              const category = categories.find((cat) => cat.id === catId);
              return (
                <span key={catId} className="selected-category">
                  <FaTimes
                    className="remove-category-icon"
                    color="red"
                    onClick={() => handleRemoveCategory(catId)}
                  />{" "}
                  {category?.title}
                </span>
              );
            })}
          </div>
          <span>Thẻ</span>
          <select
            className="category-select"
            value=""
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Chọn thẻ
            </option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
          {warning.category && <p className="warning">{warning.category}</p>}
        </div>

        <div className="modal-footer">
          <button className="share-btn" onClick={handlePost} disabled={loading}>
            {loading
              ? "Uploading..."
              : Object.keys(updatePostData).length > 0
              ? "Cập nhât"
              : "Đăng"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddPost;
