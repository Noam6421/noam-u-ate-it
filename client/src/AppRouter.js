import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" component={LoginPage} exact={true} />
                    <Route path="/home" component={HomePage} />
                </Switch>
            </div>
        </Router>
    )
}

export { AppRouter as default };