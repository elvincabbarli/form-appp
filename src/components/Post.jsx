import { useEffect, useState } from "react";
import { GetAxios } from "../utils/getAxios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { singlePostSuccess } from "../store/postSlice";
import axios from "axios";

const Post = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);
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
        // Assuming the server responds with comments data
        const commentsData = response.data;
        // Set the comments state with the retrieved comments
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, token]);

  const addLike = async () => {
    try {
      // Send a request to the server to increment the like count
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
      // Assuming the server responds with updated post data including likes count
      const updatedPostData = response.data;
      // Dispatch an action to update the post state with the new data
      dispatch(singlePostSuccess(updatedPostData));
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const addComment = async () => {
    try {
      // Send a request to the server to add a comment
      const response = await axios.post(
        "https://fast-quora.onrender.com/comment/post",
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
      // Assuming the server responds with updated post data including comments
      const updatedPostData = response.data;
      // Dispatch an action to update the post state with the new data
      dispatch(singlePostSuccess(updatedPostData));
      // Clear the comment text after adding the comment
      setCommentText("");
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
      // Assuming the server responds with updated comment data including likes count
      const updatedCommentData = response.data;
      // Update the comments state with the updated comment data
      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? updatedCommentData : comment
      );
      setComments(updatedComments);
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
      <button onClick={addLike}>Like</button> &nbsp;&nbsp;&nbsp;
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
        <button onClick={addComment}>Add Comment</button>
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
