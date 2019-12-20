import React from "react";
import Publication from "./Publication";
import NewPostForm from "./NewPostForm";
import EditPostForm from "./EditPostForm";
import Delete from "./Delete";
import Commentlist from "./Commentlist";
var moment = require("moment");
var lodash = require("lodash");

class Postlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      input: {
        title: "",
        content: "",
        published: false
      },
      inputPosts: []
    };
    this.getPosts = this.getPosts.bind(this);
    this.onClickPublication = this.onClickPublication.bind(this);
    this.handleChangedInputFormNew = this.handleChangedInputFormNew.bind(this);
    this.handleChangedInputFormEdit = this.handleChangedInputFormEdit.bind(
      this
    );
    this.submitNewPost = this.submitNewPost.bind(this);
    this.submitEditPost = this.submitEditPost.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
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
          posts: response,
          inputPosts: response
        });
      });
  }

  onClickPublication(postid) {
    let url = "http://localhost:3000/post/" + postid;
    let indexPost = this.state.posts.findIndex(post => post._id === postid);
    let details = {
      published: !this.state.posts[indexPost].published,
      timestamp: Date.now()
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
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + this.props.token
      }),
      body: formBody
    }).then(response => {
      this.setState(state => {
        let posts = lodash.cloneDeep(state.posts);
        let inputPosts = lodash.cloneDeep(state.posts);
        posts[indexPost].published = details.published;
        posts[indexPost].timestamp = details.timestamp;
        inputPosts[indexPost].published = details.published;
        inputPosts[indexPost].timestamp = details.timestamp;
        return { posts, inputPosts };
      });
    });
  }

  onClickDelete(postid) {
    let url = "http://localhost:3000/post/" + postid;
    let indexPost = this.state.posts.findIndex(post => post._id === postid);
    fetch(url, {
      mode: "cors",
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + this.props.token
      })
    }).then(response => {
      this.setState(state => {
        let posts = lodash.cloneDeep(state.posts);
        let inputPosts = lodash.cloneDeep(state.posts);
        posts.splice(indexPost, 1);
        inputPosts.splice(indexPost, 1);
        return { posts, inputPosts };
      });
    });
  }

  handleChangedInputFormNew(name, value, postid) {
    this.setState(state => {
      const input = state.input;
      input[name] = value;
      if (name === "published") {
        input[name] = value === "true" ? true : false;
      }
      return {
        input
      };
    });
  }

  handleChangedInputFormEdit(name, value, postid) {
    let indexPost = this.state.inputPosts.findIndex(
      post => post._id === postid
    );
    this.setState(state => {
      const inputPosts = lodash.cloneDeep(state.inputPosts);
      inputPosts[indexPost][name] = value;
      if (name === "published") {
        inputPosts[indexPost][name] = value === "true" ? true : false;
      }
      return {
        inputPosts
      };
    });
  }

  submitNewPost(event, postid) {
    event.preventDefault(); // Do not reload!
    let url = "http://localhost:3000/posts";
    let details = {
      title: this.state.input.title,
      content: this.state.input.content,
      timestamp: Date.now(),
      published: this.state.input.published
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
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + this.props.token
      }),
      body: formBody
    }).then(response => {
      this.setState(state => {
        const posts = state.posts.concat(details);
        const input = {
          title: "",
          content: "",
          published: false
        };
        return {
          posts,
          input
        };
      });
    });
  }

  submitEditPost(event, postid) {
    event.preventDefault(); // Do not reload!
    let url = "http://localhost:3000/post/" + postid;
    let indexPost = this.state.posts.findIndex(post => post._id === postid);
    let details = {
      title: this.state.inputPosts[indexPost].title,
      content: this.state.inputPosts[indexPost].content,
      timestamp: Date.now(),
      published: this.state.inputPosts[indexPost].published
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
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + this.props.token
      }),
      body: formBody
    }).then(response => {
      this.setState(state => {
        const posts = lodash.cloneDeep(state.posts);
        const inputPosts = lodash.cloneDeep(state.inputPosts);
        posts[indexPost] = details;
        inputPosts[indexPost] = details;
        return {
          posts,
          inputPosts
        };
      });
    });
  }

  render() {
    let posts = this.state.posts.map((post, index) => (
      <Post
        key={index}
        postid={post._id}
        title={post.title}
        content={post.content}
        timestamp={post.timestamp}
        published={post.published}
        input={this.state.inputPosts[index]}
        onClickPublication={this.onClickPublication}
        onClickDelete={this.onClickDelete}
        handleChangedInputFormEdit={this.handleChangedInputFormEdit}
        submitEditPost={this.submitEditPost}
        token={this.props.token}
      />
    ));

    return (
      <div>
        <div>{posts}</div>
        <NewPostForm
          input={this.state.input}
          handleChangedInputFormNew={this.handleChangedInputFormNew}
          submitNewPost={this.submitNewPost}
        />
      </div>
    );
  }
}

function Post(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
      <p>
        <span className="highlight">Last edited at:</span>{" "}
        {moment(props.timestamp).format("LLL")}
      </p>
      <Publication
        published={props.published}
        onClickPublication={props.onClickPublication}
        postid={props.postid}
      />
      <Delete onClickDelete={props.onClickDelete} postid={props.postid} />
      <EditPostForm
        input={props.input}
        postid={props.postid}
        handleChangedInputFormEdit={props.handleChangedInputFormEdit}
        submitEditPost={props.submitEditPost}
      />
      <Commentlist postid={props.postid} token={props.token} />
    </div>
  );
}

export default Postlist;
