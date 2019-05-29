import React, { Component } from 'react';
import {Howl} from 'howler'
import { Button, Icon, Form, Segment, Input, List, Dimmer, Loader} from 'semantic-ui-react'
import './UploadPage.css'
import SongInputField from '../SongInputField/SongInputField'
import {connect} from 'react-redux'

class UploadPage extends Component {

  state = {
    loading: false,
    toggleSubmit: "disabled"
  }

  fileChange = (event) => {
    this.setState({toggleSubmit: ""})
    this.props.dispatch({type: "SET_FILES", payload: event.target.files})
  }

  renderSongInputs = () => {
    var songInputs = []
    for (var i = 0; i < this.props.files.length; i++){
      songInputs.push(<SongInputField song={this.props.files[i]} key={i}/>)
    }
    return songInputs
  }

  uploadFiles = (event) => {
    // You can use event.target.elements to get the data from each form element
    var startingIndex
    if(this.props.songs.length < 1){
      startingIndex = 0
    }else{
      startingIndex = this.props.songs[this.props.songs.length - 1].index + 1
    }

    var songInfoList = event.target.childNodes[2].childNodes
    var songs = []
    for (let i = 0; i < songInfoList.length; i++) {
      var songTitle = songInfoList[i].childNodes[0].childNodes[1].firstElementChild.lastElementChild.firstElementChild.value
      var songArtist = songInfoList[i].childNodes[0].childNodes[2].firstElementChild.lastElementChild.firstElementChild.value
      var songIndex = startingIndex
      startingIndex += 1
      songs.push({title: songTitle, artist: songArtist, index: songIndex})
    }

    var files = event.target.childNodes[1].files
    for (let i = 0; i < files.length; i++) {
      songs[i].file = files[i]
    }


    songs.forEach((song, i) => {
      var formData = new FormData()
      formData.append("title", song.title)
      formData.append("artist", song.artist)
      formData.append("file", song.file)
      formData.append("index", song.index)
      fetch("http://localhost:3000/songs", {
      	method: "POST",
      	body: formData
      })
      .then((response)=>response.json())
      .then((response)=>{
          console.log(response)
        // Add duration to songs
          var howl = new Howl({
            src: response.url,
            onload: () => {
              var formData = new FormData()
              formData.append("duration", howl.duration())
              fetch("http://localhost:3000/songs/" + response.id, {
              	method: "PATCH",
                header: {"Content-Type":"application/json"},
              	body: formData
              })
              .then(response => response.json())
              .then(response => {
                this.props.dispatch({
                  type: "ADD_SONGS",
                  payload: response
                })
                console.log(response + "added to state")
              })
              .then(()=>{
                if(i === songs.length - 1){
                  this.setState({loading: false})
                  this.props.dispatch({type: "DELETE_FILES"})
                }
              })
            }
          })
      })

    })
    this.setState({loading: true, toggleSubmit: "disabled"})
  }

  render() {
    return (
      <div className="upload-page">
      {this.state.loading === true ?
        <div id="loading-container">
        <div id="loading-content">
        <Loader active inline size="massive" content="Uploading Files"/>
        </div>
        </div>
       :

      <Form onSubmit={this.uploadFiles}>
      <div className="upload-buttons">
        <Button as="label" htmlFor="file" color="orange">
        <Icon name='file' />
        Choose Songs

        </Button>
        <Button type="submit" className={this.state.toggleSubmit} color="orange">
        <Icon name='upload' />
        Upload Songs
        </Button>
        </div>
        <input
          type="file"
          id="file"
          multiple="multiple"
          hidden
          onChange={this.fileChange}
          required
        />
          <List divided relaxed>
          {this.renderSongInputs()}
          </List>
        </Form>
      }
        </div>
    );
  }

}

const mapStateToProps = (store) => ({
  files: store.files,
  songs: store.songs
})


export default connect(mapStateToProps)(UploadPage);
