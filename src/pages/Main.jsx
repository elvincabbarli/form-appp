// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';

const Main = () => {

  const [allPosts, setAllPosts] = useState([]);

  // const { token } = useSelector((state) => state.login);

  // const myToken = token;

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Function to fetch posts
  const fetchAllPosts = async () => {
    try {
      const response = await fetch("https://fast-quora.onrender.com/posts", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setAllPosts(data); // Update state with fetched posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  return (
    <div className='main-cont'>
      <h2>All Posts</h2>
      <div>
        <ul className="main-posts">
          {allPosts.map((post, index) => (
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
  )
}

export default Main