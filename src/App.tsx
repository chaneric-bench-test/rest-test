import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';


const App: React.FC = () => {
  return (
    <div className="App">
      <Header title={'Bench Test'} />
      <Dashboard />
    </div>
  );
}

export default App;
