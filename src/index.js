import React from 'react';
import ReactDOM from 'react-dom';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { ConnectedRouter } from 'connected-react-router'
import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import { Provider, ReactReduxContext } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

import generalReducer from './reducers/GeneralReducer'
import animeReducer from './reducers/AnimeReducer'
import mangaReducer from './reducers/MangaReducer'


const history = createBrowserHistory()
const initialState = {}
const middleware = [
  routerMiddleware(history),
  thunk,
]
const allReducers = combineReducers({
  router: connectRouter(history),
  general: generalReducer,
  manga: mangaReducer,
  anime: animeReducer
})
const enhancers = []
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)
const store = createStore(allReducers, initialState, composedEnhancers)
// const storeContext = React.createContext(store);
// //console.log("State: " + store.getState()["manga"]["mangas"][0])
// const updateUserAction = {
//   type: 'updateUser',
//   payload: {
//     anime: {animes: {0: "Naruto"}}
//   }
// }
//
// store.dispatch(updateUserAction)



var root = document.getElementById('root');
root.style['width'] = "100vw"
root.style['padding-right'] = '10px'

ReactDOM.render(
  
  <CookiesProvider>
    <Provider store={store}>
      <App history={history}/>
    </Provider>
  </CookiesProvider>

  , root
);
registerServiceWorker();
