import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
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
import Post from "./components/Post";
import Popular from "./pages/Popular";

function App() {
  const { isLoggedIn } = useSelector((state) => state.login);

  return (
    <div className="whole-cont">
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />


        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/popular" element={<Popular />} />
          {isLoggedIn && <Route path="/layout/myinterests" element={<MyInterests />} />}
          {isLoggedIn && <Route path="/layout/personal" element={<PersonalInfo />} />}
          {isLoggedIn && <Route path="/layout/myposts" element={<MyPosts />} />}
          {isLoggedIn && <Route path="/layout/addpost" element={<AddPost />} />}
          {isLoggedIn && <Route path="/layout/notifications" element={<Notifications />} />}
          {isLoggedIn && <Route path="/layout/followers" element={<Followers />} />}
          {isLoggedIn && <Route path="/post/:post_id" element={<Post />} />}
        </Route>



      </Routes>
    </div>
  );
}

export default App;
