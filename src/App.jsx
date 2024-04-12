import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Header from './components/Header';
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import Main from "./pages/Main";

function App() {
  const { isLoggedIn } = useSelector((state) => state.login);

  return (
    <div className="whole-cont">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {isLoggedIn ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </div>
  )
}

export default App;
