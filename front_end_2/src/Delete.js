import React from "react";

function Delete(props) {
  return (
    <div>
      <input
        className="deleteEditButton"
        type="submit"
        value="Delete Post"
        onClick={() => {
          props.onClickDelete(props.postid);
        }}
      />
    </div>
  );
}

export default Delete;
