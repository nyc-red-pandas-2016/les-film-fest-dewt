import React,{Component} from 'react'

export default class Movie extends Component{
  constructor() {
    super();
    this.state = {
      movieInfo: {},
      reviews: []
    }
  }

  componentDidMount() {
    
  }

  render(){
    let {title,description,poster_url,year} = this.state.movieInfo
    return(
      <div className="movie-info">
        <h2>{title}</h2>
        <img src={poster_url} alt={title}/>
        <p>{year}</p>
        <p>{description}</p>
      </div>
      // end of return
    )
    // end of render
  }
}
