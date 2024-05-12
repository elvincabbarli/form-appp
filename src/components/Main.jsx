import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { GetAxios } from "../utils/getAxios";
import { getTimeElapsed } from "../utils/time";
import TruncatedPost from "./TruncatedPost";
import like from "../assets/heart.png";
import like2 from "../assets/like2.png";
import send from "../assets/send.png";
import comment from "../assets/comment.png";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const { token } = useSelector((state) => state.login);
  const { isLoggedIn } = useSelector((state) => state.login);
  const [liked, setLiked] = useState();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://195.35.56.202:8080/search?key=${searchTerm}`
      );
      if (response.status === 200) {
        setPosts(response.data);
      } else if (response.status === 404) {
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      (async function getMyInteresPosts() {
        try {
          const { data } = await GetAxios(
            "http://195.35.56.202:8080/post",
            token
          );
          setPosts(data);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      (async function getAllPosts() {
        try {
          const response = await axios.get(
            "http://195.35.56.202:8080/popular",
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const { data } = response;
          setPosts(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [isLoggedIn, token, liked]);

  console.log(posts);

  return (
    <div>
      <h2 style={{ marginBottom: "15px" }}>Bütün Postlar</h2>
      <div className="search-container">
        <form
          style={{ marginBottom: "15px" }}
          className="search-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Post Axtar..."
            className="search-input"
          />
          <button type="submit" className="upload-pic">
            Axtar
          </button>
        </form>
        <div className="main-posts">
          {posts.map((result, index) => (
            <li className="main-page-posts" key={index}>
              <div className="post-head">
              <img src={`http://195.35.56.202:9090/user/picture/${result.user_id}`} alt="" />
                <Link to={`user/${result.user_id}`}>
                  <b>@{result.username}</b>
                </Link>
                <p>{getTimeElapsed(result.cdate)}</p>
              </div>
              <hr />
              <Link to={`/post/${result.id}`}>
                <div className="post-body">
                  <h3>{result.heading}</h3>
                  <TruncatedPost content={result.content} />
                </div>
              </Link>

              <hr />
              <div className="post-footer">
                <p>
                  {result.likes}&nbsp;
                  <img style={{ width: "20px" }} src={like} alt="" />
                </p>
                <i style={{ textTransform: "capitalize" }}>
                  {result.category_name}
                </i>
              </div>
              <hr />
              <div className="action-btns">
                {result?.is_user_liked === 0 ? (
                  <Link onClick={() => handleAddLike(result.id)}>
                    <img  style={{width: '20px'}}  src={like2} alt="" />
                  </Link>
                ) : null}
                <Link to={`/post/${result.id}`}>
                  <img src={comment} alt="" />
                </Link>
                <Link>
                  <img style={{width: '20px'}} src={send} alt="" />
                </Link>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
