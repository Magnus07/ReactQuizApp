import Header from "./components/Header";
import Users from "./components/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import { UserContext } from "./userContext";
import { useState, useEffect } from "react";
import QuestionCard from "./components/questionCard";
import Leaderboard from "./components/leaderboard";
import NewHeader from "./components/NewHeader";

function App() {
  const [user, setUser] = useState(
    localStorage.user ? JSON.parse(localStorage.user) : null
  );
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  useEffect(() => {
    const fetchLoginData = async function() {
      var res = await fetch("http://localhost:3001/users/login/success", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data._id !== undefined) updateUserData(data);
    }
    fetchLoginData();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user: user,
          setUserContext: updateUserData,
        }}
      >
        <div className="App">
          <NewHeader />
          <Routes>
            <Route path="/" exact element={<Users />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/quiz" element={<QuestionCard />}></Route>
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
            <Route path="/newheader" element={<NewHeader />}></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
