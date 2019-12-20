import React from "react";
import CommentForm from "./CommentForm";

class EditCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    };
    this.onClickToggleForm = this.onClickToggleForm.bind(this);
  }

  onClickToggleForm() {
    this.setState(state => ({
      showForm: !state.showForm
    }));
  }

  render() {
    let buttonValue =
      this.state.showForm === false ? "Edit Comment" : "Hide Form";
    return (
      <div>
        <input
          className="deleteEditButton"
          type="submit"
          value={buttonValue}
          onClick={this.onClickToggleForm}
        />
        {this.state.showForm ? (
          <CommentForm
            header="Edit Comment"
            content={this.props.input.content}
            commentid={this.props.commentid}
            onChange={this.props.handleChangedInputFormEdit}
            handleSubmit={this.props.submitEditComment}
            buttonValueSubmit="Change Comment"
          />
        ) : null}
      </div>
    );
  }
}

export default EditCommentForm;
