import { useEffect, useState } from "react";
import { GetAxios } from "../utils/getAxios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import notif from "../assets/notification.png";

const Notifications = () => {
  const [userNotify, setUserNotify] = useState([]);
  const { token } = useSelector((state) => state.login);
  const fetchPersonalNotifications = async () => {
    try {
      const response = await GetAxios(
        "http://195.35.56.202:8080/notifications",
        token
      );
      setUserNotify(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPersonalNotifications();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {userNotify.map((notification) => {
          // Parse the data field
          const dataObj = JSON.parse(notification.data);
          return (
            <li key={notification.id}>
              {notification.type === "add_comment" && (
                <div className="main-page-posts">
                  <img style={{ width: "32px" }} src={notif} alt="" />&nbsp;&nbsp;&nbsp;
                  <span>
                    <Link
                      style={{ color: "blue" }}
                      to={`/user/${dataObj.commenter}`}
                    >
                      {dataObj.commenter_name}
                    </Link>&nbsp;&nbsp;&nbsp;
                    commented on&nbsp;&nbsp;&nbsp;
                    <Link
                      style={{ color: "blue" }}
                      to={`/post/${dataObj.post_id}`}
                    >
                      {dataObj.post_title}
                    </Link>
                  </span>
                </div>
              )}
              {notification.type === "like_post" && (
                <div className="main-page-posts">
                  <img style={{ width: "32px" }} src={notif} alt="" />&nbsp;&nbsp;&nbsp;
                  <span>
                    <Link
                      style={{ color: "blue" }}
                      to={`/user/${dataObj.liker}`}
                    >
                      {dataObj.liker_name}
                    </Link> &nbsp;&nbsp;
                    liked post &nbsp;&nbsp;&nbsp;
                    <Link
                      style={{ color: "blue" }}
                      to={`/post/${dataObj.post_id}`}
                    >
                      {dataObj.post_title}
                    </Link>
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notifications;
