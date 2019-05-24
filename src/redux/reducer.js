import { combineReducers } from "redux";

let initialState = {
  files: [],
  playlists: [],
  queue: null,
  displayPlaylist: null,
  songs: [],
  current_track: null,
  playing: false,
  page: "songs",
  track_duration: 0,
  selectedSong: null
}

const rootReducer = (state=initialState, action) => {
  switch(action.type){
    case "SELECT_SONG":
      return {...state, selectedSong: action.payload}
    case "DISPLAY_PLAYLIST":
      return {...state, displayPlaylist: action.payload}
    case "SET_PLAYLISTS":
      return {...state, playlists: action.payload}
    case "SET_DURATION":
      return {...state, track_duration: state.current_track.howl.duration()}
    case "TOGGLE_AUDIO":
      if (state.playing){
        state.current_track.howl.pause()
      }else{
        state.current_track.howl.play()
      }
      return {...state, playing: !state.playing}
    case "CHANGE_PAGE":
      return {...state, page: action.payload}
    case "CHOOSE_FILES_TO_UPLOAD":
      return {...state, files: action.payload}
    case "CLEAR_FILES_TO_UPLOAD":
      return {...state, files: []}
    case "SET_SONGS":
      return {...state, songs: action.payload}
      case "SET_AND_PLAY_CURRENT_TRACK":
        // Pause song if there is currently one playing
        try{state.current_track.howl.pause()}catch(e){}
        action.payload.howl.play()
        return {...state, current_track: action.payload, playing: true}
      case "SET_QUEUE":
        return {...state, queue: action.payload}
    default:
      return state
  }
}

const filesReducer = (state=[], action) => {
  switch(action.type){
    case "ADD_FILES":
      return {...state, files: action.payload}
    default:
      return state
    }
}
const playlistsReducer = (state=[], action) => {
  switch(action.type){
    case "ADD_PLAYLISTS":
      return {...state, playlists: action.payload}
    default:
      return state
    }
}
const queueReducer = (state=null, action) => {
  switch(action.type){
    case "ADD_QUEUE":
      return {...state, queue: action.payload}
    default:
      return state
    }
}
const displayPlaylistReducer = (state=null, action) => {
  switch(action.type){
    case "ADD_DISPLAYPLAYLIST":
      return {...state, displayPlaylist: action.payload}
    default:
      return state
    }
}
const songsReducer = (state=[], action) => {
  switch(action.type){
    case "ADD_SONGS":
      return {...state, songs: action.payload}
    default:
      return state
    }
}
const current_trackReducer = (state=null, action) => {
  switch(action.type){
    case "ADD_CURRENT_TRACK":
      return {...state, current_track: action.payload}
    default:
      return state
    }
}
const playingReducer = (state=false, action) => {
  switch(action.type){
    case "ADD_PLAYING":
      return {...state, playing: action.payload}
    default:
      return state
    }
}
const pageReducer = (state="songs", action) => {
  switch(action.type){
    case "ADD_PAGE":
      return {...state, page: action.payload}
    default:
      return state
    }
}
const track_durationReducer = (state=0, action) => {
  switch(action.type){
    case "ADD_TRACK_DURATION":
      return {...state, track_duration: action.payload}
    default:
      return state
    }
}
const selectedSongReducer = (state=null, action) => {
  switch(action.type){
    case "ADD_SELECTEDSONG":
      return {...state, selectedSong: action.payload}
    default:
      return state
    }
}



export default rootReducer
