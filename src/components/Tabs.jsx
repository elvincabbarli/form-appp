import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { changeMobile } from "../store/postSlice";
import { logout } from "../store/loginSlice";

function Tabs() {
  const location = useLocation();
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.login);
  const { showMobile } = useSelector((state) => state.post);


  const handleMobile = () => {
    if (showMobile) {
      dispatch(changeMobile(false))
    }
    else {
      dispatch(changeMobile(true))
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };


  // Function to determine if a link is active
  const isActiveLink = (link) => {
    // Check if the current pathname matches the link exactly or if it's a subpath
    return location.pathname === link || location.pathname.startsWith(link) ? "active" : "";
  };

  return (
    <div className="top-container">
      <div className={showMobile ? "side-links side-active" : "side-links"}>
        <Link onClick={() => handleMobile()} to="/" className={isActiveLink("/")}>
          Ana Səhifə
        </Link>

        <Link onClick={() => handleMobile()} to="/popular" className={isActiveLink("/popular")}>
          Populyar
        </Link>
        {
          isLoggedIn &&
          <>
            <Link onClick={() => handleMobile()} to="/layout/personal" className={isActiveLink("/layout/personal")}>
              Məlumatlarım
            </Link>
            <Link onClick={() => handleMobile()} to="/layout/myinterests" className={isActiveLink("/layout/myinterests")}>
              Maraq Sahələri
            </Link>
            <Link onClick={() => handleMobile()} to="/layout/notifications" className={isActiveLink("/layout/notifications")}>
              Bildirimlər
            </Link>
            <Link onClick={() => handleMobile()} to="/layout/addpost" className={isActiveLink("/layout/addpost")}>
              Post Paylaş
            </Link>
            <Link onClick={() => handleMobile()} to="/layout/myposts" className={isActiveLink("/layout/myposts")}>
              Postların
            </Link>
            <Link onClick={() => handleMobile()} to="/layout/followers" className={isActiveLink("/layout/followers")}>
              Takipçilər
            </Link>

            <Link className="mobile-nav">Profil</Link>
            <Link onClick={handleLogout} className="mobile-nav">Çıxış</Link>

          </>
        }
        {
          !isLoggedIn && <>
            <Link to='/signin' className="mobile-nav">Daxil Ol</Link>
            <Link to='/signup' className="mobile-nav">Qeydiyyat</Link>
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
