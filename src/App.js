import './App.css';
import Login from './Components/Login';
import One from "./Components/One"
import Dashboard from "./Components/Dashboard"
import history from "./History"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
 

function App() {
  return (
    <div className="App">

      <Router history={history}>

      <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/dashboard/user-info" exact component={One} />


          {/* <Route exact path="/">
                  <Login />
          </Route>

          <Route exact path="/dashboard">
              <Dashboard login = "true"/>
          </Route> */}

      </Switch>
      
      </Router>
     

      {/* <One/> */}
    </div>
  );
}

export default App;
