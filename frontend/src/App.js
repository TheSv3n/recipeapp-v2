import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import FeedScreen from "./screens/FeedScreen";
import LoginScreen from "./screens/LoginScreen";
import NewRecipeScreen from "./screens/NewRecipeScreen";
import RecipeScreen from "./screens/RecipeScreen";
import UserRecipesScreen from "./screens/UserRecipesScreen";
import UserProfileScreen from "./screens/UserProfileScreen";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Route path="/" component={FeedScreen} exact />
        <Route path="/search/:search" component={FeedScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/newrecipe" component={NewRecipeScreen} />
        <Route path="/userrecipes" component={UserRecipesScreen} />
        <Route path="/recipe/:id" component={RecipeScreen} />
        <Route path="/user/:id" component={UserProfileScreen} />
      </Router>
    </>
  );
}

export default App;
