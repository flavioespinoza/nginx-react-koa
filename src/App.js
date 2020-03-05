import React from 'react';
import './App.scss';
import './assets/css/edge.css';
import BtnHookStyled from 'components/Hook/BtnHookStyled';
import ContainerFluid from 'components/Container/ContainerFluid';
import FormApi from 'components/Form/FormApi';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Nginx React Koa - Docker Containers</h2>
      </header>
      <FormApi />
      <ContainerFluid />
    </div>
  );
}

export default App;
