import React from "react";
import { Editor } from "@tinymce/tinymce-react";

function PostForm(props) {
  return (
    <form
      onSubmit={e => props.handleSubmit(e, props.postid)}
      id={props.idFormat}
    >
      <h2> {props.header} </h2>
      <div className="formContainer">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={props.title}
          required
          onChange={e => {
            props.onChange("title", e.target.value, props.postid);
          }}
        ></input>
      </div>
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
            props.onChange("content", e.target.getContent(), props.postid)
          }
        />
      </div>
      <div>
        <p> Publish immediately? </p>
        <label htmlFor="published_true">Yes</label>
        <input
          type="radio"
          id="published_true"
          value="true"
          onChange={e =>
            props.onChange("published", e.target.value, props.postid)
          }
          checked={props.published === true}
        />
        <label htmlFor="published_false">No</label>
        <input
          type="radio"
          id="published_false"
          value="false"
          onChange={e =>
            props.onChange("published", e.target.value, props.postid)
          }
          checked={props.published === false}
        />
      </div>
      <button type="submit" id="submitPost" className="deleteEditButton">
        {props.buttonValueSubmit}
      </button>
    </form>
  );
}

export default PostForm;
