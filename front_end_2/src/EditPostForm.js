import React from "react";
import PostForm from "./PostForm";

class EditPostForm extends React.Component {
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
    let buttonValue = this.state.showForm === false ? "Edit Post" : "Hide Form";
    return (
      <div>
        <input
          className="deleteEditButton"
          type="submit"
          value={buttonValue}
          onClick={this.onClickToggleForm}
        />
        {this.state.showForm ? (
          <PostForm
            header="Edit Post"
            title={this.props.input.title}
            content={this.props.input.content}
            published={this.props.input.published}
            postid={this.props.postid}
            onChange={this.props.handleChangedInputFormEdit}
            handleSubmit={this.props.submitEditPost}
            buttonValueSubmit="Change Post"
            idFormat="editForm"
          />
        ) : null}
      </div>
    );
  }
}

export default EditPostForm;
