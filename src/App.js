import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
