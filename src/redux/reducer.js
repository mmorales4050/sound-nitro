
let initialState = {
  files: [],
  songs: [],
  current_track: ""
}
const rootReducer = (oldState=initialState, action) => {
  switch(action.type){
    case "CHOOSE_FILES_TO_UPLOAD":
      return {...oldState, files: action.payload}
    case "CLEAR_FILES_TO_UPLOAD":
      return {...oldState, files: []}
    case "SET_SONGS":
      return {...oldState, songs: action.payload}
      case "SET_CURRENT_TRACK":
        return {...oldState, current_track: action.payload}
    default:
      return oldState
  }
}

export default rootReducer
