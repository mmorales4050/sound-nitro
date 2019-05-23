import React, { Component } from 'react';
import {Menu, Modal, Button, Icon} from 'semantic-ui-react'
import NewPlaylistButton from '../NewPlaylistButton/NewPlaylistButton'
import AddToPlaylistGroup from '../AddToPlaylistGroup/AddToPlaylistGroup'
import './PopupMenu.css'

class PopupMenu extends Component {
  state = {
    open: false
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
      <div id="popup-menu-container">
      <Menu secondary id="popup-menu" vertical>
       <Menu.Item
         name='Add to Playlist'
         onClick={this.openModal}
       />
       <Menu.Item
         name='Download'
       />
       <Menu.Item
         name='Remove from Playlist'
       />
     </Menu>
     </div>
     <div className="add-playlist-container">
     <Modal size="fullscreen" open={this.state.open} onClose={this.closeModal} id="new-playlist-modal"
     closeOnDimmerClick={false}
     className="add-playlist"
     >
         <Modal.Header><div className="icon"><Icon name="times" onClick={this.closeModal}/></div><div>Add to playlist</div></Modal.Header>
         <NewPlaylistButton />
         <Modal.Content>
         <AddToPlaylistGroup />
         </Modal.Content>
       </Modal>
       </div>
       </>
    );
  }

}

export default PopupMenu;
