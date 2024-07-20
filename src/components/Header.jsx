import { useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import menupng from "../assets/menu.png";
import closepng from "../assets/close.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/loginSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [showSec, setShowSec] = useState(false);
  const { commentNot, likeNot } = useSelector((state) => state.post);
  const isActiveLink = (link) => {
    // Check if the current pathname matches the link exactly or if it's a subpath
    return location.pathname === link || location.pathname.startsWith(link)
      ? "active"
      : "";
  };

  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <>
      <nav className="nav-container">
        <div className="container nav-second-container">
          <div className="logo-sec">
            <Link to="/">
              <img src={logo} />
            </Link>
            {commentNot ? <p>Comment var</p> : null}
            {likeNot ? <p>Like var</p> : null}
          </div>

          <div className="right-sec">
            <button onClick={() => setShowSec(!showSec)} className="menu">
              <img src={menupng} alt="" />
            </button>
          </div>
        </div>

        <div
          className={showSec ? "hidden-sec show-menu" : "hidden-sec hide-menu"}
        >
          <button onClick={() => setShowSec(!showSec)} className="close-btn">
            <img src={closepng} alt="" />
          </button>

          <div className="hidden-inner">
            <div className="nav-first-sec"></div>
            {/* <hr /> */}
            <div className="nav-second-sec">
              <li>
                <Link
                  onClick={() => setShowSec(!showSec)}
                  to="/"
                  className={isActiveLink("/")}
                >
                  Ana Səhifə
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => setShowSec(!showSec)}
                  to="/popular"
                  className={isActiveLink("/popular")}
                >
                  Populyar
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  <li>
                    <Link
                      onClick={() => setShowSec(!showSec)}
                      to="/personal"
                      className={isActiveLink("/personal")}
                    >
                      Profil
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setShowSec(!showSec)}
                      to="/myinterests"
                      className={isActiveLink("/myinterests")}
                    >
                      Maraq Sahələri
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setShowSec(!showSec)}
                      to="/notifications"
                      className={isActiveLink("/notifications")}
                    >
                      Bildirimlər
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setShowSec(!showSec)}
                      to="/addpost"
                      className={isActiveLink("/addpost")}
                    >
                      Post Paylaş
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setShowSec(!showSec)}
                      to="/myposts"
                      className={isActiveLink("/myposts")}
                    >
                      Postların
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setShowSec(!showSec)}
                      to="/followers"
                      className={isActiveLink("/followers")}
                    >
                      Takipçilər
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        setShowSec(!showSec);
                        handleLogout();
                      }}
                      className="mobile-nav"
                    >
                      Çıxış
                    </Link>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <li>
                    <Link onClick={() => setShowSec(!showSec)} to="/signin">
                      Daxil Ol
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setShowSec(!showSec)} to="/signup">
                      Qeydiyyat
                    </Link>
                    <Link onClick={() => setShowSec(!showSec)} to="/registr">
                      Qeydiyyat-new
                    </Link>
                  </li>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
