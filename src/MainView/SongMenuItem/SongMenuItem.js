import React, { Component } from 'react';
import './SongMenuItem.css'
import {List, Icon, Menu, Image, Modal, Button} from 'semantic-ui-react'
import NewPlaylistButton from '../NewPlaylistButton/NewPlaylistButton'
import {connect} from 'react-redux'
import PopupMenu from '../PopupMenu/PopupMenu'
import '../PopupMenu/PopupMenu.css'
import AddToPlaylistGroup from '../AddToPlaylistGroup/AddToPlaylistGroup'
import '../../api'
import {playPlaylist} from "../../redux/actionCreators"


class SongMenuItem extends Component {
  state = {
    hover: false,
    edit: false
  }

  formatTime = (secs) => {
    secs = Math.round(secs)
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  deleteSong = () => {
    if(this.props.page === "songs"){
      fetch(URL + `songs/${this.props.song.id}`, {
        method: "DELETE",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          id: this.props.song.id
        })
      }).then(response=>response.json())
      .then((response)=> {
        this.props.dispatch({type: "SET_SONGS", payload: [...this.props.songs].filter(song=>{
          if(song === this.props.song){
            return false
          }else{
            return true
          }
        })})
        this.props.dispatch({type: "SET_PLAYLISTS", payload: [...this.props.playlists].map(playlist=>{

          response.forEach(playlistId=>{
            if(playlistId === playlist.id){
              playlist.songs = playlist.songs.filter(song=>{
                if(song.id === this.props.song.id){
                  return false
                }else{
                  return true
                }
              })
            }
          })
          return playlist
        })})
      })
    }else if(this.props.page === "songs"){
      fetch(URL + `playlist_songs/${this.props.song.playlistSongId}`, {
        method: "DELETE",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          id: this.props.song.playlistSongId
        })
      })
      .then(()=>{
        var updated_playlists = [...this.props.playlists].map(playlist=> {
          if(playlist.id === this.props.displayPlaylist.id){
            playlist.songs = playlist.songs.filter(song=>{
              if(song.id === this.props.song.id){
                return false
              }else{
                return true
              }
            })
            this.props.dispatch({type: "SET_DISPLAYPLAYLIST", payload: playlist})
          }
          return playlist
        })
        this.props.dispatch({type: "SET_PLAYLISTS", payload: updated_playlists})
      })
    }
  }

  openModal = () => {
    this.props.dispatch({type: "SET_ADDTOPLAYLIST", payload: this.props.song.id})
    this.props.dispatch({type: "SET_SELECTEDSONG", payload: this.props.song})
  }

  editSong = () => {
    this.setState({edit: true})
  }

  closeModal = (e) => {
    this.props.dispatch({type: "SET_ADDTOPLAYLIST", payload: null})
  }

  toggleAudio = () => {
    if (this.props.howl !== null && this.props.currentTrack.id === this.props.song.id){
      if (this.props.playing) {
        this.props.howl.pause()
      }else {
        this.props.howl.play()
      }
    }else if(this.props.page === "playlist"){
      var index = this.props.displayPlaylist.songs.map(song=>song.id).indexOf(this.props.song.id)
      this.props.playPlaylist(this.props.displayPlaylist, index)
    }else if(this.props.page === "queue"){
      index = this.props.queue.map(song=>song.id).indexOf(this.props.song.id)
      this.props.playPlaylist({songs: this.props.queue}, index)
    }
    else if(this.props.page === "songs"){
      index = this.props.songs.map(song=>song.id).indexOf(this.props.song.id)
      this.props.playPlaylist({songs: this.props.songs}, index)
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
    </div>{this.props.song.name}</div><div><span id="song-duration">{this.formatTime(this.props.song.duration)}</span>{this.state.hover ?<><Icon name="plus" id="song-options" onClick={this.openModal}/><Icon name="edit" id="song-options" onClick={this.editSong}/></>:null}</div></div></List.Header>
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

        <div className="add-playlist-container">
        <Modal size="fullscreen" open={this.state.edit} onClose={this.closeModal} id="new-playlist-modal"
        closeOnDimmerClick={false}
        className="add-playlist edit-playlist"
        >
        <div>
        <span>
        <Button circular  onClick={()=>this.setState({edit: false})} content={"CANCEL"}/>
        </span>
        <span>
            <Button circular onClick={this.deleteSong} content={this.props.page === "songs" ? "DELETE SONG" : "REMOVE SONG"}/>
            </span>
        </div>
          </Modal>
          </div>
      </>
    );
  }

}
const mapDispatchToProps = (dispatch) => ({
  playPlaylist: (playlist, index) => {dispatch(playPlaylist(playlist, index))},
  dispatch: dispatch
})

const mapStateToProps = (store) => ({
  currentTrack: store.currentTrack,
  playing: store.playing,
  howl: store.howl,
  addToPlaylistOpen: store.addToPlaylistOpen,
  playlists: store.playlists,
  songs: store.songs,
  page: store.page,
  displayPlaylist: store.displayPlaylist,
  queue: store.queue
})

export default connect(mapStateToProps, mapDispatchToProps)(SongMenuItem);
