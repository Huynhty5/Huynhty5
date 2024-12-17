import React, { useState, useEffect, useRef } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import PersonalBlog from "./PersonalBlog";
import AccoutSetting from "./AccoutSetting";
import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchAllPost } from "../reducers/apiPost";
import { setSearch } from "../reducers/search";

const MainContent = ({ setSidebarVisible, setActiveModal }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("forYou");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = useSelector((state) => state.apiCategory.categories);
  const posts = useSelector((state) => state.apiPost.posts);
  const showTab = useSelector((state) => state.showTab.showTab);
  const postLiked = useSelector((state) => state.apiLike.postLiked);
  const search = useSelector((state) => state.search.search);

  useEffect(() => {
    dispatch(fetchAllPost());
  }, [postLiked]);

  // Ref for MainContent scrollable div
  const mainContentRef = useRef(null);

  // Filter posts based on search term and selected category
  const filteredPosts = posts
    ?.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (post) =>
        !selectedCategory ||
        post.categories?.some((cat) => cat.id == selectedCategory)
    );

  // Filter only liked posts that match the search term and selected category
  const filteredLikedPosts = filteredPosts?.filter((post) =>
    postLiked?.some((likedPost) => likedPost.post_id === post.id)
  );

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Scroll to top using ref
  const scrollToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Track scroll position within MainContent to toggle "scroll to top" button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current.scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    const mainContentElement = mainContentRef.current;
    mainContentElement.addEventListener("scroll", handleScroll);

    return () => mainContentElement.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="main-content"
      onClick={() => setSidebarVisible(false)}
      ref={mainContentRef}
    >
      {showTab === "home" && (
        <>
          <div className="header-intro-question">
            <span>Hôm nay bạn thế nào? hãy viết một blog nhé!</span>
          </div>
          <div className="tabs">
            <DropdownButton
              id="dropdown-basic-button"
              title={
                selectedCategory
                  ? categories.find((cat) => cat.id == selectedCategory)?.title
                  : "Thẻ"
              }
              className="dropdown-custom-width"
              onSelect={(eventKey) => handleCategorySelect(eventKey)}
            >
              <Dropdown.Item onClick={() => setSelectedCategory("")}>
                Tất cả
              </Dropdown.Item>
              {categories?.length > 0 &&
                categories.map((tag) => (
                  <Dropdown.Item key={tag.id} eventKey={tag.id}>
                    {tag.title}
                  </Dropdown.Item>
                ))}
            </DropdownButton>

            <button
              className={`tab ${activeTab === "forYou" ? "active" : ""}`}
              onClick={() => setActiveTab("forYou")}
            >
              Khám phá
            </button>
            <button
              className={`tab ${activeTab === "liked" ? "active" : ""}`}
              onClick={() => setActiveTab("liked")}
            >
              Blog đã thích
            </button>
          </div>
          <div className="content">
            {activeTab === "forYou" && (
              <div>
                {filteredPosts && filteredPosts.length > 0 ? (
                  filteredPosts
                    .sort((a, b) => b.id - a.id)
                    .map((post, index) => (
                      <Post
                        key={index}
                        post={post}
                        setActiveModal={setActiveModal}
                      />
                    ))
                ) : (
                  <p style={{ color: "#e67a00" }}>
                    Blog bạn tìm không tồn tại !
                  </p>
                )}
              </div>
            )}
            {activeTab === "liked" && (
              <div>
                {filteredLikedPosts && filteredLikedPosts.length > 0 ? (
                  filteredLikedPosts
                    .sort((a, b) => b.id - a.id)
                    .map((post, index) => (
                      <Post
                        key={index}
                        post={post}
                        setActiveModal={setActiveModal}
                      />
                    ))
                ) : (
                  <p style={{ color: "#e67a00" }}>Chưa có blog nào !</p>
                )}
              </div>
            )}
            {/* Scroll to Top Button */}
            {showScrollTop && (
              <div className="scroll-top" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faCircleChevronUp} />
              </div>
            )}
          </div>
        </>
      )}

      {showTab === "account" && <AccoutSetting />}
      {showTab === "personal-blog" && (
        <PersonalBlog setActiveModal={setActiveModal} />
      )}
    </div>
  );
};

export default MainContent;
