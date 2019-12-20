import React from "react";
import "./App.css";
import Postlist from "./Postlist";
import LoginForm from "./LoginForm";
import Logout from "./Logout";

class App extends React.Component {
  constructor(props) {
    super(props);
    let token = "";
    let message = "";
    if (localStorage.getItem("token")) {
      token = JSON.parse(localStorage.getItem("token"));
    }

    this.state = {
      token: token,
      input: {
        password: "",
        username: ""
      },
      message: message
    };
    this.handleChangedInputFormLogin = this.handleChangedInputFormLogin.bind(
      this
    );
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChangedInputFormLogin = (name, value) => {
    this.setState(state => {
      const input = state.input;
      input[name] = value;
      return {
        input
      };
    });
  };

  login = event => {
    event.preventDefault(); // Do not reload!
    let url = "http://localhost:3000/auth/login";
    let details = {
      username: this.state.input.username,
      password: this.state.input.password
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(url, {
      mode: "cors",
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }),
      body: formBody
    })
      .then(response => response.json())
      .then(response => {
        if (response.token) {
          this.setState({
            token: response.token
          });
          localStorage.setItem("token", JSON.stringify(response.token));
        } else {
          this.setState({
            message: "Log in not successful. Try again."
          });
        }
      });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      token: ""
    });
  };

  render() {
    if (this.state.token === "") {
      return (
        <div className="App">
          <main className="App-main">
            <p>{this.state.message}</p>
            <LoginForm
              username={this.state.input.username}
              password={this.state.input.password}
              onChange={this.handleChangedInputFormLogin}
              handleSubmit={this.login}
            />
          </main>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Logout onClickLogout={this.logout} />
          <header className="App-header">
            <h1> Edit Page for My Blog </h1>
          </header>
          <main className="App-main">
            <Postlist token={this.state.token} />
          </main>
        </div>
      );
    }
  }
}

export default App;
