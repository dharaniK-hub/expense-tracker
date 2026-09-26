import "./index.css";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Profile from "./components/Profile";

const routes = {
  "/": Landing,
  "/login": Login,
  "/forgot-password": Login,
  "/dashboard": Dashboard,
  "/profile": Profile,
};

function App() {
  const CurrentPage = routes[window.location.pathname] || Landing;

  return <CurrentPage />;
}

export default App;
