import React, { Component } from 'react';
import $ from 'jquery';
// import _ from 'lodash';

export default class SignUp extends Component {
  constructor() {
    super();
    this.handleRegistrationClick = this.handleRegistrationClick.bind(this)
  }
  handleRegistrationClick(event) {
    event.preventDefault();
    var username = this.refs.usernameInput.value
    var email = this.refs.emailInput.value
    var type = this.refs.typeInput.value
    var password = this.refs.passwordInput.value
    var passwordConfirmation = this.refs.passwordConfirmationInput.value
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/users",
      data: {
        user: {
          username: username,
          email: email,
          type: type,
          password: password,
          passwordConfirmation: passwordConfirmation
        },
      }
    }).done(function(response) {
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
      });
  }

  render() {
    return (
      <div>
        <p>Sign Up Form</p>
        <form>
          <input type='text'
            name='username'
            placeholder='username'
            ref="usernameInput" />

          <input type='email'
            name='email'
            placeholder='email'
            ref="emailInput" />

          <select name="type" ref="typeInput">
            <option>Reviewer</option>
            <option>Plebeian</option>
          </select>

          <input type='password'
            name='password'
            placeholder='password'
            ref="passwordInput" />

          <input type='password'
            name='password_confirmation'
            placeholder='re-type password'
            ref="passwordConfirmationInput" />
          <input type='submit' onClick={this.handleRegistrationClick} defaultValue="sign up"/>

        </form>
      </div>
    )
  }
}
