import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ThreadsPage from "./pages/ThreadsPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ThreadDetailPage from "./pages/ThreadDetailPage";
import ThreadAddPage from "./pages/ThreadAddPage";
import NotFoundPage from "./pages/NotFoundPage";
import { putAccessToken } from "./utils/local-api";
import { getUserLogged } from "./utils/network-api";

function App() {
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const response = await getUserLogged();
      response.error
        ? setLoggedInUser(null)
        : setLoggedInUser(response.data.user);
      setIsInitializing(false);
    }

    getUser();
  }, []);

  function onLoggedInHandler(user) {
    putAccessToken(user.token);
    setLoggedInUser(user);
    navigate("/");
  }

  function onLoggedOutHandler() {
    putAccessToken(null);
    setLoggedInUser(null);
    navigate("/login");
  }

  if (isInitializing) return null;

  return (
    <div className="min-h-screen max-w-4xl mx-auto flex flex-col bg-[#222831]">
      <Header />
      <div className="flex-1 relative">
        <main>
          <Routes>
            <Route
              path="/"
              element={<ThreadsPage loggedInUser={loggedInUser} />}
            />
            <Route
              path="/threads/:threadId"
              element={<ThreadDetailPage loggedInUser={loggedInUser} />}
            />
            <Route
              path="/threads/add"
              element={<ThreadAddPage />}
            />
            <Route
              path="/leaderboards"
              element={<LeaderboardsPage />}
            />
            {!loggedInUser && (
              <>
                <Route
                  path="/login"
                  element={<LoginPage onLogin={onLoggedInHandler} />}
                />
                <Route
                  path="/register"
                  element={<RegisterPage />}
                />
              </>
            )}

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </main>
      </div>
      <Footer
        loggedInUser={loggedInUser}
        logoutHandler={onLoggedOutHandler}
      />
    </div>
  );
}

export default App;
