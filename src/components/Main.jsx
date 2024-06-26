import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { GetAxios } from "../utils/getAxios";
import { getTimeElapsed } from "../utils/time";
import TruncatedPost from "./TruncatedPost";
import Slider from "react-slick";
import like from "../assets/heart.png";
import like2 from "../assets/like2.png";
import send from "../assets/send.png";
import comment from "../assets/comment.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      setLiked(!liked);
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    accessibility: false,
    focusOnSelect: false,
    focusOnChange: false,
    center: true,
  };

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
                <div>
                  <img
                    className="user-pic"
                    src={`http://195.35.56.202:8080/${result.picture}`}
                    alt=""
                  />
                  &nbsp;
                  <Link to={`user/${result.user_id}`}>
                    <b>@{result.username}</b>
                  </Link>
                </div>
                <p>{getTimeElapsed(result.cdate)}</p>
              </div>
              <hr />

              <div className="post-body">
                <Link to={`/post/${result.id}`}>
                  <h3>{result.heading}</h3>
                  <TruncatedPost content={result.content} />
                </Link>
                <div className="post-images">
                  {result.images && (
                    <Slider {...sliderSettings}>
                      {result.images.split(", ").map((image, idx) => (
                        <div key={idx}>
                          <img
                            className="post-image"
                            src={`http://195.35.56.202:8080/${image}`}
                            alt={`Post image ${idx + 1}`}
                          />
                        </div>
                      ))}
                    </Slider>
                  )}
                </div>
              </div>

              <hr />
              <div className="post-footer">
                <p>
                  {result.likes}&nbsp;
                  <img style={{ width: "20px" }} src={like} alt="" />
                </p>
                <b>
                  <Link
                    to={`/category/${result.category_id}`}
                    className="category-link"
                  >
                    {result.category_name}
                  </Link>
                </b>
              </div>
              <hr />
              <div className="action-btns">
                {result?.is_user_liked === 0 ? (
                  <Link onClick={() => handleAddLike(result.id)}>
                    <img style={{ width: "20px" }} src={like2} alt="" />
                  </Link>
                ) : null}
                <Link to={`/post/${result.id}`}>
                  <b className="comment-number">
                    {result.comment_count} <img src={comment} alt="" />
                  </b>
                </Link>
                <Link>
                  <img style={{ width: "20px" }} src={send} alt="" />
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
