/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSuccess } from "../store/postSlice";
import axios from "axios";
import { GetAxios } from "../utils/getAxios";

const MyPosts = () => {
  const { personalPosts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.login);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await GetAxios('https://fast-quora.onrender.com/post', token)
        const { data } = response;
        dispatch(postSuccess(data))
        return data;

      } catch (error) {
        console.log(error);
        throw new Error(error.message); // Throw error properly
      }
    }

    fetchMyPosts()
  }, [])

  if (loading) {
    return (
      <>
        <h1>Yuklenir</h1>
      </>
    );
  }

  const handleDelete = async (postId) => {
    try {
      await axios.delete('https://fast-quora.onrender.com/post', {
        data: { post_id: postId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
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
            <li className="singlePost" key={index}>
              <h3>{post.heading}</h3>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <p>Category: {post.category_name}</p>

              <button
                onClick={() => handleDelete(post.id)}
                className="upload-pic"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPosts;
