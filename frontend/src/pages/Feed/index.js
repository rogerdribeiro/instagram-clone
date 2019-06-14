import React, { Component } from "react";
import io from "socket.io-client";

import api from "../../services/api";
import "./styles.css";
import more from "../../assets/more.svg";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import send from "../../assets/send.svg";

export default class Feed extends Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    this.registerToSocket();
    const { data } = await api.get("/posts");
    this.setState({ posts: data });
    console.log(this.state.posts);
  }

  registerToSocket = () => {
    const socket = io("http://localhost:3333");

    socket.on("post", newPost => {
      this.setState({
        posts: [newPost, ...this.state.posts]
      });
    });

    socket.on("like", likedPost => {
      this.setState({
        posts: this.state.posts.map(post =>
          post._id === likedPost._id ? likedPost : post
        )
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };
  render() {
    const { posts } = this.state;
    return (
      <section id="post-list">
        {posts.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>

              <img src={more} />
            </header>

            <img
              src={`http://localhost:3333/files/${post.image}`}
              alt={post.image}
            />

            <footer>
              <div className="actions">
                <button onClick={() => this.handleLike(post._id)}>
                  <img src={like} />
                </button>
                <img src={comment} />
                <img src={send} />
              </div>
              <strong> {post.likes} likes </strong>
              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}
