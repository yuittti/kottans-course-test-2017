import React from 'react';
import { ReactRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <Router>
          <div>
            {/*<Switch>*/}
              <Route exact path='/' component={Home} />
            {/*</Switch>*/}
          </div>
        </Router>
      </div>
    )
  }
};

export default App;