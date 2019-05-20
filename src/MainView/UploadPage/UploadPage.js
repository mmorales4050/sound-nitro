import React, { Component } from 'react';
import { Button, Icon, Form, Segment, Input, List} from 'semantic-ui-react'
import './UploadPage.css'
import SongInputField from '../SongInputField/SongInputField'
import {connect} from 'react-redux'
import * as api from "../../Api/Api"

class UploadPage extends Component {

  toggleSubmit = "disabled"

  fileChange = (event) => {
    this.toggleSubmit = ""
    this.props.dispatch({type: "CHOOSE_FILES_TO_UPLOAD", payload: event.target.files})
  }

  renderSongInputs = () => {
    var songInputs = []
    for (var i = 0; i < this.props.files.length; i++){
      songInputs.push(<SongInputField song={this.props.files[i]}/>)
    }
    return songInputs
  }

  uploadFiles = (event) => {
    // You can use event.target.elements to get the data from each form element
    event.persist()
    var songInfoList = event.target.childNodes[3].childNodes
    var songs = []
    for (let i = 0; i < songInfoList.length; i++) {
      var songTitle = songInfoList[i].childNodes[0].childNodes[1].firstElementChild.lastElementChild.firstElementChild.value
      var songArtist = songInfoList[i].childNodes[0].childNodes[2].firstElementChild.lastElementChild.firstElementChild.value
      songs.push({title: songTitle, artist: songArtist})
    }

    var files = event.target.childNodes[2].files

    for (let i = 0; i < files.length; i++) {
      songs[i].file = files[i]
    }

    var formData = new FormData()
    songs.forEach((song, i) => {
      formData.append("title" + i, song.title)
      formData.append("artist" + i, song.artist)
      formData.append("file" + i, song.file)
    })

    fetch("http://localhost:3000/songs", {
    	method: "POST",
    	body: formData
    }).then(console.log)
  }

  render() {
    return (
      <Segment className="upload-page">
      <Form onSubmit={this.uploadFiles}>
        <Button as="label" htmlFor="file" color="orange">
        <Icon name='upload' />
        Choose Song

        </Button>
        <Button type="submit" className={this.toggleSubmit} color="orange">
        <Icon name='upload' />
        Upload Songs
        </Button>
        <input
          type="file"
          id="file"
          multiple="multiple"
          hidden
          onChange={this.fileChange}
          required
        />
        {!(this.props.files.length > 1)? null :

          <List divided relaxed>
          {this.renderSongInputs()}
          </List>

        }
        </Form>
        </Segment>
    );
  }

}

const mapStateToProps = (store) => ({
  files: store.files
})


export default connect(mapStateToProps)(UploadPage);
