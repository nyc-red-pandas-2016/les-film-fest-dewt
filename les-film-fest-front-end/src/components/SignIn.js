import React, { Component } from 'react';
import $ from 'jquery';
// import _ from 'lodash';

export default class SignIn extends Component {
  constructor() {
    super();
    this.handleLoginClick = this.handleLoginClick.bind(this)
  }
  handleLoginClick(event) {
    event.preventDefault();
    var email = this.refs.emailInput.value
    var password = this.refs.passwordInput.value
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/users/sign_in.json",
      data: {
        user: {
          email: email,
          password: password,
        },
      }
    }).done(function(user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      location.replace('/');
      // this.props.location.query.onSignIn(data)
      // $.ajax({
      //   method: "GET",
      //   url: "http://localhost:3000/auth/is_signed_in.json"
      // }).done(function(response) {
      //   debugger
      // })
  }.bind(this));
}

  render() {
    debugger;
    return (
      <div>
        <p>Sign In Form</p>
        <form>
          <input type='email'
            name='email'
            placeholder='email'
            //value={this.state.email}
            ref="emailInput" />

          <input type='password'
            name='password'
            placeholder='password'
            //value={this.state.password}
            ref="passwordInput" />

          <input type='submit' onClick={this.handleLoginClick} defaultValue="Login"/>

        </form>
      </div>
    )
  }
}
