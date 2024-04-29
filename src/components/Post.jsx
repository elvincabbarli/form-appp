import { useEffect, useState } from "react";
import { GetAxios } from "../utils/getAxios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { singlePostSuccess } from "../store/postSlice";
import axios from "axios";

const Post = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => state.login);
  const { singlePost } = useSelector((state) => state.post);
  const location = useLocation();
  let postId = location.pathname.slice(6);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await GetAxios(
          `https://fast-quora.onrender.com/post/${postId}`,
          token
        );
        const { data } = response;
        dispatch(singlePostSuccess(data));
        setLoading(false);
        return data;
      } catch (error) {
        console.log(error);
        setLoading(false);
        throw new Error(error.message);
      }
    };

    fetchMyPosts();
  }, [postId, dispatch]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://fast-quora.onrender.com/post/${postId}/comment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const commentsData = response.data;
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, token]);

  const addLike = async () => {
    try {
      const response = await axios.post(
        "https://fast-quora.onrender.com/like/post",
        {
          post_id: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPostData = response.data;
      dispatch(singlePostSuccess(updatedPostData));
      window.location.reload();
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const addComment = async () => {
    try {
      // Send a request to the server to add a comment
      const response = await axios.post(
        "https://fast-quora.onrender.com/comment",
        {
          post_id: postId,
          content: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPostData = response.data;
      dispatch(singlePostSuccess(updatedPostData));
      setCommentText("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const likeComment = async (commentId) => {
    try {
      // Send a request to the server to like a comment
      const response = await axios.post(
        "https://fast-quora.onrender.com/like/comment",
        {
          comment_id: commentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedCommentData = response.data;
      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? updatedCommentData : comment
      );
      setComments(updatedComments);
      window.location.reload();
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
      {isLoggedIn ? (
        <button onClick={addLike}>Like</button>
      ) : (
        <Link to="/signin"></Link>
      )}&nbsp;&nbsp;&nbsp;
      <b>Like: </b>
      <span>{singlePost?.post?.likes}</span>
      <br />
      <br />
      <div className="post-comment">
        <label htmlFor="text">Add Comment</label> <br />
        <textarea
          name="text"
          id="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        {isLoggedIn ? (
          <button onClick={addComment}>Add Comment</button>
        ) : (
          <Link to="/signin"></Link>
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
              <li>{comment.likes}</li>
              <button onClick={() => likeComment(comment.id)}>
                Like Comment
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Post;
