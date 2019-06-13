import React, { Component } from 'react';
import api from '../services/api';
import './New.css';
export default class New extends Component {
  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: ''
  }

  handleSubmit =  async e => {
    e.preventDefault();
    const form = new FormData();
    form.append('image', this.state.image);
    form.append('author', this.state.author);
    form.append('place', this.state.place);
    form.append('description', this.state.description);
    form.append('hashtags', this.state.hashtags);
    await api.post('/posts', form);
    this.props.history.push('/');
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    })
  }

  handleImageChange = e => {
    this.setState({
      image: e.target.files[0]
    })
  }

  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange}/>
        <input
          type="text"
          name="author"
          onChange={this.handleChange}
          value={this.state.author}
          placeholder="Autor do post"/>
        <input
          type="text"
          name="place"
          onChange={this.handleChange}
          value={this.state.place}
          placeholder="Local do post"/>
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="Descrição do post"/>
        <input
          type="text"
          name="hashtags"
          value={this.state.hashtags}
          onChange={this.handleChange}
          placeholder="Hashtags do post"/>
        <button type="submit">Enviar</button>
      </form>
    );
  }
}
