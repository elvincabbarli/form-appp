import { Link, Outlet, useLocation } from "react-router-dom";

function Tabs() {
  const location = useLocation();

  // Function to determine if a link is active
  const isActiveLink = (link) => {
    return link === location.pathname ? "active" : "";
  };

  return (
    <div className="top-container">
      <div className="side-links">
        <Link
          to="/profile/personal"
          className={isActiveLink("/profile/personal")}
        >
          Məlumatlarım
        </Link>
        <Link
          to="/profile/myinterests"
          className={isActiveLink("/profile/myinterests")}
        >
          Maraq Sahələri
        </Link>
        <Link
          to="/profile/notifications"
          className={isActiveLink("/profile/notifications")}
        >
          Bildirimlər
        </Link>
        <Link
          to="/profile/addpost"
          className={isActiveLink("/profile/addpost")}
        >
          Post Paylaş
        </Link>
        <Link
          to="/profile/myposts"
          className={isActiveLink("/profile/myposts")}
        >
          Postların
        </Link>
        <Link
          to="/profile/followers"
          className={isActiveLink("/profile/followers")}
        >
          Takipçilər
        </Link>
      </div>
      <div className="side-cont">
        <Outlet />
      </div>
    </div>
  );
}

export default Tabs;
