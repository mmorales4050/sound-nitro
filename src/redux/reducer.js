
let initialState = {
  files: [],
  playlists: [],
  songs: [],
  current_track: null,
  playing: false,
  page: "playlists",
  track_duration: 0
}
const rootReducer = (oldState=initialState, action) => {
  switch(action.type){
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
    default:
      return oldState
  }
}

export default rootReducer
