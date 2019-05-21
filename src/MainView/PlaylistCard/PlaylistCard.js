import React, { Component } from 'react';
import { Card, Image, Icon} from 'semantic-ui-react'
import './PlaylistCard.css'

class PlaylistCard extends Component {

  render() {
    return (
      <Card id="album-card">
      <div className="place-holder">
      <Icon name="music" size="huge" inverted/>

      </div>
    <Card.Content id="album-info">
    <div>Playlist Name</div>
    </Card.Content>
      </Card>
    );
  }

}

export default PlaylistCard;
