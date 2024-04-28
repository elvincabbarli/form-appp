import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [checked, setIsChecked] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
      username: data.get("username"),
      last_name: data.get("lastName"),
      first_name: data.get("firstName"),
      get_email: checked,
    };

    try {
      const response = await axios.post(
        "https://fast-quora.onrender.com/register",
        formData,
        {
          mode: "no-cors",
        }
      );
      navigate("/signin");
      return response;
    } catch (error) {
      console.error("Registration failed!", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Qeydiyyat</h2>
      <input
        type="text"
        autoComplete="given-name"
        name="firstName"
        required
        id="firstName"
        label="Ad"
        placeholder="Ad"
        autoFocus
      />
      <input
        required
        type="text"
        id="lastName"
        label="Soyad"
        name="lastName"
        placeholder="Soyad"
        autoComplete="family-name"
      />
      <input
        type="text"
        required
        id="username"
        label="İstifadəçi adı"
        name="username"
        autoComplete="username"
        placeholder="İstifadəçi adı"
      />
      <input
        type="email"
        required
        id="email"
        label="Email"
        placeholder="Email"
        name="email"
        autoComplete="email"
      />
      <input
        required
        name="password"
        label="Şifrə"
        placeholder="Şifrə"
        type="password"
        id="password"
        autoComplete="new-password"
      />
      <div style={{ display: 'flex', gap: "15px" }}>
        <label htmlFor="getEmail">
          Mən e-poçt vasitəsilə bildirimləri <br /> və yeniləmələr almaq istəyirəm.
        </label>
        <input
          type="checkbox"
          onChange={(e) => setIsChecked(e.target.checked)}
          checked={checked}
          id="getEmail"
          name="getEmail"
          color="primary"
        />
      </div>
      <button type="submit">Qeyd Ol</button>
      <Link to="/signin">Hesabınız var? Giriş Et</Link>
    </form>
  );
}
