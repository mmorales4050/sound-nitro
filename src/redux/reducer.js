
let initialState = {
  files: []
}
const rootReducer = (oldState=initialState, action) => {
  switch(action.type){
    case "CHOOSE_FILES_TO_UPLOAD":
      return {...oldState, files: action.payload}
    default:
      return oldState
  }
}

export default rootReducer
