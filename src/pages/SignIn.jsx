import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/loginSlice";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      username: data.get("username"),
      password: data.get("password"),
      scope: rememberMe,
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const response = await axios.post(
        "https://fast-quora.onrender.com/login",
        formData,
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      dispatch(loginSuccess(response.data));
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Sign-in failed!", error.response.data);
    }
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="username">Giriş</label>
        <input
          required
          type="text"
          id="username"
          label="İstifadəçi adı"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <input
          required
          name="password"
          label="Şifrə"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <div style={{display: 'flex' , gap: '15px'}}>
          <label htmlFor="remember">Məni xatırla</label>
          <input
            type="checkbox"
            onChange={(e) => setRememberMe(e.target.checked)}
            value="remember"
            id="remember"
            checked={rememberMe}
            color="primary"
          />
        </div>
        <button type="submit">Giriş et</button>
        <Link href="#" variant="body2">
          Şifrəni unutdun?
        </Link>
        <Link to="/signup">{"Hesabın yoxdur? Qeyd ol"}</Link>
      </form>
    </div>
  );
}
