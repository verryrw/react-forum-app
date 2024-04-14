import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Threads from "./pages/Threads";
import Leaderboards from "./pages/Leaderboards";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ThreadDetail from "./pages/ThreadDetail";
import ThreadAdd from "./pages/ThreadAdd";

function App() {
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
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
