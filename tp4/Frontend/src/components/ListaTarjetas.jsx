import React from 'react';
import TarjetaPersona from './TarjetaPersona';
import './ListaTarjetas.css';

const ListaTarjetas = ({ personas }) => {
  if (!personas || personas.length === 0) {
    return (
      <div className="lista-vacia">
        <p>No hay personas para mostrar</p>
      </div>
    );
  }

  return (
    <div className="lista-tarjetas">
      {personas.map((persona) => (
        <TarjetaPersona key={persona.id} persona={persona} />
      ))}
    </div>
  );
};

export default ListaTarjetas; 