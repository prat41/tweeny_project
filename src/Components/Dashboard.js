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


import React, { Component } from "react";
import axios from 'axios';
import { useState } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { hashHistory } from 'react-router';
import One from "./One"
function Dashboard() {
        const [value, message] = useState("")
        function getData() {
       
        const access_token = localStorage.getItem("access_token")
        // const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImdvZ2F3YWxlcHJhdGhhbWVzaEBnbWFpbC5jb20iLCJwYXNzd29yZCI6InByYXRoYW1lc2g0MiJ9.e_GSVgaKaKw7dxxBy7Yn6dg-85fjF04gWfa_Wl9BjFU"
        const data = { email: value.email, password: value.password };
        axios
          .get(`http://localhost:5000/api/users/my-profile?access_token=${access_token}`, data)
          .then(result => {
            
            message(result.data.msg)
            
             
          })
        }
     
      return (
        <div>
        {/* <h3>{data}</h3> */}
         <div className="card-footer text-center"> <button type="submit" onClick = {getData}  className="btn btn-primary text-center" >Submit</button></div>
        <h1>{value}</h1>
        </div>
      );
    
}

export default Dashboard