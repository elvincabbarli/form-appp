import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import Main from "./pages/Main";
import MyInterests from "./pages/MyInterests";
import PersonalInfo from "./components/PersonalInfo"; // Fixed typo
import MyPosts from "./pages/MyPosts";
import TextEditor from "./components/Editor";

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
          <Route path="/profile" element={<Profile />}>
            <Route path="myinterests" element={<MyInterests />} />
            <Route path="personal" element={<PersonalInfo />} />
            <Route path="myposts" element={<MyPosts />} />
            <Route path="addpost" element={<TextEditor />} />
          </Route>
        ) : (
          <Route path="/" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
