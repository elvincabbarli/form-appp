import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../store/postSlice";
import { Link } from "react-router-dom";
import Search from "./Search";

const Main = () => {
  const dispatch = useDispatch();
  const { postsAll } = useSelector((state) => state.post);
  const { isLoggedIn } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <div>
      <h2>All Posts</h2>
      <Search />
      <div>
        <ul className="main-posts">
          {postsAll.map((post, index) => (
            <Link to={`/post/${post.id}`}>
              <li className="main-page-posts" key={index}>
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
