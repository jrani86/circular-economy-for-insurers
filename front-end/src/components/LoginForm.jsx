import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Label } from './Label';
import { TextBox } from './TextBox';
import Button from './Button';
import jwt_decode from 'jwt-decode';
import LocalStorage from './../storage/LocalStorage'


export default class LoginForm extends Component {

  constructor() {
    super();
    this.gravityRef = React.createRef();
  }

  state = {
    login: '',
    accountNum: '',
    subNum: '',
    isUAA: false,
    log: true,
    count: 0
  }

  componentDidMount = () => {

    let localStore = new LocalStorage();

    let uri = window.location.href
    if (uri.includes("/implicit/callback")) {
      let token = this.getToken()
      let user = this.getUser(token)
      localStore.setValueToLocalStorage("logggdIn", "true")
      localStore.setValueToLocalStorage("token", token)
      localStore.setValueToLocalStorage("user", user)
      window.location.href = process.env.REACT_APP_REDIRECT_URL;
    }
    let isLogegdIn = localStore.getValueFromLocalStorage("logggdIn");
    if (localStore.getValueFromLocalStorage("logggdIn") === "true") {
      //document.getElementById("login").hidden = true;
      //document.getElementById("gravity").hidden = false;
      this.setState({
        login: true,
        log: false,
        isUAA: true
      })
    }

  }


  getToken = () => {
    //substring(1) to remove the '#'
    let hash = this.parseParams(document.location.hash.substring(1));
    console.log(hash, "token")
    return hash.access_token;
  }

  getUser = (token) => {
    var decoded = jwt_decode(token);
    console.log(decoded);
    return decoded.user_name;
  }

  parseParams = (str) => {

    var pieces = str.split("&"), data = {}, i, parts;
    // process each query pair
    for (i = 0; i < pieces.length; i++) {
      parts = pieces[i].split("=");
      if (parts.length < 2) {
        parts.push("");
      }
      data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
    return data;
  }

  goToUaaSignin = () => {
    let loginPath = process.env.REACT_APP_UAA_BASE_URL + process.env.REACT_APP_UAA_OAUTHLOGIN
    window.location.replace(loginPath)
  }

  signOut = () => {
    // const $ = window.$;
    // $('#orgin').addClass("bg");
    let localStore = new LocalStorage();
    if (this.state.isUAA) {
      localStore.setValueToLocalStorage("logggdIn", "false")
      localStore.removeItemFromLocalStorage("token")
      let logoutPath = process.env.REACT_APP_UAA_BASE_URL + process.env.REACT_APP_UAA_LOGOUT
      // document.getElementById("tempframe").src = logoutPath
      //document.getElementById("agnt").hidden = true
      //  document.getElementById("tempframe").onload = this.goToUaaSignin()
    }
    else {
      // document.getElementById("login").hidden = false;
      //document.getElementById("agnt").hidden = true
      //document.getElementById("gravity").hidden = true;
      this.setState({
        login: false,
        log: true
      })
    }
  }


  handleSubmit = (e) => {
    if (document.getElementById("username").value === "su" && document.getElementById("password").value === "gw") {
      // const $ = window.$;

      // $('#orgin').removeClass("bg");
      //document.getElementById("agnt").hidden = false
      let localStore = new LocalStorage();
      localStore.setValueToLocalStorage("logggdIn", "true")
      //document.getElementById("login").hidden = true;
      //document.getElementById("gravity").hidden = false;

      this.setState({
        login: 'true',
        log: false,
        isUAA: false
      })
      return this.props.history.push('/claim');
    } else {
      const $ = window.$;
        $('#wrongCredentialsPopup').modal('show');
    }
  }

  navigateTo = (e) => {
          //this.gravityRef.current.PA_navigateTo(e.target.id);
        }

        render() {
    return (
        <div className="overflow-x-none  " id="orgin" >

          <iframe id="tempframe" src="" style={{ display: "none" }} />
          <div  >


            <div id="login" className="row log-mt ">
              <div className="col-md-7 offset-md-4 col-lg-4 offset-lg-5 mt-5">
                <form onSubmit={this.handleSubmit}>
                  <div className="row p-5  ">
                    <div className="col-md-12 login-form">
                      <div className="row">
                        <div className="col-md-12 left-align">
                          <Label componentProps={{ id: "usernameLabel", text: "Username", className: "font-metropolis" }} />
                          <TextBox componentProps={{ id: "username", className: "input-text form-control", type: "text" }} />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12 left-align">
                          <Label componentProps={{ id: "passwordLabel", text: "Password", className: "font-metropolis" }} />
                          <TextBox componentProps={{ id: "password", className: "input-text form-control", type: "password" }} />
                        </div>
                      </div>
                      <div className="row  mt-5">
                        <div className="col-md-12  mt-3">
                          <Button componentProps={{ id: "submit", className: "btn bg-dark bold text-light btn-login", text: "LOGIN" }} onClick={this.handleSubmit} />
                        </div>
                      </div>
                      <div className="row  mt-5">
                        <div className="col-md-12 mt-3" >
                          <a href="#">Forgot Password?</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>


          <div className="modal fade " id="wrongCredentialsPopup" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered " role="document">
              <div className="modal-content border-radius-none">
                <div className="modal-body p-5">
                  <Label componentProps={{ id: "wrongCredentialsLabel", className: "bold font-metroplis", text: "Invalid Login Credentials" }} />
                </div>
                <div className="modal-footer">
                  <Button componentProps={{ id: "closePopup", className: "bg-dark text-light font-metroplis", data_dismiss: "modal", text: "Close" }} />
                </div>
              </div>
            </div>
          </div>

        </div>
        );
  }
}