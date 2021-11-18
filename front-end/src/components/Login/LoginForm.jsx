import React, { Component } from 'react';
import { Form, Container, Row, Col } from "react-bootstrap";
import { Label } from '../Label';
import { TextBox } from '../TextBox';
import Button from '../Button';
import jwt_decode from 'jwt-decode';
import LocalStorage from '../../storage/LocalStorage';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import "./Login.scss";



export default class LoginForm extends Component {

  constructor() {
    super();
  }

  state = {
    login: '',
    log: true,
    displayError: false,
    users: []
  }

  componentDidMount = () => {

    let localStore = new LocalStorage();

    axios.get('assets/data/userdetails.json').then(response => {
      this.setState({ users: response.data });
    });
    localStore.setValueToLocalStorage("loggedIn", "false");

  }


  getToken = () => {
    //substring(1) to remove the '#'
    let hash = this.parseParams(document.location.hash.substring(1));
    return hash.access_token;
  }

  getUser = (token) => {
    var decoded = jwt_decode(token);
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

  handleSubmit = (e) => {
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (userName && password) {
      const hasName = this.state.users.filter(user => user['username'] === userName).length > 0;
      const hasPassword = this.state.users.filter(user => user['password'] === password).length > 0;
      if (hasName && hasPassword) {
        let localStore = new LocalStorage();
        localStore.setValueToLocalStorage("loggedIn", "true");

        this.setState({
          login: 'true',
          log: false,
          displayError: false
        })
        return this.props.history.push('/claim');
      } else {
        this.setState({ displayError: true });
        return false;
      }
    } else {
      this.setState({ displayError: true });
      return false;
    }
  }

  render() {
    return (
      <div className="Login">
        <div className="login-container">
        <img src={require('../../assets/images/header_logo.svg')} className="ey-logo" />
          <Container>
            <Row>
              <Col
                className="requestblockonecol"
                lg={8}
                md={8}
                sm={6}
                xs={12}
              />
              <Col className="requestblocktwocol" lg={4} md={4} sm={6} xs={12}>                
                <div>
                  <div>
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
                              <Button componentProps={{ id: "submit", className: "signin_btn", text: "LOGIN" }} onClick={this.handleSubmit} />
                            </div>
                          </div>
                          {this.state.displayError ? (
                            <div className="ptop">
                              <Alert severity="error">Please enter valid username and password</Alert>
                            </div>
                          ) : undefined}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
            </Col>

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
          </Row>
        </Container>
      </div>
      </div >
    );
  }
}