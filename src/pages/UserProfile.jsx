import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getTimeElapsed } from "../utils/time";
import TruncatedPost from "../components/TruncatedPost";

import like from "../assets/heart.png";

const UserProfile = () => {
  const { user_id } = useParams();
  const { token } = useSelector((state) => state.login);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `http://195.35.56.202:8080/users/${user_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = response.data;
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [user_id]);
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <div>
        <img
          className="user-pic"
          src={`http://195.35.56.202:8080/${userData.user.picture}`}
          alt=""
        />
        &nbsp;
        <b>@{userData.user.username}</b>
      </div>
      <br />
      <h3>Maraqlar</h3>
      <div className="interest-user">
        {userData.interests.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
      {userData?.posts.map((result, index) => (
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
            <div>
              <p>{getTimeElapsed(result.cdate)}</p>
            </div>
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
        </li>
      ))}
    </div>
  );
};

export default UserProfile;
