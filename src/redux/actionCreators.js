import {Howl} from 'howler'

function gotoPlaylistPage(playlist){
  return (dispatch, getState) => {
    dispatch({type: "SET_DISPLAYPLAYLIST", payload: playlist})
    dispatch({type: "SET_PAGE", payload: "playlist"})
  }
}
function play(index, queue=null){
  return (dispatch, getState) => {
     var howl = new Howl({
           src: queue[index].url,
           onplay: () => {
             dispatch({type: "SET_PLAYING", payload: true})
           },
           onload: () => {
             getState().howl.play()
           },
           onend: () => {
             skip(dispatch, getState)
           },
           onpause: () => {
             dispatch({type: "SET_PLAYING", payload: false})
           }
         })
     dispatch({type: "SET_INDEX", payload: index})
     dispatch({type: "SET_CURRENTTRACK", payload: queue[index]})
     dispatch({type: "SET_HOWL", payload: howl})
 }
}


function shuffle(){
  return (dispatch, getState) => {
    if (getState().loading === false){
      if (!this.state.shuffled) {
        dispatch({type: "SET_SHUFFLE", payload: true})
        var shuffledQueue = [...[...getState().queue].sort(() => Math.random() - 0.5)]
        dispatch({type: "SET_QUEUE", payload: [...shuffledQueue]})
        if (getState().currentTrack !== null){
          shuffledQueue.splice(shuffledQueue.indexOf(getState().currentTrack), 1)
          dispatch({type: "SET_QUEUE", payload: [getState().currentTrack, ...shuffledQueue]})
        }
        dispatch({type: "SET_INDEX", payload: 0})
      }else {
        this.setState({shuffled: false})
        dispatch({type: "SET_SHUFFLE", payload: false})
        dispatch({type: "SET_QUEUE", payload: getState().originalQueue})
        dispatch({type: "SET_INDEX", payload: getState().originalQueue.indexOf(this.props.currentTrack)})
      }
    }
  }
}

// Plays the playlist given
function playPlaylist(playlist, index=0){
  return (dispatch, getState) => {
    if (getState().loading === false && getState().currentPlaylist.id !== playlist.id && playlist.songs.length > 0){
      if (getState().howl){
        getState().howl.stop()
      }
      
      dispatch({
        type: "SET_SHUFFLE", payload: false
      })
      dispatch({
        type: "SET_CURRENTPLAYLIST", payload: playlist
      })
      dispatch({
        type: "SET_QUEUE", payload: playlist.songs
      })
      dispatch({
        type: "SET_ORIGNALQUEUE", payload: playlist.songs
      })
      play(index, playlist.songs)(dispatch, getState)
    }else if(getState().loading === false && getState().howl !== null && playlist.songs.length > 0 && (getState().page === "playlists")){
      if (getState().playing) {
        getState().howl.pause()
      }else {
        getState().howl.play()
      }
    }else if(getState().loading === false && getState().howl !== null && playlist.songs.length > 0){
      getState().howl.stop()
      play(index, playlist.songs)(dispatch, getState)
    }
  }
}

function skip(dispatch, getState){
  if (getState().queue != null){
    getState().howl.stop()
    play(getState().index + 1, getState().queue)(dispatch, getState)
  }
}

export {playPlaylist, gotoPlaylistPage, play, skip}
