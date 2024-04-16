import { useSelector } from 'react-redux';
import { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } from './postSlice';

export const fetchPosts = () => async (dispatch) => {

  const { token } = useSelector((state) => state.login);
  dispatch(fetchPostsStart());
  try {
    const response = await fetch("https://fast-quora.onrender.com/post", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    dispatch(fetchPostsSuccess(data)); // Dispatch success action with fetched data
  } catch (error) {
    dispatch(fetchPostsFailure(error.message)); // Dispatch failure action with error message
  }
};