import './App.css';
import Login from './Components/Login';
import One from "./Components/Signup"
import Dashboard from "./Components/Dashboard"
import history from "./History"
import Signup from "./Components/Signup"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
 



function App() {

  if (localStorage.access_token){
    return(
      <div className = "App">
        <Dashboard/>
      </div>
     
    )
  }

  else{
    return (
    <div className="App">

      <Router history={history}>

      <Switch>
      <Route path="/" exact component={Signup} />
      <Route path="/dashboard" exact component={Dashboard} />
      {/* <Route path="/dashboard/user-info" exact component={One} /> */}
      <Route path="/login" exact component = {Login}/>



      </Switch>
      
      </Router>
     

      {/* <One/> */}
    </div>
  );
        }
}

export default App;
