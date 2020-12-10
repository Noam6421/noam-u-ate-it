import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

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