import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GithubLogin from "./routes/GithubLogin";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          path={`/`}
          element={<GithubLogin />}
        />
      </Routes>
    </Router>
  );
}

export default App;
