import React, { Component } from 'react';
import { Card, Image, Icon} from 'semantic-ui-react'
import './PlaylistCard.css'
import  {connect} from 'react-redux';


class PlaylistCard extends Component {
  state = {
    icon: "music"
  }

  gotoPlaylist = () => {
    this.props.dispatch({type: "DISPLAY_PLAYLIST", payload: this.props.playlist})
    this.props.dispatch({
      type: "CHANGE_PAGE", payload: "playlist"
    })
  }

  playPlaylist = () => {

  }

  render() {
    return (
      <Card id="album-card">
      <div className="place-holder" onMouseEnter={()=>this.setState({icon:"play circle outline"})} onMouseLeave={()=>this.setState({icon:"music"})} onClick={this.playPlaylist}>
      <Icon name={this.state.icon} size="huge" inverted/>

      </div>
    <Card.Content id="album-info">
    <div onClick={this.gotoPlaylist}>{this.props.playlist.name}</div>
    </Card.Content>
      </Card>
    );
  }

}

const mapStateToProps = (store) => ({
  displayPlaylist: store.displayPlaylist
})

export default connect(mapStateToProps)(PlaylistCard);
