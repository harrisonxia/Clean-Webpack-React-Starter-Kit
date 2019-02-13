import React from 'react'
import {BrowserRouter, HashRouter, Route, Switch, Link} from 'react-router-dom'

import MainPage from './components/main.jsx'
import styles from './components/main.css'

export default function () {
    return (
        <HashRouter>
            <div key="content-wrapper">
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                </Switch>
            </div>
        </HashRouter>
    )
}