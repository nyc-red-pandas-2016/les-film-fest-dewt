import React, { Component } from 'react';
import $ from 'jquery';
// import _ from 'lodash';

export default class SignIn extends Component {
  constructor() {
    super();
  //   this.state = {
  //     username: '',
  //     email: '',
  //     type: '',
  //     password: '',
  //     password_confirmation: ''
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
    }).done(function(data) {
      location.reload();
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
