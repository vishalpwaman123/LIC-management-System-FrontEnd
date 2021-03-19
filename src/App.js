import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "./components/Registration/Registration.js";
import login from "./components/SignIn/Login.js";
import userDetail from "./components/Customer/Detail/Detail.js";
import userDashboaed from "./components/Customer/Dashboard/UserDashboaed.js";
import AgentDashboaed from "./components/Agent/Dashboard/AgentDashboard.js";
import BranchManagerboard from "./components/Branch_Manager/Dashboard/BranchManagerboard.js";
import CEODashboaed from "./components/CEO/Dashboard/CEODashboaed.js";
import ResetPassword from "./components/forgetPassword/ResetPassword.js"
import ForgetPassword from './components/forgetPassword/ForgetPassword'

function App() {
  return (
    <div className="mainApp">
      <Router>
        <Switch>
          <Route exact path="/" component={Registration} />
          <Route exact path="/login" component={login} />
          <Route exact path="/userDetail" component={userDetail} />
          <Route exact path="/userDashboaed" component={userDashboaed} />
          <Route exact path="/AgentDashboaed" component={AgentDashboaed} />
          <Route exact path="/resetpassword" component={ResetPassword} />
          <Route exact path="/forgetpassword" component={ForgetPassword} />
          <Route
            exact
            path="/BranchManagerboard"
            component={BranchManagerboard}
          />
          <Route exact path="/CEODashboaed" component={CEODashboaed} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
