import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPersonalPosts } from "../store/postSlice";

const MyPosts = () => {
  const { personalPosts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPersonalPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <h1>Yuklenir</h1>
      </>
    );
  }

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
    // Update the local state (remove the deleted post)
    // You can do this by filtering out the post with the matching ID
    // Example:
    // setPersonalPosts(personalPosts.filter((post) => post.id !== postId));
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

              <button onClick={() => handleDelete(post.post_id)} className="upload-pic">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPosts;
