
let initialState = {
  files: [],
  playlists: [],
  songs: [],
  current_track: {},
  page: "playlists"
}
const rootReducer = (oldState=initialState, action) => {
  switch(action.type){
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
        return {...oldState, current_track: action.payload}
    default:
      return oldState
  }
}

export default rootReducer
