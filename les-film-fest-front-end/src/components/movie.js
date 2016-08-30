class Movie extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: null
    }
    componentDidMount() {
      $.ajax({
        url: 'movies/1'
        method: 'GET'
      }).done((respond) => {
        this.setState ({
          movie: response
        });
      });
    }
  }

  render() {
    return(
      var data = this.state.movie
      <div className="container">
        <h1>{data.title}</h1>
        <p>{data.year}</p>
        <img src={data.poster_url}/>
        <p>{data.description}</p>
      </div>
      )
  }
}