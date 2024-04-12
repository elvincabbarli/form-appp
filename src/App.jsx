import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Profile from "./pages/Profile"
import Page1 from "./pages/Page1"
import Page2 from "./pages/Page2"
import Page3 from "./pages/Page3"



function App() {

  return (
    <div className="whole-cont">
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/' element={<Profile />}>
          <Route path="page1" element={<Page1 />} />
          <Route path="page2" element={<Page2 />} />
          <Route path="page3" element={<Page3 />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
