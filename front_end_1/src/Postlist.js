import React from "react";
import Commentlist from "./Commentlist";
var moment = require("moment");

class Postlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch("http://localhost:3000/posts", { mode: "cors" })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          posts: response
        });
      });
  }

  render() {
    let posts = this.state.posts
      .filter(post => post.published)
      .map((post, index) => (
        <Post
          key={index}
          postid={post._id}
          title={post.title}
          content={post.content}
          timestamp={post.timestamp}
        />
      ));

    return <div>{posts}</div>;
  }
}

function Post(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <p>
        {" "}
        <span className="highlight">Last edited at</span>:{" "}
        {moment(props.timestamp).format("LLL")}{" "}
      </p>
      <Commentlist postid={props.postid} />
    </div>
  );
}

export default Postlist;
