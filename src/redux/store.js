import { createStore } from 'redux'
import reducer from './reducer'

let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

let store = createStore(reducer, devTools)

export default store
