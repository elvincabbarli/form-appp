import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { singlePostSuccess } from "../store/postSlice";
import axios from "axios";

const Post = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => state.login);
  const { singlePost } = useSelector((state) => state.post);
  const location = useLocation();
  const postId = location.pathname.slice(6);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `https://fast-quora.onrender.com/post/${postId}`
      );
      const postData = response.data;
      dispatch(singlePostSuccess(postData));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post data:", error);
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://fast-quora.onrender.com/post/${postId}/comment`
      );
      const commentsData = response.data;
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [postId, dispatch]);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleAddLike = async () => {
    try {
      await axios.post(
        "https://fast-quora.onrender.com/like/post",
        { post_id: postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchPostData();
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      await axios.post(
        "https://fast-quora.onrender.com/comment",
        { post_id: postId, content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchComments();
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await axios.post(
        "https://fast-quora.onrender.com/like/comment",
        { comment_id: commentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchComments();
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return loading ? (
    <h1>Loading....</h1>
  ) : (
    <div>
      <b>Owner: </b>
      <span>{singlePost?.post?.username}</span>
      <h1>{singlePost?.post?.heading}</h1>
      <b>Kateqoriya:</b> <span>{singlePost?.post?.category_name}</span> <br />
      <b>Yaradılma Tarixi:</b> <span>{singlePost?.post?.cdate}</span>
      <p>{singlePost?.post?.content}</p>
      <br />
      {isLoggedIn ? <button onClick={handleAddLike}>Like</button> : null}
      &nbsp;&nbsp;&nbsp;
      <b>Like: </b>
      <span>{singlePost?.post?.likes}</span>
      <br />
      <br />
      <div className="post-comment">
        {isLoggedIn ? (
          <>
            <label htmlFor="text">Add Comment</label> <br />
            <textarea
              name="text"
              id="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button onClick={handleAddComment}>Add Comment</button>
          </>
        ) : (
          <Link to="/signin">
            <button>Add Comment</button>
          </Link>
        )}
      </div>
      <br />
      <br />
      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment) => (
            <div className="main-page-posts" key={comment.id}>
              <li>{comment.content}</li>
              <li>Like: {comment.likes}</li>
              {isLoggedIn ? (
                <button onClick={() => handleLikeComment(comment.id)}>
                  Like Comment
                </button>
              ) : null}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Post;
