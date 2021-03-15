import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import login from "./components/SignIn/Login";

function App() {
  return (
    <div className="mainApp">
      <Router>
        <Switch>
          <Route exact path="/" component={Registration} />
          <Route exact path="/login" component={login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
