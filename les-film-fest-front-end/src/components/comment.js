class Comment extends React.Component {
  constructor() {
    super();

    this.state = {
      comment: null
    }
    componentDidMount() {
      $.ajax({
        url: 'comments/1'
        method: 'GET'
      }).done((respond) => {
        this.setState ({
          comment: response
        });
      });
    }
  }

  render() {
    return(
      var data = this.state.comment
      <div className="comment-container">
        <p>{data.body}</p>
      </div>
      )
  }
}