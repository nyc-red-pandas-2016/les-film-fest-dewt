import React,{Component} from 'react';
import { Link } from 'react-router';
import './App.css';
import Axios from 'axios';

export default class MovieView extends Component{
  constructor() {
    super();
    this.state = {
      movieInfo: {},
      reviews: [],
      reviewFormVisible: false
    }
    this.getMovieInfo = this.getMovieInfo.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.toggleAddReviewForm = this.toggleAddReviewForm.bind(this);
  }

  componentDidMount() {
    this.getMovieInfo();
    this.getReviews();
  }

  getMovieInfo() {
    Axios.get(`http://localhost:3000/movies/${this.props.params.movie_id}`)
      .then((response) => {
        this.setState({
          movieInfo: response.data
        })
      })
  }

  getReviews() {
    Axios.get(`http://localhost:3000/movies/${this.props.params.movie_id}/reviews`)
      .then((response) => {
        this.setState({
          reviews: response.data
        })
    })
  }

  toggleAddReviewForm() {
    this.setState({
      reviewFormVisible: !this.state.reviewFormVisible
    })
  }

  render() {
    let {title,description,poster_url,year} = this.state.movieInfo
    return(
      <div className="movie-display">
        <div className="movie-info">
          <h2 className="movie-title">{title} ({year})</h2>
          <img src={poster_url} alt={title} className="movie-poster"/>
          <span className="plot-details">
            <p className="plot-header">Plot:</p>
            <p>{description}</p>
          </span>
        </div>
        <div>
          <h2 className="review-header">Reviews for {title}</h2>
          { this.state.reviews.map((review, index) => {
            return (
              <li key={index} className="review-list">
                <Link to={`/movies/${this.props.params.movie_id}/reviews/${review.id}`} >
                  {review.title}
                </Link>
              </li>
            )}
          )}
        </div>
        <button onClick={this.toggleAddReviewForm}>
          { this.state.reviewFormVisible ?
              <p>Hide review form</p>
            :
              <p>Add a review</p>
          }
        </button>
        { this.state.reviewFormVisible ? 
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="review[title]" className="form-label">Title:</label>
              <input type="text" name="review[title]" className="form-input"/>
              <label htmlFor="review[body]" className="form-label">Body:</label>
              <textarea rows="5" cols="30" name="review[body]" className="form-textarea"></textarea>
              <input type="submit" value="Add Review" className="form-input"/>
            </form>
          :
            null
        }
        <div className="review-display">
          {this.props.children}
        </div>
      </div>
    )
  }
}