import React, { Component } from 'react';
import './SongMenuItem.css'
import {List, Icon, Menu, Image} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Howl} from 'howler'
import PopupMenu from '../PopupMenu/PopupMenu'

class SongMenuItem extends Component {
  state = {
    hover: false,
    menuOpen: false
  }

  openMenu = (event) => {
    this.setState({menuOpen: !this.state.menuOpen})
    this.props.dispatch({type: "SET_SONG", payload: this.props.song})
  }

  songPaused = (event) => {
    this.props.dispatch({type: "TOGGLE_AUDIO", payload: this.props.song})
  }

  songClicked = (event) => {
    this.props.dispatch({type: "SET_CURRENTTRACK", payload: {...this.props.song, howl: new Howl({
      src: [this.props.song.url],
      onload: () => {
        this.props.dispatch({type: "SET_LOADED", payload: true})
      }
    })}
  })
  }

  //<List.Icon name='play' size='large' onClick={this.songClicked}/>
  render() {

    return (
      <>
      <Menu.Item as="a" id="song-menu-item" className={this.props.currentTrack ? (this.props.song.url === this.props.currentTrack.url ? "music-menu-item-playing" : "") : ""} onMouseEnter={()=>this.setState({hover:true})} onMouseLeave={()=>this.setState({hover:false})}>
      <List horizontal inverted>

      <List.Item>
  <List.Content>
    <List.Header><div id="music-menu-item-header" className=""><div className="begin-menu"><div className="icon">
    {this.props.playing ? (this.props.song.url === this.props.currentTrack.url ? <List.Icon name={"pause"} onClick={this.songPaused}/> : this.state.hover ?
      <List.Icon name='play' onClick={this.songClicked}/>
      :
       <Image src="music_note.png" id="music-note-icon"/>
     ) : this.state.hover ?
      <List.Icon name='play' onClick={this.songClicked}/>
      :
      (
        this.props.currentTrack ? (this.props.song.url === this.props.currentTrack.url ? <List.Icon name='play' onClick={this.songClicked}/> : <Image src="music_note.png" id="music-note-icon"/>) : <Image src="music_note.png" id="music-note-icon"/>
      )}
    </div>{this.props.song.name}</div><div><span id="song-duration">4:20</span>{this.state.hover ?<Icon name="ellipsis horizontal" id="song-options" onClick={this.openMenu}/>:null}</div></div></List.Header>
    <List.Description  id = "item-description">{this.props.song.artist}{this.state.menuOpen ? <PopupMenu /> : null}</List.Description>
  </List.Content>
</List.Item>
      </List>
      </Menu.Item>
      </>
    );
  }

}

const mapStateToProps = (store) => ({
  currentTrack: store.currentTrack,
  playing: store.playing
})

export default connect(mapStateToProps)(SongMenuItem);
