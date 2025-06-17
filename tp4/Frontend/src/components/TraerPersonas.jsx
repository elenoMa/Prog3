import { useState, useEffect } from 'react';
import ListaTarjetas from './ListaTarjetas';

const TraerPersonas = () => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await fetch('http://localhost:3001/personas');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setPersonas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonas();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return <ListaTarjetas personas={personas} />;
};

export default TraerPersonas; 