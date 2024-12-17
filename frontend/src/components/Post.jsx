import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import CommentSection from "./CommentSection";
import { formatDate } from "../handleLogic";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchAllPostEachUser } from "../reducers/apiPost";
import { saveTab } from "../reducers/showTab";
import { likePost, unlikePost } from "../reducers/apiLike";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { setUpdatePost } from "../reducers/updatePost";
// Import DOMPurify if needed
import DOMPurify from "dompurify";

const Post = ({ post, setActiveModal }) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const user = useSelector((state) => state.apiUser.user);
  const postLiked = useSelector((state) => state.apiLike.postLiked);
  const showTab = useSelector((state) => state.showTab.showTab);

  // Check if the post is liked by the current user
  const isLiked = postLiked.some((likedPost) => likedPost.post_id === post.id);

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleLikepost = (id) => {
    const obj = {
      userId: user.id,
      postId: id,
    };

    if (isLiked) {
      dispatch(unlikePost(obj));
    } else {
      dispatch(likePost(obj));
    }
  };

  return (
    <div className="post">
      {/* Post Header */}
      <div className="post-header">
        <div className="left">
          <img
            src={post.author.avatar || "/user.png"}
            alt="User Avatar"
            className="avatar"
          />
          <div className="user-info">
            <div>
              <span className="username">{post.author.username}</span>
              {showTab !== "personal-blog" && (
                <span
                  className="follow-btn"
                  onClick={() => {
                    setTimeout(() => {
                      dispatch(fetchAllPostEachUser(post?.author?.id));
                    }, 200);
                    dispatch(saveTab("personal-blog"));
                  }}
                >
                  Xem
                </span>
              )}
            </div>
            <span className="post-time">{formatDate(post.create_at)}</span>
          </div>
        </div>
        {user != null && (
          <div className="right">
            {user?.id === post?.author?.id && (
              <div className="action-menu">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => setShowActions((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                />
                {showActions && (
                  <div className="dropdown-menu">
                    <span
                      onClick={() => {
                        dispatch(setUpdatePost(post));
                        setActiveModal("addPost");
                        setShowActions(false);
                      }}
                    >
                      Sửa
                    </span>
                    <span
                      onClick={() => {
                        dispatch(deletePost(post.id));
                        setShowActions(false);
                      }}
                    >
                      Xóa
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Image */}
      {post?.hash_img && (
        <div className="post-image">
          <img src={post.hash_img} alt="Post content" />
        </div>
      )}

      {/* Post Caption */}
      <div className="post-caption">
        <h4>{post.title}</h4>
        {/* Render HTML content safely using dangerouslySetInnerHTML */}
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        />
        <div className="hashtags">
          {post?.categories?.map((category) => (
            <span key={category.id}>#{category.title}</span>
          ))}
        </div>
      </div>

      {/* Post Footer */}
      <div className="post-footer">
        <div className="post-actions">
          <div>
            <FaHeart
              className="icon"
              color={isLiked && "#e67a00"}
              onClick={() => {
                if (user == null) setActiveModal("login");
                else handleLikepost(post.id);
              }}
            />{" "}
            {post.likes.length}
          </div>
          <div onClick={toggleComments} style={{ cursor: "pointer" }}>
            <FaComment className="icon" /> {post?.comments?.length || 0}
          </div>
        </div>
      </div>

      {/* Show Comments Section */}
      {showComments && (
        <CommentSection
          comments={post.comments}
          postId={post.id}
          setActiveModal={setActiveModal}
          userIdOther={post.author.id}
        />
      )}
    </div>
  );
};

export default Post;
