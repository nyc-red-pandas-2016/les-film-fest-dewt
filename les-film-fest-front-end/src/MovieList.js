import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import Movie from './components/Movie';
import Axios from 'axios';

export default class MovieList extends Component{
  constructor(){
    super();
    this.state = {
      genres: [],
      movies: []
    };
    this.filterGenre = this.filterGenre.bind(this);
    this.getMovies = this.getMovies.bind(this);
  }
  
  componentDidMount() {
    Axios.get('http://localhost:3000/genres').then((response)=>{
        this.setState({
          genres: response.data
        })
    }).catch((error)=>{console.log(error)})

    let showAll = 'http://localhost:3000/movies'
    this.getMovies(showAll)
  }

  getMovies(url) {
    Axios.get(url)
    .then((response)=>{
        this.setState({
          movies: response.data
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

  getGenre(e){
    e.preventDefault();
    let genre = e.target.id
    this.filterGenre(genre);
  }

  render(){
      let movies = this.state.movies
      return(
        <div>
          <ul className="movie-genres">
            { this.state.genres.map((genre,index) => {
              return (
              <li key={index}>
                <a ref="movieGenre"
                  id={genre.name}
                  className="genreBtn"
                  href={genre.name}
                  onClick={this.getGenre.bind(this)} >
                  {genre.name}
                </a>
              </li>
              )}
            )}
          </ul>
          <ul className="movie-list">
            {movies.map((movie,index) => {
              return(
                <Link to={`/movies/${movie.id}`} key={index}>
                  <div className="movie-list-item">
                    <li>
                      <img src={movie.poster_url} className="thumbnail"/>
                      {movie.title}
                    </li>
                  </div>
                </Link>
              )}
            )}
          </ul>
        </div>
      )
    }
  }