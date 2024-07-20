import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { singlePostSuccess } from "../store/postSlice";
import axios from "axios";
import { getTimeElapsed } from "../utils/time";
import like from "../assets/heart.png";
import Slider from "react-slick";

const Post = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => state.login);
  const { singlePost } = useSelector((state) => state.post);
  const location = useLocation();
  const postId = location.pathname.slice(6);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  // const [socket, setSocket] = useState(null);



  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `http://195.35.56.202:8080/post/${postId}`,
        isLoggedIn ? { headers: { Authorization: `Bearer ${token}` } } : null
      );
      const postData = response.data;
      dispatch(singlePostSuccess(postData));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [postId, dispatch]);

  const handleAddLike = async () => {
    try {
      await axios.post(
        "http://195.35.56.202:8080/like/post",
        { post_id: postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchPostData();
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    accessibility: false,
    focusOnSelect: false,
    focusOnChange: false,
    center: true,
  };

  const handleAddComment = async () => {
    if (!commentText) {
      setCommentError("Zəhmət olmasa koment əlavə edin.."); // Set error message if comment is empty
      return;
    }
    try {
      await axios.post(
        "http://195.35.56.202:8080/comment",
        { post_id: postId, content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchPostData();
      setCommentText("");
      setCommentError(""); // Clear error message if comment is successfully added
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await axios.post(
        "http://195.35.56.202:8080/like/comment",
        { comment_id: commentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchPostData();
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return loading ? (
    <h1>Loading....</h1>
  ) : (
    <>
      <div className="main-page-posts">
        <div className="post-head">
          <Link to={`/user/${singlePost?.post?.user_id}`}>
            <div>
              <img
                className="user-pic"
                src={`http://195.35.56.202:8080/${singlePost?.post?.picture}`}
                alt=""
              />
              &nbsp;
              <b>@{singlePost?.post?.username}</b>
            </div>
          </Link>
          <p>{getTimeElapsed(singlePost?.post?.cdate)}</p>
        </div>
        <hr />
        <div className="post-body">
          <h1>{singlePost?.post?.heading}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: singlePost?.post?.content }}
          />
        </div>
        <div className="post-images">
          {singlePost?.post?.images && (
            <Slider {...sliderSettings}>
              {singlePost?.post?.images.split(", ").map((image, idx) => (
                <div key={idx}>
                  <img
                    className="post-image"
                    src={`http://195.35.56.202:8080/${image}`}
                    alt={`Post image ${idx + 1}`}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
        <hr />
        <div className="post-footer">
          <div className="like-sec">
            {singlePost?.post?.is_user_liked === 0 ? (
              <button className="upload-pic" onClick={handleAddLike}>
                Like
              </button>
            ) : null}
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <b>{singlePost?.post?.likes}</b>
              <img style={{ width: "20px" }} src={like} alt="" />
            </div>
          </div>
          <b>
            <Link
              to={`/category/${singlePost?.post?.category_id}`}
              className="category-link"
            >
              {singlePost?.post?.category_name}
            </Link>
          </b>
        </div>

        <div className="post-comment">
          {isLoggedIn ? (
            <>
              <label htmlFor="text">Add Comment</label> <br />
              <textarea
                name="text"
                id="text"
                value={commentText}
                required
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              {commentError && <p style={{ color: "red" }}>{commentError}</p>}{" "}
              {/* Display error message */}
              <button className="upload-pic" onClick={handleAddComment}>
                Add Comment
              </button>
            </>
          ) : (
            <Link to="/signin">
              <button className="upload-pic">Add Comment</button>
            </Link>
          )}
        </div>
      </div>

      <br />
      <br />
      <div>
        <h2>Comments</h2>
        <ul>
          {singlePost?.comments?.map((comment) => (
            <div className="main-page-posts" key={comment.id}>
              <div className="post-head">
                <div>
                  <img
                    className="user-pic"
                    src={`http://195.35.56.202:8080/${comment.picture}`}
                    alt=""
                  />
                  &nbsp;
                  <Link to={`/user/${comment.user_id}`}>
                    {comment.username}
                  </Link>
                </div>
                <div>
                  <p>{getTimeElapsed(comment?.cdate)}</p>
                </div>
              </div>
              <hr />
              <div className="post-body">
                <li>{comment.content}</li>
              </div>
              <hr />
              <div className="post-footer">
                {comment?.is_user_liked === 0 ? (
                  <button
                    className="upload-pic"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    Like
                  </button>
                ) : null}
                <p>
                  {comment.likes}&nbsp;
                  <img style={{ width: "20px" }} src={like} alt="" />
                </p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Post;
