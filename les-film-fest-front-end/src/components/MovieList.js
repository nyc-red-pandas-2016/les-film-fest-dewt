import React,{Component} from "react";
import Movie from './Movie';
import Axios from 'axios'
export default class MovieList extends Component{
  constructor(){
    super();
    this.state = {
      genres:[]
    }
  }
  componentDidMount(){
    Axios.get('http://localhost:3000/genres').then((response)=>{
        this.setState({
          genres: response.data
        })
    }).catch((error)=>{console.log(error)})
  }
  getGenre(e){
    e.preventDefault();
    let genre = e.target.id
    console.log(genre)
    this.props.filterGenre(genre);
  }

  render(){
      let movies = this.props.movieData
      return(
        <div>
        <ul className="movie-genres">
          {this.state.genres.map((genre,index)=>{
             return(<li key={index}>
               <a ref="movieGenre" id={genre.name} className="genreBtn" href={genre.name}  onClick={this.getGenre.bind(this)} >{genre.name}</a>
               </li>)
            }
            // end of map
          )}
        </ul>
        <ul className="movie-list">

            {movies.map((movie,index)=>{
             return(
               <li key={index}>
                <Movie movieInfo={movie}/>
                </li>
             )
            })
            }
        </ul>
        </div>
        // end of return
      )
    // end of render
  }
}
