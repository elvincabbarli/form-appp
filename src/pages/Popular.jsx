import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getTimeElapsed } from "../utils/time";
import { useSelector } from "react-redux";
import TruncatedPost from "../components/TruncatedPost";
import like from "../assets/heart.png";
import like2 from "../assets/like2.png";
import send from "../assets/send.png";
import comment from "../assets/comment.png";

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
                <div>
                  {/* <img
                     className="user-pic"
                    src={`http://195.35.56.202:8080/upload/picture/${post.user_id}`}
                    alt=""
                  /> */}
                  &nbsp;
                  <Link to={`/user/${post.user_id}`}>
                    <b>@{post.username}</b>
                  </Link>
                </div>
                <p>{getTimeElapsed(post.cdate)}</p>
              </div>{" "}
              <hr />
              <Link key={post.id} to={`/post/${post.id}`}>
                <div className="post-body">
                  <h3>{post.heading}</h3>
                  <TruncatedPost content={post.content} />
                </div>
              </Link>{" "}
              <hr />
              <div className="post-footer">
                <p>
                  {post.likes}&nbsp;
                  <img style={{ width: "20px" }} src={like} alt="" />
                </p>
                <i style={{ textTransform: "capitalize" }}>
                  {post.category_name}
                </i>
              </div>
              <hr />
              <div className="action-btns">
                {post?.is_user_liked === 0 ? (
                  <Link onClick={() => handleAddLike(post.id)}>
                    {" "}
                    <img style={{ width: "20px" }} src={like2} alt="" />
                  </Link>
                ) : null}
                <Link to={`/post/${post.id}`}>
                  <img src={comment} alt="" />
                </Link>

                <Link>
                  <img style={{ width: "20px" }} src={send} alt="" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popular;
