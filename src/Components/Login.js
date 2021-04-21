import React, { Component } from "react";
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Dashboard from "./Dashboard"
import { hashHistory } from 'react-router';
import history from "../History"
import {BrowserRouter, Redirect , Route, Link} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", errors: {} };
  }
  handleForm = e => {
    e.preventDefault();
    if (this.state.email === '' || this.state.password === '') {
      NotificationManager.warning("Email And Password Required");
      return false;
    }
    const data = { email: this.state.email, password: this.state.password };
    axios
      .post("http://localhost:5000/api/users/signin", data)
      .then(result => {
        if (result.data.msg === "Success"){
          NotificationManager.success(result.data.msg);
          localStorage.setItem("access_token", result.data.access_token);
        // localStorage.setItem("user", JSON.stringify(result.data.user));
        // this.props.setLogin(JSON.stringify(result.data.user));
        // NotificationManager.success(result.data.msg);
        // this.props.history.push("/dashboard");
        this.props.history.push("/dashboard");

      //   return (
      //     <BrowserRouter>
      //   ...
      //   <Route path="/dashboard" component={Dashboard}/>
      //   ...
      // </BrowserRouter>
        // )
       
        }
        else{
          NotificationManager.success(result.data.msg);
        }
        
      })
      // .catch(err => {
      //   if (err.response && err.response.status === 404)
      //     NotificationManager.error(err.response.data.msg);
      //   else
      //     NotificationManager.error("Something Went Wrong");
      //   this.setState({ errors: err.response })
      // });
  };
  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  // redirect_dashboard = e => {
  //   e.preventDefault();

  //   this.props.history.push("/dashboard");

  //   // hashHistory.push('/dashboard');
  // }
  render() {
    return (
      <div className="content">
        <NotificationContainer/>
        <form onSubmit={this.handleForm}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <div className="card">
                <div className="card-header text-center">Login</div>
                <div className="card-body">
                  <div className="form-group">
                    <label >Email address</label>
                    <input type="email" name="email" onChange={this.handleInput} className="form-control" placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label >Password</label>
                    <input type="password" name="password" onChange={this.handleInput} className="form-control" placeholder="Enter Password" />
                  </div>
                </div>
                <div className="card-footer text-center"> <button type="submit"  className="btn btn-primary text-center" >Submit</button></div>
              </div>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: user => dispatch({ type: "SET_LOGIN", payload: user })
  };
};
export default (Login);

