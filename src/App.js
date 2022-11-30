import React, { Component } from 'react';
import logo from './logo.svg';
import Editor from './Editor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{ height: '100vh' }}>
          <Editor />
        </div>
      </div>
    );
  }
}

export default App;
