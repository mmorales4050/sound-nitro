import React, { Component } from 'react';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import NewPlaylistButton from '../NewPlaylistButton/NewPlaylistButton'
import './PlaylistPage.css'
import PlaylistGroup from '../PlaylistGroup/PlaylistGroup'
import {Button, Modal, Input, Card} from 'semantic-ui-react'
import '../../api'

class PlaylistPage extends Component {

  render() {
    return (
      <>
      <NewPlaylistButton />

      <PlaylistGroup />
      </>
    );
  }

}

export default PlaylistPage;
