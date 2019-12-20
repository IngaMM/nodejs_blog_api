import React from "react";
import CommentDetails from "./CommentDetails";

class Commentlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      comments: []
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    let url = "http://localhost:3000/post/" + this.props.postid;
    fetch(url, { mode: "cors" })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState(state => ({
          comments: response.comments,
          showComments: !state.showComments
        }));
      });
  };

  render() {
    let comments = this.state.comments.map((comment, index) => (
      <Comment key={index} content={comment.content} commentid={comment._id} />
    ));
    if (this.state.comments.length > 0) {
      return (
        <div>
          {this.state.showComments ? (
            <div className="indentation">
              <h3> Comments </h3>
              {comments}
            </div>
          ) : null}
          <input type="submit" value="Toggle Comments" onClick={this.onClick} />
        </div>
      );
    } else {
      return (
        <div>
          {this.state.showComments ? (
            <div className="indentation">
              <h3> No Comments </h3>
            </div>
          ) : null}
          <input type="submit" value="Toggle Comments" onClick={this.onClick} />
        </div>
      );
    }
  }
}

function Comment(props) {
  return (
    <div>
      <p>{props.content}</p>
      <CommentDetails commentid={props.commentid} />
    </div>
  );
}

export default Commentlist;
