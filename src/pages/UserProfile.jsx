import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getTimeElapsed } from "../utils/time";
import TruncatedPost from "../components/TruncatedPost";

import like from "../assets/heart.png";
import Slider from "react-slick";

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
                <b>@{result.username}</b>
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
          </Link>

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
        </li>
      ))}
    </div>
  );
};

export default UserProfile;
