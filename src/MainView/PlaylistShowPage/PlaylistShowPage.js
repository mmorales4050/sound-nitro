import React, { Component } from 'react';
import PlaylistCard from '../PlaylistCard/PlaylistCard'
import PlaylistSongs from './PlaylistSongs/PlaylistSongs';
import {Button, Icon, Modal} from 'semantic-ui-react'
import './PlaylistShowPage.css'
import {connect} from 'react-redux'
import {playPlaylist} from '../../redux/actionCreators'
import '../../api'


class PlaylistShow extends Component {
  state = {
    edit: false
  }
  playPlaylist = (e) => {
    if(e.target.className === "ui circular button"){
      if(this.props.currentPlaylist.id === this.props.displayPlaylist.id){
        if(this.props.playing === true){
          this.props.howl.pause()

        }else if(this.props.playing === false){
          this.props.howl.play()
        }
      }else{
        this.props.playPlaylist(this.props.displayPlaylist)
      }
    }else{
      this.props.playPlaylist(this.props.displayPlaylist)
    }
  }

  editPlaylist = () => {
    this.setState({edit: true})
  }

  deletePlaylist = () => {
    fetch(URL + `playlists/${this.props.displayPlaylist.id}`, {
      method: "DELETE"
    })
    .then(()=> {
      this.props.dispatch({type: "SET_PLAYLISTS", payload: [...this.props.playlists].filter(playlist=>playlist.id === this.props.displayPlaylist.id ? false : true
      )})

    })
    this.props.dispatch({type: "SET_PAGE", payload: "playlists"})
  }

  render() {
    return (
      <>
      <div id="playlist-show-container">
      <div className="top-container">
      <PlaylistCard playlist={this.props.displayPlaylist}/>

      <div className="playlist-info">
      <div className="title">
      {this.props.displayPlaylist.name}
      </div>
      <div className="song-number">
      {this.props.displayPlaylist.songs.length} SONGS
      </div>

      <Button circular content={
        this.props.playing && this.props.displayPlaylist === this.props.currentPlaylist ? "PAUSE" : "PLAY"
      } onClick={this.playPlaylist}/>
      <Icon name="edit" onClick={this.editPlaylist}/>
      </div>
      </div>
      <div className="playlist-song-container">
      <PlaylistSongs songs={this.props.displayPlaylist.songs}/>
      </div>
      <div id ="filler-item">
      </div>

      </div>
      <div className="add-playlist-container">
      <Modal size="fullscreen" open={this.state.edit} onClose={this.closeModal} id="new-playlist-modal"
      closeOnDimmerClick={false}
      className="add-playlist edit-playlist delete"
      >
      <div>
      <span>
      <Button circular  onClick={()=>this.setState({edit: false})} content={"CANCEL"}/>
      </span>
      <span>
          <Button circular onClick={this.deletePlaylist} content={"DELETE PLAYLIST"}/>
          </span>
      </div>
        </Modal>
        </div>
        </>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  playPlaylist: (playlist) => {dispatch(playPlaylist(playlist))},
  dispatch: dispatch
})

const mapStateToProps = (store) => ({
  displayPlaylist: store.displayPlaylist,
  queue: store.queue,
  playing: store.playing,
  howl: store.howl,
  currentPlaylist: store.currentPlaylist,
  playlists: store.playlists
})


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistShow);
