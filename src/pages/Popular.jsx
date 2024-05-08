import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Popular = () => {
  const [allPosts,setAllPosts] = useState([]);

  useEffect(() => {
    (async function getAllPosts(){
      try {
        const response = await axios.get("https://fast-quora.onrender.com/posts", {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const { data } = response;
        setAllPosts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <h2>Popular</h2>
      <div>
        <ul className="main-posts">
          {
            allPosts.map((post, index) => (
              <Link className="main-page-posts" key={post.id} to={`/post/${post.id}`}>
                <li key={index}>
                  <h3>{post.heading}</h3>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  <p>Category: {post.category_name}</p>
                  <div className="action-btns">
                    <button>
                      <Link to={`/post/${post.id}`}>Comment</Link>
                    </button>
                    <button>Like</button>
                    <button>Share</button>
                  </div>
                </li>
              </Link>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Popular;
