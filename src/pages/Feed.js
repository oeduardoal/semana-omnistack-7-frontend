import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';
import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

export default class Pages extends Component {
  state = {
    feed: []
  }

  handleLike = async id => {
    await api.post(`/posts/${id}/like`)
  }
  registerToSocket = () => {
    const socket = io('http://localhost:3333');
    socket.on('post', newPost => {
      this.setState({
        feed: [newPost, ...this.state.feed]
      })
    })
    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post => (
          post._id === likedPost._id ? likedPost : post
        ))
      })
    })
  }
  async componentDidMount(){
    const { data } = await api.get('/posts');
    this.registerToSocket();
    this.setState({ feed: data });
  }
  render() {
    return (
      <section id="post-list">
        {this.state.feed.map(item => (
          <article key={item._id}>
          <header>
            <div className="user-info">
              <span>{item.author}</span>
              <span className="place">{item.place}</span>
            </div>
            <img src={more} alt="More"/>
          </header>
          <img src={`http://localhost:3333/files/${item.image}`} alt=""></img>
          <footer>
            <div className="actions">
              <button type="button" onClick={() => this.handleLike(item._id)}>
                <img src={like} alt="Like"/>
              </button>
              <img src={comment} alt="Comment"/>
              <img src={send} alt="Send"/>
            </div>
            <strong>{item.likes} curtidas</strong>
            <p>{item.description}
              <span>{item.hashtags}</span>
            </p>
          </footer>
        </article>
        ))}
        
      </section>
    );
  }
}
