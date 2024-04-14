import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Threads from "./pages/Threads";
import Leaderboards from "./pages/Leaderboards";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ThreadDetail from "./pages/ThreadDetail";
import ThreadAdd from "./pages/ThreadAdd";
import NotFound from "./pages/NotFound";
import { putAccessToken } from "./utils/local-api";
import { getUserLogged } from "./utils/network-api";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function getUser() {
      const response = await getUserLogged();
      response.error ? setIsLoggedIn(false) : setIsLoggedIn(true);
      setIsInitializing(false);
    }

    getUser();
  }, []);

  function onLoggedInHandler(token) {
    putAccessToken(token);
    setIsLoggedIn(true);
    navigate("/");
  }

  function onLoggedOutHandler() {
    putAccessToken(null);
    setIsLoggedIn(false);
    navigate("/login");
  }

  if (isInitializing) return null;

  return (
    <div className="h-screen max-w-4xl mx-auto flex flex-col bg-[#222831]">
      <Header />
      <div className="flex-1 relative">
        <main>
          <Routes>
            <Route
              path="/"
              element={<Threads />}
            />
            <Route
              path="/threads/:threadId"
              element={<ThreadDetail />}
            />
            <Route
              path="/threads/add"
              element={<ThreadAdd />}
            />
            <Route
              path="/leaderboards"
              element={<Leaderboards />}
            />
            {!isLoggedIn && (
              <>
                <Route
                  path="/login"
                  element={<Login onLogin={onLoggedInHandler} />}
                />
                <Route
                  path="/register"
                  element={<Register />}
                />
              </>
            )}

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
      <Footer
        isLoggedIn={isLoggedIn}
        logoutHandler={onLoggedOutHandler}
      />
    </div>
  );
}

export default App;
