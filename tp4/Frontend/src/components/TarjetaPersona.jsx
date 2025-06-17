import React from 'react';
import './TarjetaPersona.css';

const TarjetaPersona = ({ persona }) => {
  const { id, nombre, apellido, edad, email } = persona;

  return (
    <div className="tarjeta-persona">
      <div className="tarjeta-header">
        <div className="avatar">
          {nombre.charAt(0).toUpperCase()}
        </div>
        <div className="persona-info">
          <h3 className="nombre-completo">
            {nombre} {apellido}
          </h3>
          <span className="edad">{edad} años</span>
        </div>
      </div>
      
      <div className="tarjeta-body">
        <div className="campo">
          <label>ID:</label>
          <span>{id}</span>
        </div>
        
        <div className="campo">
          <label>Nombre:</label>
          <span>{nombre}</span>
        </div>
        
        <div className="campo">
          <label>Apellido:</label>
          <span>{apellido}</span>
        </div>
        
        <div className="campo">
          <label>Edad:</label>
          <span>{edad} años</span>
        </div>
        
        <div className="campo email">
          <label>Email:</label>
          <a href={`mailto:${email}`} className="email-link">
            {email}
          </a>
        </div>
      </div>
      
      <div className="tarjeta-footer">
        <div className="estado">
          <span className="estado-dot"></span>
          Activo
        </div>
      </div>
    </div>
  );
};

export default TarjetaPersona; 