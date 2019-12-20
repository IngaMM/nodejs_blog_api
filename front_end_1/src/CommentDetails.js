import React from "react";
var moment = require("moment");

class CommentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      details: {}
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    let url = "http://localhost:3000/comment/" + this.props.commentid;
    fetch(url, { mode: "cors" })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState(state => ({
          details: response,
          showDetails: !state.showDetails
        }));
      });
  };

  render() {
    let details = this.state.details;

    return (
      <div>
        {this.state.showDetails ? (
          <div>
            <p>
              {" "}
              <span className="highlight">Last edited at:</span>{" "}
              {moment(details.timestamp).format("LLL")}{" "}
            </p>
            <p>
              {" "}
              <span className="highlight">By:</span> {details.author}
            </p>
          </div>
        ) : null}
        <input type="submit" value="Toggle Details" onClick={this.onClick} />
      </div>
    );
  }
}

export default CommentDetails;
