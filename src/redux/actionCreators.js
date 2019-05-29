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
             skip(getState)
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

// Plays the playlist given
function playPlaylist(playlist){
  return (dispatch, getState) => {
    if (getState().loading === false && getState().currentPlaylist !== playlist){
      if (getState().howl){
        getState().howl.stop()
      }
      dispatch({
        type: "SET_CURRENTPLAYLIST", payload: playlist
      })
      dispatch({
        type: "SET_QUEUE", payload: playlist.songs
      })
      dispatch({
        type: "SET_ORIGNALQUEUE", payload: playlist.songs
      })
      play(0, playlist.songs)(dispatch, getState)
    }else if(getState().loading === false && getState().howl !== null){
      if (getState().playing) {
        getState().howl.pause()
      }else {
        getState().howl.play()
      }
    }
  }
}

function skip(dispatch, getState){
  if (getState().queue != null){
    getState().howl.stop()
    play(getState().index + 1)(dispatch, getState)
    dispatch({type: "SET_CURRENTTRACK", payload: getState().queue[getState().index + 1]})
    dispatch({type: "SET_INDEX", payload: getState().index + 1})
  }
}

export {playPlaylist, gotoPlaylistPage, play, skip}
