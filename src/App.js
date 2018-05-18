import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home';
import PageHeader from './components/page-header';
import Article from './components/article';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <PageHeader />
          <div className="main-body">
            <Route exact path="/" component={Home}/>
            <Route path="/topics/:topic_slug" component={Home}/>
            <Route path="/articles/:article_id" component={Article}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
