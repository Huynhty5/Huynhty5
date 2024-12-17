import React, { useState, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { formatDate } from "../handleLogic";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../reducers/apiComment";
import { faEllipsisVertical, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchAllPostEachUser } from "../reducers/apiPost";
import { saveTab } from "../reducers/showTab";

const Comment = ({
  comment,
  user,
  comments,
  setCommentReply,
  onEdit,
  setIsUpdate,
  onDelete,
  level = 0,
  scrollToInput,
}) => {
  const dispatch = useDispatch();
  const [showActions, setShowActions] = useState(false);

  const replies = comments.filter((c) => c.comment_id === comment.id);

  return (
    <div className={`comment level-${level}`}>
      <div className="comment-container">
        <img
          src={comment.user.avatar || "/user.png"}
          alt="User Avatar"
          className="avatar"
        />
        <div className="comment-content">
          <div>
            <span className="username">{comment.user.username}</span>{" "}
            <span
              className="follow-btn"
              onClick={() => {
                setTimeout(() => {
                  dispatch(fetchAllPostEachUser(comment.user.id));
                }, 200);
                dispatch(saveTab("personal-blog"));
              }}
            >
              Xem
            </span>
          </div>
          <span className="comment-time">{formatDate(comment.create_at)}</span>
          <p className="text">{comment.content}</p>
        </div>
        <div className="comment-action">
          <FontAwesomeIcon
            icon={faReply}
            onClick={() => {
              setCommentReply(comment);
              scrollToInput();
            }}
          />
          {user && user.id === comment.user_id && (
            <div className="action-menu">
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                onClick={() => setShowActions((prev) => !prev)}
                style={{ cursor: "pointer" }}
              />
              {showActions && (
                <div className="dropdown-menu">
                  <span
                    onClick={() => {
                      onEdit(comment);
                      setIsUpdate({ is: true, comment });
                      setShowActions(false);
                    }}
                  >
                    Sửa
                  </span>
                  <span onClick={() => onDelete(comment.id)}>Xóa</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          user={user}
          comments={comments}
          setCommentReply={setCommentReply}
          onEdit={onEdit}
          setIsUpdate={setIsUpdate}
          onDelete={onDelete}
          level={level + 1}
          scrollToInput={scrollToInput}
        />
      ))}
    </div>
  );
};

const CommentSection = ({ comments, postId, setActiveModal, userIdOther }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.apiUser.user);
  const [contentComment, setContentComment] = useState("");
  const [commentReply, setCommentReply] = useState(null);
  const [error, setError] = useState("");
  const [isUpdate, setIsUpdate] = useState({ is: false, comment: null });

  const replyInputRef = useRef(null);

  const handleDispatchComment = () => {
    if (!user) {
      setActiveModal("login");
      return;
    }
    if (contentComment.trim() === "") {
      setError("Bình luận không để trống !");
      return;
    }

    if (isUpdate.is) {
      dispatch(
        updateComment({
          id: isUpdate.comment.id,
          content: contentComment,
          userIdOther,
        })
      );
      setIsUpdate({ is: false, comment: null });
    } else {
      const obj = {
        userId: user.id,
        commentId: commentReply ? commentReply.id : null,
        postId,
        content: contentComment,
        userIdOther,
      };
      dispatch(addComment(obj));
      setCommentReply(null);
    }

    setContentComment("");
    setError("");
  };

  const handleEditComment = (comment) => {
    scrollToInput();
    setContentComment(comment.content);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ id: commentId, userIdOther }));
  };

  const scrollToInput = () => {
    if (replyInputRef.current) {
      replyInputRef.current.scrollIntoView({ behavior: "smooth" });
      replyInputRef.current.focus();
    }
  };

  return (
    <div className="comment-section">
      {comments
        .filter((comment) => !comment.comment_id)
        .map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            user={user}
            comments={comments}
            setCommentReply={setCommentReply}
            onEdit={handleEditComment}
            setIsUpdate={setIsUpdate}
            isUpdate={isUpdate}
            onDelete={handleDeleteComment}
            scrollToInput={scrollToInput}
          />
        ))}

      <div className="reply-input">
        <input
          ref={replyInputRef}
          type="text"
          placeholder={
            commentReply
              ? `Trả lời ${commentReply.user.username}...`
              : "Bình luận blog này"
          }
          value={contentComment}
          onChange={(e) => {
            setContentComment(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleDispatchComment(); // Call the function when Enter is pressed
            }
          }}
        />
        <FaPaperPlane
          className="send-btn"
          onClick={handleDispatchComment}
          style={{ cursor: contentComment.trim() ? "pointer" : "not-allowed" }}
          color={contentComment.trim() ? "#00b4d8" : "#888"}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CommentSection;
