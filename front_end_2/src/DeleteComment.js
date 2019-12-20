import React from "react";

function DeleteComment(props) {
  return (
    <div>
      <input
        className="deleteEditCommentButton"
        type="submit"
        value="Delete Comment"
        onClick={() => {
          props.onClickDelete(props.commentid);
        }}
      />
    </div>
  );
}

export default DeleteComment;
