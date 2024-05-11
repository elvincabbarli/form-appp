/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSuccess } from "../store/postSlice";
import axios from "axios";
import { GetAxios } from "../utils/getAxios";
import { Link } from "react-router-dom";
import { getTimeElapsed } from "../utils/time";

const MyPosts = () => {
  const { personalPosts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await GetAxios(
          "http://195.35.56.202:8080/user-post",
          token
        );
        const { data } = response;
        dispatch(postSuccess(data));
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error.message); // Throw error properly
      }
    };

    fetchMyPosts();
  }, []);

  if (loading) {
    return (
      <>
        <h1>Yuklenir</h1>
      </>
    );
  }

  const handleDelete = async (postId) => {
    try {
      await axios.delete("http://195.35.56.202:8080/post", {
        data: { post_id: postId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Filter the personalPosts array to remove the deleted post
      const updatedPosts = personalPosts.filter((post) => post.id !== postId);

      // Dispatch an action to update the state with the filtered array
      dispatch(postSuccess(updatedPosts));
    } catch (error) {
      console.log(error); // Handle error properly
    }
  };

  return (
    <div>
      <h2>My Posts</h2>
      <div>
        <ul className="posts">
          {personalPosts?.map((post, index) => (
            <li className="main-page-posts" key={index}>
              <div className="post-head">
                <p>{getTimeElapsed(post.cdate)}</p>
              </div>
              <hr />
              <Link to={`/post/${post.id}`}>
                <div className="post-body">
                  <h3>{post.heading}</h3>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </Link>
              <hr />
              <div className="post-footer">
                <p>{post.likes}👍</p>
                <i style={{ textTransform: "capitalize" }}>
                  {post.category_name}
                </i>
              </div>
              <div className="actions-btns">
                <button
                  onClick={() => handleDelete(post.id)}
                  className="upload-pic"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPosts;
