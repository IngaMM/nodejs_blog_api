import React from "react";
import CommentDetails from "./CommentDetails";
var lodash = require("lodash");

class Commentlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      comments: []
    };
    this.onClick = this.onClick.bind(this);
    this.onClickDeleteComment = this.onClickDeleteComment.bind(this);
  }

  onClick() {
    let url = "http://localhost:3000/post/" + this.props.postid;
    fetch(url, { mode: "cors" })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          comments: response.comments,
          showComments: !this.state.showComments
        });
      });
  }

  onClickDeleteComment(commentid) {
    let indexComment = this.state.comments.findIndex(
      comment => comment._id === commentid
    );
    this.setState(state => {
      let comments = lodash.cloneDeep(state.comments);
      comments.splice(indexComment, 1);
      return { comments };
    });
  }

  render() {
    if (this.state.comments.length > 0) {
      return (
        <div>
          {this.state.showComments ? (
            <div className="indentation">
              <h3> Comments </h3>
              <CommentDetails
                comments={this.state.comments}
                onClickDeleteComment={this.onClickDeleteComment}
                token={this.props.token}
              />
            </div>
          ) : null}
          <input
            type="submit"
            className="deleteEditButton"
            value="Toggle Comments"
            onClick={this.onClick}
          />
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
          <input
            type="submit"
            className="deleteEditButton"
            value="Toggle Comments"
            onClick={this.onClick}
          />
        </div>
      );
    }
  }
}

export default Commentlist;
