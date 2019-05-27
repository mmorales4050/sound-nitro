import { combineReducers } from "redux";

let initialState = {
  files: [],
  playlists: [],
  queue: null,
  displayPlaylist: null,
  songs: [],
  currentTrack: null,
  playing: false,
  page: "songs",
  loaded: false,
  selectedSong: null,
  index: 0,
  howl: null,
  originalQueue: null
}

function oldReducer(state=initialState, action){
  switch(action.type){
    case "TOGGLE_AUDIO":
      if (state.playing){
        state.currentTrack.howl.pause()
      }else{
        state.currentTrack.howl.play()
      }
      return {...state, playing: !state.playing}
      case "SET_AND_PLAY_currentTrack":
        // Pause song if there is currently one playing
        try{state.currentTrack.howl.pause()}catch(e){}
        action.payload.howl.play()
        return {...state, currentTrack: action.payload, playing: true}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  files: filesReducer,
  playlists: playlistsReducer,
  queue: queueReducer,
  displayPlaylist: displayPlaylistReducer,
  songs: songsReducer,
  currentTrack: currentTrackReducer,
  playing: playingReducer,
  page: pageReducer,
  loading: loadingReducer,
  selectedSong: selectedSongReducer,
  index: indexReducer,
  howl: howlReducer,
  originalQueue: originalQueueReducer
})

export default rootReducer

function filesReducer(state=[], action) {
  switch(action.type){
    case "SET_FILES":
      return action.payload
    case "DELETE_FILES":
      return []
    default:
      return state
    }
}
function originalQueueReducer(state=null, action) {
  switch(action.type){
    case "SET_ORIGNALQUEUE":
      return action.payload
    default:
      return state
    }
}
function playlistsReducer(state=[], action){
  switch(action.type){
    case "SET_PLAYLISTS":
      return action.payload
    case "ADD_PLAYLISTS":
      return state.concat(action.payload)
    default:
      return state
    }
}
function howlReducer(state=null, action){
  switch(action.type){
    case "SET_HOWL":
      return action.payload
    default:
      return state
    }
}
function queueReducer(state=null, action){
  switch(action.type){
    case "SET_QUEUE":
      return action.payload
    default:
      return state
    }
}
function indexReducer(state=null, action){
  switch(action.type){
    case "SET_INDEX":
      return action.payload
    default:
      return state
    }
}
function displayPlaylistReducer(state=null, action){
  switch(action.type){
    case "SET_DISPLAYPLAYLIST":
      return action.payload
    default:
      return state
    }
}
function songsReducer(state=[], action){
  switch(action.type){
    case "SET_SONGS":
      return action.payload
    case "ADD_SONGS":
      return state.concat(action.payload)
    default:
      return state
    }
}
function currentTrackReducer(state=null, action){
  switch(action.type){
    case "SET_CURRENTTRACK":
      return action.payload
    default:
      return state
    }
}
function playingReducer(state=false, action){
  switch(action.type){
    case "SET_PLAYING":
      return action.payload
    default:
      return state
    }
}
function pageReducer(state="songs", action){
  switch(action.type){
    case "SET_PAGE":
      return action.payload
    default:
      return state
    }
}
function loadingReducer(state=false, action){
  switch(action.type){
    case "SET_LOADING":
      return action.payload
    default:
      return state
    }
}
function selectedSongReducer(state=null, action){
  switch(action.type){
    case "SET_SELECTEDSONG":
      return action.payload
    default:
      return state
    }
}
