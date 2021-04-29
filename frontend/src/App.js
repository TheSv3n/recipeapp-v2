import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import FeedScreen from "./screens/FeedScreen";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Route path="/" component={FeedScreen} exact />
      </Router>
    </>
  );
}

export default App;
