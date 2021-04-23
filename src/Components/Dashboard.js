// import {useEffect, useState} from 'react'
// export default class Component extends React.Component {

//     const ab = "prat"
//     if ab == "prat"{
//         console.log("hello world")
//     }

//     render() {
//         return (
//             <div><h1>This is Dashboard</h1></div>
//         );
//     }
// }

import { withRouter } from 'react-router-dom' ;

import React, { Component } from "react";
import axios from 'axios';
import { useState, useEffect  } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { hashHistory } from 'react-router';
import One from "./Signup"
import Login from "./Login"
import {BrowserRouter as Router , Redirect , Route, Switch} from "react-router-dom";
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import history from '../History'

function Dashboard(props) {
        const [value, setData] = useState("")
        
        useEffect(async () => {
          const access_token = localStorage.getItem("access_token")
          // const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImdvZ2F3YWxlcHJhdGhhbWVzaEBnbWFpbC5jb20iLCJwYXNzd29yZCI6InByYXRoYW1lc2g0MiJ9.e_GSVgaKaKw7dxxBy7Yn6dg-85fjF04gWfa_Wl9BjFU"
          const data = { email: value.email, password: value.password };
          const result = await axios(
            `http://localhost:5000/api/users/my-profile`, {
              headers: {
                'Authorization': `${access_token}` 
              }
            }
          );
       
          setData(result.data.msg);
        });

       

        // function getData() {
       
        // const access_token = localStorage.getItem("access_token")
        // // const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImdvZ2F3YWxlcHJhdGhhbWVzaEBnbWFpbC5jb20iLCJwYXNzd29yZCI6InByYXRoYW1lc2g0MiJ9.e_GSVgaKaKw7dxxBy7Yn6dg-85fjF04gWfa_Wl9BjFU"
        // const data = { email: value.email, password: value.password };
        // axios
        //   .get(`http://localhost:5000/api/users/my-profile`, {
        //     headers: {
        //       'Authorization': `${access_token}` 
        //     }
        //   })
        //   .then(result => {
            
        //     message(result.data.msg)
            
             
        //   })
        // }

       
        
       
        function routeChange(){ 
          localStorage.clear();
          window.location = '/login'
          
        }
      return (
        <div>
        {/* <h3>{data}</h3> */}
         {/* <div className="card-footer text-center"> <button type="submit" className="btn btn-primary text-center" >Submit</button></div> */}
        <h2>{value.split("@gmail.com")} to Dashboard</h2>
          <div>
                     <div> 
                     <button type="submit" className="btn btn-danger text-center" onClick = {routeChange} >Logout</button>
                     </div>

          </div> 
         
        </div>
      );
    
}

export default Dashboard
