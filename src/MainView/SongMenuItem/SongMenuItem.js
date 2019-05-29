import React, { Component } from 'react';
import './SongMenuItem.css'
import {List, Icon, Menu, Image, Modal} from 'semantic-ui-react'
import NewPlaylistButton from '../NewPlaylistButton/NewPlaylistButton'
import {connect} from 'react-redux'
import {Howl} from 'howler'
import PopupMenu from '../PopupMenu/PopupMenu'
import '../PopupMenu/PopupMenu.css'
import AddToPlaylistGroup from '../AddToPlaylistGroup/AddToPlaylistGroup'

class SongMenuItem extends Component {
  state = {
    hover: false,
    menuOpen: false
  }

  play = (index) => {
      var howl = new Howl({
            src: this.props.queue[index].url,
            onplay: () => {
              this.props.dispatch({type: "SET_PLAYING", payload: true})
            },
            onload: () => {
              this.props.howl.play()
            },
            onend: () => {
              this.skip()
            },
            onpause: () => {
              this.props.dispatch({type: "SET_PLAYING", payload: false})
            }
          })
      this.props.dispatch({type: "SET_INDEX", payload: index})
      this.props.dispatch({type: "SET_CURRENTTRACK", payload: this.props.queue[index]})
      this.props.dispatch({type: "SET_HOWL", payload: howl
    })
  }

  formatTime = (secs) => {
    secs = Math.round(secs)
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  openModal = () => {
    this.props.dispatch({type: "SET_ADDTOPLAYLIST", payload: this.props.song.id})
    this.props.dispatch({type: "SET_SELECTEDSONG", payload: this.props.song})
  }

  closeModal = (e) => {
    this.props.dispatch({type: "SET_ADDTOPLAYLIST", payload: null})
  }

  toggleAudio = () => {
    if (this.props.howl !== null){
      if (this.props.playing) {
        this.props.howl.pause()
      }else {
        this.props.howl.play()
      }
    }
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
    {this.props.playing ? (this.props.song.url === this.props.currentTrack.url ? <List.Icon name={"pause"} onClick={this.toggleAudio}/> : this.state.hover ?
      <List.Icon name='play' onClick={this.toggleAudio}/>
      :
       <Image src="music_note.png" id="music-note-icon"/>
     ) : this.state.hover ?
      <List.Icon name='play' onClick={this.toggleAudio}/>
      :
      (
        this.props.currentTrack ? (this.props.song.url === this.props.currentTrack.url ? <List.Icon name='play' onClick={this.songClicked}/> : <Image src="music_note.png" id="music-note-icon"/>) : <Image src="music_note.png" id="music-note-icon"/>
      )}
    </div>{this.props.song.name}</div><div><span id="song-duration">{this.formatTime(this.props.song.duration)}</span>{this.state.hover ?<Icon name="plus" id="song-options" onClick={this.openModal}/>:null}</div></div></List.Header>
    <List.Description  id = "item-description">{this.props.song.artist}{this.props.addToPlaylistOpen ? <PopupMenu /> : null}</List.Description>
  </List.Content>
</List.Item>
      </List>
      </Menu.Item>
      <div className="add-playlist-container">
      <Modal size="fullscreen" open={this.props.addToPlaylistOpen === this.props.song.id} onClose={this.closeModal} id="new-playlist-modal"
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

const mapStateToProps = (store) => ({
  currentTrack: store.currentTrack,
  playing: store.playing,
  howl: store.howl,
  addToPlaylistOpen: store.addToPlaylistOpen
})

export default connect(mapStateToProps)(SongMenuItem);
