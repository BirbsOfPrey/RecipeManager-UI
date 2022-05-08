import { Component } from 'react';
import { Routes, Route } from 'react-router-dom'
import { MainView } from './pages/MainView';
import { Copyright } from './widgets/Copyright';
import './App.css';

export class App extends Component {



  render() {
    return (
      <div className={"app__container "}>
        <main>
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="*" element={<p>There's nothing here!</p>} />
          </Routes>
        </main>
        <Copyright />
      </div>
    )
  }
}

export default App;