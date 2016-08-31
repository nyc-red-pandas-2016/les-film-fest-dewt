import React, { Component } from 'react';
import $ from 'jquery';

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
  }.bind(this));
}

  render() {
    return (
      <div>
        <p>Sign In Form</p>
        <form>
          <input type='email'
            name='email'
            placeholder='email'
            ref="emailInput" />

          <input type='password'
            name='password'
            placeholder='password'
            ref="passwordInput" />

          <input type='submit' onClick={this.handleLoginClick} defaultValue="Login"/>

        </form>
      </div>
    )
  }
}
