import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getTimeElapsed } from "../utils/time";

const Popular = () => {
  const [allPosts,setAllPosts] = useState([]);

  useEffect(() => {
    (async function getAllPosts(){
      try {
        const response = await axios.get("http://195.35.56.202:8080/posts", {
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
                  <span>Owner: <b>{post.username}</b></span>
                  <h3>{post.heading}</h3>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  <p>Tarix: {getTimeElapsed(post.cdate)}</p>{" "}
                  <p>Category: {post.category_name}</p>
                  <p>Like: {post.likes}</p>
                  <div className="action-btns">
                    <button>
                      <Link to={`/post/${post.id}`}>Yorum</Link>
                    </button>
                    <button>Bəyən</button>
                    <button>Paylaş</button>
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
