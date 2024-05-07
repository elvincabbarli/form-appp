import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../store/postSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const Main = () => {
  const dispatch = useDispatch();
  const { postsAll } = useSelector((state) => state.post);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchResults([])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://fast-quora.onrender.com/search?key=${searchTerm}`);
      setSearchResults(response.data); // Assuming the response is an array of search results
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllPosts());
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
          {searchResults.map((result, index) => (
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
      <div>
        <ul className="main-posts">
          {
            searchResults.length > 0 ? null : postsAll.map((post, index) => (
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

export default Main;
