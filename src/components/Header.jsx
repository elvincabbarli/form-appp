import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/loginSlice";
import logo from "../assets/logo.png";
import mobileMenyu from "../assets/mobile.png";
import { changeMobile } from "../store/postSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);
  const { showMobile } = useSelector((state) => state.post);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const handleMobile = () => {
    if(showMobile){
      dispatch(changeMobile(false))
    }
    else{
      dispatch(changeMobile(true))
    }
  };

  console.log(showMobile)

  return (
    <div className="header-cont">
      <Link className="logo" to="/">
        <img className="logo" src={logo} alt="" />
      </Link>
      <div className="header-links">
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profil</Link>
            <Link onClick={handleLogout}>Log Out</Link>
          </>
        ) : (
          <>
            <Link to="/signin">Giriş</Link>
            <Link to="/signup">Qeydiyyat</Link>
          </>
        )}
      </div>
      <div>
        <button onClick={handleMobile} className="mobile-btn">
          <img src={mobileMenyu} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Header;
