import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

function Tabs() {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.login);
  const { showMobile } = useSelector((state) => state.post);



  // Function to determine if a link is active
  const isActiveLink = (link) => {
    // Check if the current pathname matches the link exactly or if it's a subpath
    return location.pathname === link || location.pathname.startsWith(link) ? "active" : "";
  };

  return (
    <div className="top-container">
      <div className={showMobile ? "side-links side-active" : "side-links"}>
        <Link to="/" className={isActiveLink("/")}>
          Ana Səhifə
        </Link>

        <Link to="/popular" className={isActiveLink("/popular")}>
          Populyar
        </Link>
        {
          isLoggedIn &&
          <>
            <Link to="/layout/personal" className={isActiveLink("/layout/personal")}>
              Məlumatlarım
            </Link>
            <Link to="/layout/myinterests" className={isActiveLink("/layout/myinterests")}>
              Maraq Sahələri
            </Link>
            <Link to="/layout/notifications" className={isActiveLink("/layout/notifications")}>
              Bildirimlər
            </Link>
            <Link to="/layout/addpost" className={isActiveLink("/layout/addpost")}>
              Post Paylaş
            </Link>
            <Link to="/layout/myposts" className={isActiveLink("/layout/myposts")}>
              Postların
            </Link>
            <Link to="/layout/followers" className={isActiveLink("/layout/followers")}>
              Takipçilər
            </Link>

            <Link className="mobile-nav">Profil</Link>
            <Link className="mobile-nav">Log Out</Link>
          </>
        }
      </div>
      <div className="side-cont">
        <Outlet />
      </div>
    </div>
  );
}

export default Tabs;
