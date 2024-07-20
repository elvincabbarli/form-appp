import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import Main from "./components/Main";
import MyInterests from "./pages/MyInterests";
import PersonalInfo from "./components/PersonalInfo"; // Fixed typo
import MyPosts from "./pages/MyPosts";
import AddPost from "./components/AddPost";
import Notifications from "./pages/Notifications";
import Followers from "./pages/Followers";
import Post from "./components/Post";
import Popular from "./pages/Popular";
import UserProfile from "./pages/UserProfile";
import CategoryPost from "./pages/CategoryPost";
import { useEffect } from "react";
import { closeWebSocket, connectWebSocket } from "./utils/websocket";
import { addCommentNot, addLikeNot } from "./store/postSlice";
import Register from "./pages/Auth/Register";

function App() {
  const { isLoggedIn, user_id } = useSelector((state) => state.login);
  const dispatch = useDispatch()
  useEffect(() => {
    const userId = user_id; 
    const onMessageReceived = (notification) => {
      console.log("Received notification:", notification);
      switch (notification.type) {
        case "add_comment":
          dispatch(addCommentNot())
          break;
        case "like_post":
          dispatch(addLikeNot())
          break;
        default:
          break;
      }
    };
    connectWebSocket(userId, onMessageReceived);

    return () => {
      // Close WebSocket connection when component unmounts
      closeWebSocket();
    };
  }, [user_id]);

  return (
    <div className="whole-cont">
      <Header />
      <div className="second">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/registr" element={<Register />} />
          <Route path="/" element={<Main />} />
          <Route path="/popular" element={<Popular />} />
          {isLoggedIn && (
            <Route path="/myinterests" element={<MyInterests />} />
          )}
          {isLoggedIn && <Route path="/personal" element={<PersonalInfo />} />}
          {isLoggedIn && <Route path="/myposts" element={<MyPosts />} />}
          {isLoggedIn && <Route path="/addpost" element={<AddPost />} />}
          {isLoggedIn && (
            <Route path="/notifications" element={<Notifications />} />
          )}
          {isLoggedIn && <Route path="/followers" element={<Followers />} />}
          <Route path="/post/:post_id" element={<Post />} />
          <Route path="/user/:user_id" element={<UserProfile />} />
          <Route path="/category/:post_id" element={<CategoryPost />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
