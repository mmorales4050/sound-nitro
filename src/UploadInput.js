import React, { Component } from 'react';

class UploadInput extends Component {

  URL = "http://localhost:3000/"

  submitSong = (file, name, artist) => {
    var formData = new FormData()
    formData.append("name", name)
    formData.append("artist", artist)
    formData.append("file", file)
    fetch("http://localhost:3000/songs", {
    	method: "POST",
    	body: formData
    }).then(console.log)
  }

  readFile = (event) => {
    event.preventDefault()
    event.persist()
    let name = event.target.childNodes[1].value
    let artist = event.target.childNodes[3].value
    let file = event.target.childNodes[5].files[0]
    this.submitSong(file, name, artist)
  }

  render() {
    return (
      <div>
      <form onSubmit={this.readFile}>
      Song Name:
      <input type="text"/>
      Artist Name:
      <input type="text"/>
      File:
      <input type='file'/>
      <button type="submit">Submit</button>
      </form>
      </div>
    );
  }

}

export default UploadInput;
