import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import MovieList from './components/MovieList';
import Axios from 'axios'

export default class App extends Component {
  constructor(){
  super();
  this.state = {
    movies:[]
  }
  this.filterGenre = this.filterGenre.bind(this)
  this.getMovies = this.getMovies.bind(this)
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

componentDidMount(){
  let showAll = 'http://localhost:3000/movies'
  this.getMovies(showAll)
}

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
        <MovieList movieData={this.state.movies} filterGenre={this.filterGenre.bind(this)} />
          {this.props.children}
        </div>
      </div>
    );
  }
}
