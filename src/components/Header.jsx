import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../store/loginSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector((state) => state.login);
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const location = useLocation();

  // Function to determine if a link is active
  const isActiveLink = (link) => {
    return link === location.pathname ? "active" : "";
  };

  return (
    <div className="header-cont">
      <Link className="logo" to="/">
        DipNote
      </Link>
      <div className="easy-links">
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
      <div className="header-links">
        {isLoggedIn ? (
          <>
            <Link to="/profile/personal">{username}</Link>
            <Link onClick={handleLogout}>Log Out</Link>
          </>
        ) : (
          <>
            <Link to="/signin">Giriş</Link>
            <Link to="/signup">Qeydiyyat</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
