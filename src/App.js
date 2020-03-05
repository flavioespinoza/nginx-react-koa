import React from 'react';
import './App.scss';
import './assets/css/edge.css';
import ContainerFluid from 'components/Container/ContainerFluid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Nginx React Koa - Docker Containers</h2>
      </header>
      <ContainerFluid />
    </div>
  );
}

export default App;
