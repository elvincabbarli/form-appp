import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/loginSlice";

const Header = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.login);
  const handleLogout = () => {
    dispatch(logout())
    window.location.href = '/'
  }

  return (
    <div className="header-cont">
      <Link className="logo" to="/">
        Form
      </Link>
      <div className="header-links">

        {
          isLoggedIn ? <>
            <Link to="/profile">Profil</Link>
            <Link onClick={handleLogout}>Log Out</Link>
          </> : <>
            <Link to="/signin">Giriş</Link>
            <Link to="/signup">Qeydiyyat</Link>
          </>
        }

      </div>
    </div>
  );
};

export default Header;