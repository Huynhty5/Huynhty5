import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import {
  faComment,
  faHeart,
  faNewspaper,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchAllPostEachUser } from "../reducers/apiPost";

const PersonalBlog = ({ setActiveModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.apiUser.user);
  const postsEachUser = useSelector((state) => state.apiPost.postsEachUser);
  const postLiked = useSelector((state) => state.apiLike.postLiked);
  const topRef = useRef(null);
  const [author, setAuthor] = useState(postsEachUser?.[0]?.author || null);

  useEffect(() => {
    // if (topRef.current) {
    //   topRef.current.scrollIntoView({ behavior: "smooth" });
    // }
    setAuthor(postsEachUser?.[0]?.author);
  }, [postsEachUser]);

  useEffect(() => {
    if (postsEachUser) dispatch(fetchAllPostEachUser(author?.id));
  }, [postLiked]);

  // Calculate totals for blogs, likes, and comments
  const totals = postsEachUser.reduce(
    (acc, post) => {
      acc.blogs += 1;
      acc.likes += post.likes.length;
      acc.comments += post.comments.length;
      return acc;
    },
    { blogs: 0, likes: 0, comments: 0 }
  );

  return (
    <div className="personal-blog" ref={topRef}>
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-background">
          <img
            src="https://wallpapers.com/images/hd/view-background-z8acopobqad4uunx.jpg"
            alt="Background"
            className="background-img"
          />
        </div>
        <div className="profile-info">
          <div className="profile-picture">
            <img
              src={author?.avatar || "/user.png"}
              alt="Profile"
              className="profile-img"
            />
          </div>
          <h2 className="username">
            {author?.username || user?.username || "Unknown User"}
          </h2>
          <p className="user-handle">
            {author?.email || user?.email || "Unknown Email"}
          </p>
        </div>
        <div className="statistical">
          <span>
            <FontAwesomeIcon icon={faNewspaper} /> {totals.blogs} blog
          </span>
          <span>
            <FontAwesomeIcon icon={faHeart} /> {totals.likes} thích
          </span>
          <span>
            <FontAwesomeIcon icon={faComment} /> {totals.comments} bình luận
          </span>
        </div>
      </div>
      {postsEachUser
        ?.slice()
        ?.sort((a, b) => b.id - a.id)
        .map((post, index) => (
          <Post key={index} post={post} setActiveModal={setActiveModal} />
        ))}
    </div>
  );
};

export default PersonalBlog;
