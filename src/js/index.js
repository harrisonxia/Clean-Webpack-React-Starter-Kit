import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Route, Switch, Redirect, BrowserRouter as Router} from 'react-router-dom'
import store from './store/index.js'
import App from './components/App.jsx'

const defaultPath = '/'
render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path={defaultPath} component={App}/>
                <Route path={`${defaultPath}example`} component={App}/>
                <Redirect exact from="*" to={defaultPath}/>
            </Switch>
        </Router></Provider>,
    document.getElementById('root'),
)