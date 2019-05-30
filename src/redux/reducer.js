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
  loading: false,
  selectedSong: null,
  index: 0,
  howl: null,
  originalQueue: null,
  shuffle: false,
  currentPlaylist: null
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
  originalQueue: originalQueueReducer,
  shuffle: shuffleReducer,
  currentPlaylist: currentPlaylistReducer,
  addToPlaylistOpen: addToPlaylistOpenReducer
})

export default rootReducer
let bool = true;

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
function addToPlaylistOpenReducer(state=null, action) {
  switch(action.type){
    case "SET_ADDTOPLAYLIST":
      return action.payload
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
function displayPlaylistReducer(state={id: "jukyuijghjfhjy776547567"}, action){
  switch(action.type){
    case "SET_DISPLAYPLAYLIST":
      return { bool: !bool, ...action.payload}
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
function pageReducer(state="playlists", action){
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
function shuffleReducer(state=false, action){
  switch(action.type){
    case "SET_SHUFFLE":
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
function currentPlaylistReducer(state={id: "fdsakfldsjfkasdlfjlasdkjfklasd"}, action){
  switch(action.type){
    case "SET_CURRENTPLAYLIST":
      return action.payload
    default:
      return state
    }
}
