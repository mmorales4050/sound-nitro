
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

const filesReducer = (state=[], action) => {

}

const rootReducer = (oldState=initialState, action) => {
  switch(action.type){
    case "SELECT_SONG":
      return {...oldState, selectedSong: action.payload}
    case "DISPLAY_PLAYLIST":
      return {...oldState, displayPlaylist: action.payload}
    case "SET_PLAYLISTS":
      return {...oldState, playlists: action.payload}
    case "SET_DURATION":
      return {...oldState, track_duration: oldState.current_track.howl.duration()}
    case "TOGGLE_AUDIO":
      if (oldState.playing){
        oldState.current_track.howl.pause()
      }else{
        oldState.current_track.howl.play()
      }
      return {...oldState, playing: !oldState.playing}
    case "CHANGE_PAGE":
      return {...oldState, page: action.payload}
    case "CHOOSE_FILES_TO_UPLOAD":
      return {...oldState, files: action.payload}
    case "CLEAR_FILES_TO_UPLOAD":
      return {...oldState, files: []}
    case "SET_SONGS":
      return {...oldState, songs: action.payload}
      case "SET_AND_PLAY_CURRENT_TRACK":
        // Pause song if there is currently one playing
        try{oldState.current_track.howl.pause()}catch(e){}
        action.payload.howl.play()
        return {...oldState, current_track: action.payload, playing: true}
      case "SET_QUEUE":
        return {...oldState, queue: action.payload}
    default:
      return oldState
  }
}

export default rootReducer
