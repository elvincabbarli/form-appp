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
          to="/layout/home"
          className={isActiveLink("/layout/home")}
        >
          Ana Səhifə
        </Link>
        <Link
          to="/layout/personal"
          className={isActiveLink("/layout/personal")}
        >
          Məlumatlarım
        </Link>
        <Link
          to="/layout/myinterests"
          className={isActiveLink("/layout/myinterests")}
        >
          Maraq Sahələri
        </Link>
        <Link
          to="/layout/notifications"
          className={isActiveLink("/layout/notifications")}
        >
          Bildirimlər
        </Link>
        <Link
          to="/layout/addpost"
          className={isActiveLink("/layout/addpost")}
        >
          Post Paylaş
        </Link>
        <Link
          to="/layout/myposts"
          className={isActiveLink("/layout/myposts")}
        >
          Postların
        </Link>
        <Link
          to="/layout/followers"
          className={isActiveLink("/layout/followers")}
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