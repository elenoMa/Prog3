import React from 'react'
import TraerPersonas from './components/TraerPersonas'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestor de Personas</h1>
        <p>API Backend + Frontend React</p>
      </header>
      <main>
        <TraerPersonas />
      </main>
    </div>
  )
}

export default App 