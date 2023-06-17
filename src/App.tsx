import "./App.css";
import "./defCommon";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState } from "react";
import GithubLogin from "./routes/GithubLogin";
import GithubInfo from "./routes/GitHubInfo";
import { GithubOauthInfoProvider } from "./contexts/GithubOauthContext";
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
          element={
            <GithubOauthInfoProvider>
              <GithubInfo />
            </GithubOauthInfoProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
