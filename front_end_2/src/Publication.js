import React from "react";

function Publication(props) {
  let buttonValue = props.published === true ? "Unpublish" : "Publish";
  return (
    <div>
      {props.published ? (
        <span className="highlight"> Published </span>
      ) : (
        <span className="highlight"> Not published</span>
      )}
      <input
        id="publishButton"
        type="submit"
        value={buttonValue}
        onClick={() => {
          props.onClickPublication(props.postid);
        }}
      />
    </div>
  );
}

export default Publication;
