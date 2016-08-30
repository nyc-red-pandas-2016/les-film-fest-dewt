import React, { Component } from 'react';
import $ from 'jquery';
// import _ from 'lodash';

export default class SignUp extends Component {
  constructor() {
    super();
  //   this.state = {
  //     username: '',
  //     email: '',
  //     type: '',
  //     password: '',
  //     password_confirmation: ''
    this.handleRegistrationClick = this.handleRegistrationClick.bind(this)
  }
  handleRegistrationClick(event) {
    debugger;
    event.preventDefault();
    var username = this.refs.usernameInput.value
    var email = this.refs.emailInput.value
    var type = this.refs.typeInput.value
    var password = this.refs.passwordInput.value
    var passwordConfirmation = this.refs.passwordConfirmationInput.value
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/users.json",
      data: {
        user: {
          username: username,
          email: email,
          type: type,
          password: password,
          passwordConfirmation: passwordConfirmation,
        },
      }
    }).done(function(data) {
      location.reload();
  }.bind(this));
}

  render() {
    return (
      <div>
        <p>Sign Up Form</p>
        <form>
          <input type='text'
            name='username'
            placeholder='username'
            //value={this.state.username}
            ref="usernameInput" />

          <input type='email'
            name='email'
            placeholder='email'
            //value={this.state.email}
            ref="emailInput" />

          <select name="type" ref="typeInput">
            <option>Reviewer</option>
            <option>Plebeian</option>
          </select>

          <input type='password'
            name='password'
            placeholder='password'
            //value={this.state.password}
            ref="passwordInput" />

          <input type='password'
            name='password_confirmation'
            placeholder='re-type password'
            //value={this.state.password_confirmation}
            ref="passwordConfirmationInput" />
          <input type='submit' onClick={this.handleRegistrationClick} defaultValue="sign up"/>

        </form>
      </div>
    )
  }
}
