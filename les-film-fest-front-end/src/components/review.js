class Review extends React.Component {
  constructor() {
    super();

    this.state = {
      review: null
    }
    componentDidMount() {
      $.ajax({
        url: 'reviews/1'
        method: 'GET'
      }).done((respond) => {
        this.setState ({
          review: response
        });
      });
    }
  }

  render() {
    return(
      var data = this.state.review
      <div className="review-container">
        <h3>{data.title}</h3>
        <p>{data.body}</p>
      </div>
      )
  }
}