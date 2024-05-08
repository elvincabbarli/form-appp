import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { GetAxios } from "../utils/getAxios";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const { token } = useSelector((state) => state.login);

  const { isLoggedIn } = useSelector((state) => state.login);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://fast-quora.onrender.com/search?key=${searchTerm}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    if(isLoggedIn) {
      (async function getMyInteresPosts() {
        try{
          const { data } = await GetAxios("https://fast-quora.onrender.com/post", token);
          setPosts(data);
        } catch (error) {
          console.log(error);
        }
      })()
    }else{
      (async function getAllPosts(){
          try {
            const response = await axios.get("https://fast-quora.onrender.com/posts", {
              headers: {
                'Content-Type': 'application/json'
              }
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
      <h2>All Posts</h2>
      <div className="search-container">
        <form className='search-form' onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Post Axtar..."
            className="search-input"
          />
          <button type="submit" className="search-button">Axtar</button>
        </form>
        <div className="main-posts">
          {posts.map((result, index) => (
            <Link className="main-page-posts" key={result.id} to={`/post/${result.id}`}>
              <li key={index}>
                <h3>{result.heading}</h3>
                <div dangerouslySetInnerHTML={{ __html: result.content }} />
                <p>Category: {result.category_name}</p>
                <div className="action-btns">
                  <button>
                    <Link to={`/post/${result.id}`}>Comment</Link>
                  </button>
                  <button>Like</button>
                  <button>Share</button>
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
