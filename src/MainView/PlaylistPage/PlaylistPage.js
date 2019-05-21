import React, { Component } from 'react';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import './PlaylistPage.css'
import {Button, Modal, Input, Card} from 'semantic-ui-react'

class PlaylistPage extends Component {
  state = {
    open: false
  }

  createPlaylist = () => {

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
      <PlaylistCard />
      <PlaylistCard />
      <PlaylistCard />
      <PlaylistCard />
      </Card.Group>
      <Modal size="fullscreen" open={this.state.open} onClose={this.closeModal} id="new-playlist-modal"
      closeOnDimmerClick={false}
      >
          <Modal.Header>Create new playlist</Modal.Header>
          <Modal.Content>
          <div className="inner-header">Playlist Name</div>
          <Input size="massive" transparent autoFocus>
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

export default PlaylistPage;
