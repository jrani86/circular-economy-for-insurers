import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';


class Header extends Component {

  constructor() {
    super();
  }

  signout = () => {
    this.props.history.push('/');
  }
  goToHome = () => {
    this.props.history.push('/');
  }
  render() {
    return this.props.location.pathname === "/login" ? (<div />) : (
      <div>
        <div>
          <nav class="navbar navbar-light bg-light esg-nav" >
            <div className="col-md-1">
              <a onClick={this.goToHome} className="fas fa-home esg-signout">
              </a>
            </div>
            <div>
              <label className="esg-title">Green Claims Portal</label>
            </div>
            <div className="col-md-1">
              <a onClick={this.signOut} > <i class="fa fa-power-off esg-signout" aria-hidden="true"></i></a>
            </div>
          </nav >
        </div >
      </div >
    )
  }
}

export default withRouter(Header);