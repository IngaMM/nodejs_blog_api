import React from "react";
import PostForm from "./PostForm";

class NewPostForm extends React.Component {
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
    let buttonValue = this.state.showForm === false ? "New Post" : "Hide Form";
    return (
      <div>
        <input
          id="newButton"
          type="submit"
          value={buttonValue}
          onClick={this.onClickToggleForm}
        />
        {this.state.showForm ? (
          <PostForm
            header="New Post"
            title={this.props.input.title}
            content={this.props.input.content}
            published={this.props.input.published}
            postid=""
            onChange={this.props.handleChangedInputFormNew}
            handleSubmit={this.props.submitNewPost}
            buttonValueSubmit="Submit Post"
          />
        ) : null}
      </div>
    );
  }
}

export default NewPostForm;
