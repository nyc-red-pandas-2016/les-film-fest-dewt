import React, { Component } from 'react';
import $ from 'jquery';

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      errors: null,
    }
    this.handleLoginClick = this.handleLoginClick.bind(this)
  }
  handleLoginClick(event) {
    event.preventDefault();
    var email = this.refs.emailInput.value
    var password = this.refs.passwordInput.value
    var loginRequest = $.ajax({
      method: "POST",
      url: "http://localhost:3000/users/sign_in.json",
      data: {
        user: {
          email: email,
          password: password,
        },
      }
    })
    loginRequest.done(function(user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      location.replace('/');
  }.bind(this));
    loginRequest.fail(function(response)
    {
      this.setState({ error: response.responseText.substring(10, response.responseText.length - 2) });
      debugger
    }.bind(this));
  }

  render() {
    return (
      <div>
        <p>Sign In Form</p>
        { this.state.error ? <p> {this.state.error} </p> : <br/>}
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
