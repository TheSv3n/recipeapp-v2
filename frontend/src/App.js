import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import FeedScreen from "./screens/FeedScreen";
import LoginScreen from "./screens/LoginScreen";
import NewRecipeScreen from "./screens/NewRecipeScreen";
import RecipeScreen from "./screens/RecipeScreen";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Route path="/" component={FeedScreen} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/newrecipe" component={NewRecipeScreen} />
        <Route path="/recipe/:id" component={RecipeScreen} />
      </Router>
    </>
  );
}

export default App;
