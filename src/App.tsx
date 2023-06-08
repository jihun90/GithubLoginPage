import "./App.css";
import "./defCommon";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState } from "react";
import GithubLogin from "./routes/GithubLogin";
import GithubInfo from "./routes/GitHubInfo";
function App() {
  // const [isLogin, setLogin]: TypeOfUseState<boolean> = useState<boolean>(false);
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          path={`/`}
          element={<GithubLogin />}
        />
        <Route
          path={`/callback`}
          element={<GithubInfo />}
        />
      </Routes>
    </Router>
  );
}

export default App;
