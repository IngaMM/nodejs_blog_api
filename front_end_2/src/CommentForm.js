import React from "react";
import { Editor } from "@tinymce/tinymce-react";

function CommentForm(props) {
  return (
    <form onSubmit={e => props.handleSubmit(e, props.commentid)}>
      <h2> {props.header} </h2>
      <div className="formContainer">
        <label htmlFor="content">Content</label>
        <Editor
          initialValue={props.content}
          apiKey="kwhs0tzhj0zkg0n3x9af7u348954qd94oj1f84855abnyuio"
          init={{
            height: 250,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
          }}
          onChange={e =>
            props.onChange("content", e.target.getContent(), props.commentid)
          }
        />
      </div>
      <button
        type="submit"
        id="submitComment"
        className="deleteEditCommentButton"
      >
        {props.buttonValueSubmit}
      </button>
    </form>
  );
}

export default CommentForm;
