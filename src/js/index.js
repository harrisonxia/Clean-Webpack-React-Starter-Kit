import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/index'
import App from './components/App.jsx'
render(
  <Provider store={store}>
    <App />
  </Provider>,
  // The target element might be either root or app,
  // depending    on your development environment
  // document.getElementById("app")
  document.getElementById('root')
)
