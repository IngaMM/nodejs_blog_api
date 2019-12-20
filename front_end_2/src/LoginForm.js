import React from "react";

function LoginForm(props) {
  return (
    <form onSubmit={e => props.handleSubmit(e)}>
      <h2> Log in to edit</h2>
      <div className="formContainer">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={props.username}
          required
          onChange={e => {
            props.onChange("username", e.target.value);
          }}
        ></input>
      </div>
      <div className="formContainer">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={props.password}
          required
          onChange={e => {
            props.onChange("password", e.target.value);
          }}
        ></input>
      </div>
      <button type="submit" id="login" className="deleteEditButton">
        Log in
      </button>
    </form>
  );
}

export default LoginForm;
