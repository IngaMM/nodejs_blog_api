import React from "react";
import DeleteComment from "./DeleteComment";
import EditCommentForm from "./EditCommentForm";
var lodash = require("lodash");
var moment = require("moment");

class CommentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentDetails: [],
      inputComments: []
    };
    this.getCommentDetails = this.getCommentDetails.bind(this);
    this.handleChangedInputFormEdit = this.handleChangedInputFormEdit.bind(
      this
    );
    this.submitEditComment = this.submitEditComment.bind(this);
    this.onClickDeleteComment = this.onClickDeleteComment.bind(this);
  }

  componentDidMount() {
    this.getCommentDetails();
  }

  getCommentDetails() {
    let urls = [];
    for (let i = 0; i < this.props.comments.length; i++) {
      urls.push("http://localhost:3000/comment/" + this.props.comments[i]._id);
    }
    Promise.all(urls.map(u => fetch(u)))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(response => {
        this.setState({
          commentDetails: response,
          inputComments: response
        });
      });
  }

  onClickDeleteComment(commentid) {
    let url = "http://localhost:3000/comment/" + commentid;
    let indexComment = this.state.commentDetails.findIndex(
      comment => comment._id === commentid
    );
    fetch(url, {
      mode: "cors",
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + this.props.token
      })
    }).then(response => {
      this.setState(
        state => {
          let commentDetails = lodash.cloneDeep(state.commentDetails);
          let inputComments = lodash.cloneDeep(state.inputComments);
          commentDetails.splice(indexComment, 1);
          inputComments.splice(indexComment, 1);
          return { commentDetails, inputComments };
        },
        () => {
          this.props.onClickDeleteComment(commentid);
        }
      );
    });
  }

  handleChangedInputFormEdit(name, value, commentid) {
    let indexComment = this.state.inputComments.findIndex(
      comment => comment._id === commentid
    );
    this.setState(state => {
      const inputComments = lodash.cloneDeep(state.inputComments);
      inputComments[indexComment][name] = value;
      return {
        inputComments
      };
    });
  }

  submitEditComment(event, commentid) {
    event.preventDefault(); // Do not reload!
    let url = "http://localhost:3000/comment/" + commentid;
    let indexComment = this.state.commentDetails.findIndex(
      comment => comment._id === commentid
    );
    let details = {
      content: this.state.inputComments[indexComment].content,
      timestamp: Date.now()
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(url, {
      mode: "cors",
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + this.props.token
      }),
      body: formBody
    }).then(response => {
      this.setState(state => {
        const commentDetails = lodash.cloneDeep(state.commentDetails);
        const inputComments = lodash.cloneDeep(state.inputComments);
        commentDetails[indexComment] = details;
        inputComments[indexComment] = details;
        return {
          commentDetails,
          inputComments
        };
      });
    });
  }

  render() {
    let comments = this.state.commentDetails.map((comment, index) => (
      <Comment
        key={index}
        content={comment.content}
        timestamp={comment.timestamp}
        author={comment.author}
        commentid={comment._id}
        input={this.state.inputComments[index]}
        onClickDelete={this.onClickDeleteComment}
        handleChangedInputFormEdit={this.handleChangedInputFormEdit}
        submitEditComment={this.submitEditComment}
      />
    ));
    return <div>{comments}</div>;
  }
}

function Comment(props) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
      <p>
        <span className="highlight">Last edited at:</span>{" "}
        {moment(props.timestamp).format("LLL")}
      </p>
      <p>
        <span className="highlight">By:</span> {props.author}
      </p>
      <DeleteComment
        onClickDelete={props.onClickDelete}
        commentid={props.commentid}
      />
      <EditCommentForm
        input={props.input}
        commentid={props.commentid}
        handleChangedInputFormEdit={props.handleChangedInputFormEdit}
        submitEditComment={props.submitEditComment}
      />
    </div>
  );
}

export default CommentDetails;
