import React from "react";

function Logout(props) {
  return (
    <div>
      <input
        className="deleteEditButton"
        type="submit"
        value="Logout"
        onClick={() => {
          props.onClickLogout();
        }}
      />
    </div>
  );
}

export default Logout;
