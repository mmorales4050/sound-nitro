import React, { Component } from 'react';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import './PlaylistPage.css'
import {Button, Modal, Input, Card} from 'semantic-ui-react'
import '../../api'
import {connect} from 'react-redux'

class PlaylistPage extends Component {
  state = {
    open: false,
    playlist_name: ""
  }

  setPlaylistName = (event) => {
    this.setState({playlist_name: event.target.value})
  }

  createPlaylist = (event) => {
    fetch(URL + "/playlists", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        name: this.state.playlist_name
      })
    }).then(()=>this.setState({playlist_name: ""}))
    this.setState({open: false})
  }

  openModal = () => {
    this.setState({
      open: true
    })
  }

  closeModal = (e) => {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <>
      <div class="playlist-button">
      <Button circular id="new-playlist-button" size="large" onClick={this.openModal}>
      New Playlist
      </Button>
      </div>
      <Card.Group className="playlist-card-container"
      centered
      >
      {this.props.playlists.map(playlist=> {
        return (
          <PlaylistCard playlist={playlist}/>
        )
      })}
      </Card.Group>
      <Modal size="fullscreen" open={this.state.open} onClose={this.closeModal} id="new-playlist-modal"
      closeOnDimmerClick={false}
      >
          <Modal.Header>Create new playlist</Modal.Header>
          <Modal.Content>
          <div className="inner-header">Playlist Name</div>
          <Input size="massive" transparent autoFocus onChange={this.setPlaylistName} value={this.state.playlist_name}>
          </Input>
          </Modal.Content>
          <Modal.Actions>
            <Button className="cancel-button" inverted size="large" circular onClick={this.closeModal}>CANCEL</Button>
            <Button color="orange" className="create-button" onClick={this.createPlaylist} content='CREATE' size="large" circular/>
          </Modal.Actions>
        </Modal>
      </>
    );
  }

}

const mapStateToProps = (store) => ({
  playlists: store.playlists
})

export default connect(mapStateToProps)(PlaylistPage);
