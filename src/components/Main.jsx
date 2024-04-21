import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../store/postSlice";
import { Link } from "react-router-dom";

const Main = () => {
  const dispatch = useDispatch();
  const { postsAll } = useSelector((state) => state.post);
  const { isLoggedIn } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <div className="main-cont">
      <h2>All Posts</h2>
      <div>
        <ul className="main-posts">
          {postsAll.map((post, index) => (
            <li className="main-page-posts" key={index}>
              <h3>{post.heading}</h3>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <p>Category: {post.category_name}</p>
              <div className="action-btns">
                <button>
                  <Link to={isLoggedIn ? `/post/${post.id}` : "/signin"}>
                    Comment
                  </Link>
                </button>
                <button>Like</button>
                <button>Share</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
