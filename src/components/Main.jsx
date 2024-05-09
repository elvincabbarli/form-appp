import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { GetAxios } from "../utils/getAxios";
import { getTimeElapsed } from "../utils/time";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const { token } = useSelector((state) => state.login);
  const { isLoggedIn } = useSelector((state) => state.login);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://195.35.56.202:8080/search?key=${searchTerm}`
      );
      setPosts(response.data);
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
          const response = await axios.get("http://195.35.56.202:8080/posts", {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const { data } = response;
          setPosts(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  return (
    <div>
      <h2 style={{marginBottom: '15px'}}>Bütün Postlar</h2>
      <div className="search-container">
        <form style={{marginBottom: '15px'}} className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Post Axtar..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Axtar
          </button>
        </form>
        <div className="main-posts">
          {posts.map((result, index) => (
            <Link
              className="main-page-posts"
              key={result.id}
              to={`/post/${result.id}`}
            >
              <li key={index}>
                <span>
                  Owner: <b>{result.username}</b>
                </span>
                <h3>{result.heading}</h3>
                <div dangerouslySetInnerHTML={{ __html: result.content }} />
                <p>Category: {result.category_name}</p>
                <p>Tarix: {getTimeElapsed(result.cdate)}</p>{" "}
                <p>Like: {result.likes}</p>
                {/* Display time elapsed */}
                <div className="action-btns">
                  <button>
                    <Link to={`/post/${result.id}`}>Yorum</Link>
                  </button>
                  <button>Bəyən</button>
                  <button>Paylaş</button>
                </div>
              </li>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
