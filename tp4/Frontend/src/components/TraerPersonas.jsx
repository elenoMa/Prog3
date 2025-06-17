import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListaTarjetas from './ListaTarjetas';
import './TraerPersonas.css';

const TraerPersonas = () => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/personas');
        setPersonas(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error al obtener personas:', err);
        setError('Error al cargar las personas. Asegúrate de que el backend esté ejecutándose.');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonas();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando personas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="traer-personas">
      <h2>Lista de Personas</h2>
      <p>Total: {personas.length} personas</p>
      <ListaTarjetas personas={personas} />
    </div>
  );
};

export default TraerPersonas; 