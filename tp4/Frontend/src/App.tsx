import React from 'react';
import TraerPersonas from './components/TraerPersonas';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Listado de Personas</h1>
      <TraerPersonas />
    </div>
  );
};

export default App; 