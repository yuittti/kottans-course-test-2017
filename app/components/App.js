import React from 'react';
import { ReactRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';

class App extends React.Component {
  render () {
    return (
      <div className='container page-container'>
        <Router>
          <Route exact path='/' component={Home} />
        </Router>
      </div>
    )
  }
};

export default App;