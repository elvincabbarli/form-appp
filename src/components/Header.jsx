import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-cont">
      <Link className="logo" to="/">
        Logo
      </Link>
      <div className="header-links">
        <Link to="/signin">Giriş</Link>
        <Link to="/signup">Qeydiyyat</Link>
        <Link to="/profile">Profil</Link>
      </div>
    </div>
  );
};

export default Header;
