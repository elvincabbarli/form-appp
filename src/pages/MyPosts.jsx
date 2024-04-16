import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MyPosts = () => {
  // State to store the fetched posts
  const [posts, setPosts] = useState([]);

  const { token } = useSelector((state) => state.login);

  const myToken = token;

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, [myToken]);

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await fetch("https://fast-quora.onrender.com/post", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${myToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data); // Update state with fetched posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div>
      <h2>My Posts</h2>
      <div>
        <ul className="posts">
          {posts.map((post, index) => (
            <li className="singlePost" key={index}>
              <h3>{post.heading}</h3>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <p>Category: {post.category_name}</p>

              <button className="upload-pic">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPosts;
