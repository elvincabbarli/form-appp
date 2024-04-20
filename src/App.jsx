import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import Main from "./components/Main";
import MyInterests from "./pages/MyInterests";
import PersonalInfo from "./components/PersonalInfo"; // Fixed typo
import MyPosts from "./pages/MyPosts";
import AddPost from "./components/AddPost";
import Notifications from "./pages/Notifications";
import Followers from "./pages/Followers";
import Layout from "./components/Layout";

function App() {
  const { isLoggedIn } = useSelector((state) => state.login);

  return (
    <div className="whole-cont">
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {isLoggedIn ? (
          <Route path="/" element={<Layout />}>
            <Route path="/layout/home" element={<Main />} />
            <Route path="/layout/myinterests" element={<MyInterests />} />
            <Route path="/layout/personal" element={<PersonalInfo />} />
            <Route path="/layout/myposts" element={<MyPosts />} />
            <Route path="/layout/addpost" element={<AddPost />} />
            <Route path="/layout/notifications" element={<Notifications />} />
            <Route path="/layout/followers" element={<Followers />} />
          </Route>
        ) : (
          <Route path="/" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
