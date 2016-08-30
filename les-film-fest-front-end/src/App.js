import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import Axios from 'axios'

export default class App extends Component {
  render() {
    return (
      <div>
        <section id="header">
          <h1 id="site-logo">LES Film Fest</h1>
          <ul id="nav-bar">
            <li><Link to="/sign_up">Sign Up</Link></li>
            <li><Link to="/sign_in">Sign In</Link></li>
            <li><Link to="/">Home</Link></li>
          </ul>
        </section>
        <div id="page-contents">
          {this.props.children}
        </div>
      </div>
    );
  }
}
