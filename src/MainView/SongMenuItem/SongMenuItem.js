import React, { Component } from 'react';
import './SongMenuItem.css'
import {List, Icon, Menu, Button, Image} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Howl} from 'howler'

class SongMenuItem extends Component {
  state = {
    hover: false,
    playing: {}
  }

  songClicked = (event) => {
    this.props.dispatch({type: "SET_AND_PLAY_CURRENT_TRACK", payload: {howl: new Howl({
      src: [this.props.song.audio],
      onload: () => {
        this.props.dispatch({type: "SET_DURATION"})
      }
    }), info: this.props.song}
  })
  this.setState({})
  }

  //<List.Icon name='play' size='large' onClick={this.songClicked}/>
  render() {
    return (
      <Menu.Item as="a" id="song-menu-item" className={""} onMouseEnter={()=>this.setState({hover:true})} onMouseLeave={()=>this.setState({hover:false})}>
      <List horizontal inverted>

      <List.Item>
  <List.Content>
    <List.Header><div id="music-menu-item-header"><div className="begin-menu"><div className="icon">
    {this.state.hover ?
      <List.Icon name='play' size='' onClick={this.songClicked}/>
      :
      <Image src="music_note.png" id="music-note-icon"/>
    }
    </div>{this.props.song.song.name}</div><div><span id="song-duration">4:20</span>{this.state.hover ?<Icon name="ellipsis horizontal" id="song-options"/>:null}</div></div></List.Header>
    <List.Description  id = "item-description">{this.props.song.song.artist}</List.Description>
  </List.Content>
</List.Item>
      </List>
      </Menu.Item>
    );
  }

}

const mapStateToProps = (store) => ({
  current_track: store.current_track
})

export default connect(mapStateToProps)(SongMenuItem);
