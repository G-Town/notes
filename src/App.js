import React, { Component } from 'react';
import './App.css';
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Main from './components/Main';

const store = ConfigureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <ScrollToTop />
          <div className="App">
            <Main />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;