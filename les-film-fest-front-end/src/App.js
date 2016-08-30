import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import Axios from 'axios'
import $ from 'jquery';

export default class App extends Component {
  constructor(){
  super();
  this.state = {
    movies:[],
    signedIn: null,
    user: null
  }
  this.filterGenre = this.filterGenre.bind(this)
  this.getMovies = this.getMovies.bind(this)
  this.logOut = this.logOut.bind(this)
  }

  getMovies(url){
    Axios.get(url)
    .then((response)=>{
        this.setState({
          movies:response.data
        })
      // end of then
    }).catch((errors)=>{
      console.log(errors)
      // end of catch
    })
  }

  filterGenre(genre){
    let movieGenre = `http://localhost:3000/genres/${genre}`
    this.getMovies(movieGenre)
  }

  logOut(){
    localStorage.removeItem('currentUser')
    location.replace('/');
  }

  componentDidMount(){
    let showAll = 'http://localhost:3000/movies'
    this.getMovies(showAll)
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/auth/is_signed_in.json"
    }).done(function(data){
      this.setState({ signedIn: data.signed_in, user: data.user });
    }.bind(this));
  }

  render() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return (
      <div>
        <section id="header">
          <h1 id="site-logo">LES Film Fest</h1>
          <ul id="nav-bar"> { !currentUser ?
            <span>
              <li><Link to="/sign_up">Sign Up</Link></li>
              <li><Link to="/sign_in">Sign In</Link></li>
            </span>
            :
            <li><button type="button" onClick={this.logOut}>Log Out</button></li> }
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
