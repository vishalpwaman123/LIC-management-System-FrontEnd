import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "./components/Registration/Registration.js";
import login from "./components/SignIn/Login.js";
import userDetail from "./components/Customer/Detail/Detail.js";

function App() {
  return (
    <div className="mainApp">
      <Router>
        <Switch>
          <Route exact path="/" component={Registration} />
          <Route exact path="/login" component={login} />
          <Route exact path="/userDetail" component={userDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
