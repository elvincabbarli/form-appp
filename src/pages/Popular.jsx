import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getTimeElapsed } from "../utils/time";
import { useSelector } from "react-redux";

const Popular = () => {
  const [allPosts, setAllPosts] = useState([]);
  const { token } = useSelector((state) => state.login);
  const [liked, setLiked] = useState();
  const handleAddLike = async (id) => {
    try {
      await axios.post(
        "http://195.35.56.202:8080/like/post",
        { post_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLiked(true);
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  useEffect(() => {
    (async function getAllPosts() {
      try {
        const response = await axios.get("http://195.35.56.202:8080/popular", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = response;
        setAllPosts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [liked, token]);

  return (
    <div>
      <h2>Popular</h2>
      <div>
        <ul className="main-posts">
          {allPosts.map((post, index) => (
            <li className="main-page-posts" key={index}>
              <div className="post-head">
                <Link>
                  <b>@{post.username}</b>
                </Link>
                <p>{getTimeElapsed(post.cdate)}</p>
              </div>{" "}
              <hr />
              <Link key={post.id} to={`/post/${post.id}`}>
                <div className="post-body">
                  <h3>{post.heading}</h3>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </Link>{" "}
              <hr />
              <div className="post-footer">
                <p>{post.likes} 👍</p>
                <i style={{ textTransform: "capitalize" }}>
                  {post.category_name}
                </i>
              </div>
              <hr />
              <div className="action-btns">
                <button>
                  <Link to={`/post/${post.id}`}>Yorum</Link>
                </button>
                {post?.is_user_liked === 0 ? (
                  <button onClick={() => handleAddLike(post.id)}>Bəyən</button>
                ) : null}

                <button>Paylaş</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popular;
