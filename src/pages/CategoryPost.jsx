import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { GetAxios } from '../utils/getAxios';
import { getTimeElapsed } from '../utils/time';
import TruncatedPost from '../components/TruncatedPost';
import like from "../assets/heart.png";
import send from "../assets/send.png";
import comment from "../assets/comment.png";
import Slider from 'react-slick';
import axios from 'axios';


// eslint-disable-next-line react/prop-types
const CategoryPost = () => {
  const { post_id } = useParams();
  const [catPost, setCatPost] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.login);
  const { token } = useSelector((state) => state.login);

  useEffect(() => {
    if (isLoggedIn) {
      (async function getCategoryPosts() {
        try {
          const { data } = await GetAxios(
            `http://195.35.56.202:8080/post/category/${post_id}`,
            token
          );
          setCatPost(data);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      (async function getCategoryPosts() {
        try {
          const { data } = await axios.get(
            `http://195.35.56.202:8080/post/category/${post_id}`
          );
          setCatPost(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [isLoggedIn, post_id, token]);

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
    <div className="main-posts">
      {catPost?.map((result, index) => (
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
                style={{ textTransform: "capitalize" }}
              >
                {result.category_name}
              </Link>
            </b>
          </div>
          <hr />
          <div className="action-btns">
            <Link to={`/post/${result.id}`}>
              <b>{result.comment_count}</b> &nbsp;
              <img src={comment} alt="" />
            </Link>
            <Link>
              <img style={{ width: "20px" }} src={send} alt="" />
            </Link>
          </div>
        </li>
      ))}
    </div>
  );
};

export default CategoryPost;
