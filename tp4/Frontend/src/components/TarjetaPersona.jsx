const TarjetaPersona = ({ persona }) => {
  const { nombre, apellido, edad, email } = persona;
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '250px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      transition: 'transform 0.2s',
      ':hover': {
        transform: 'scale(1.05)'
      }
    }}>
      <h2 style={{ margin: '0 0 8px 0', color: '#333' }}>{nombre} {apellido}</h2>
      <p style={{ margin: '4px 0', color: '#666' }}>Edad: {edad}</p>
      <p style={{ margin: '4px 0', color: '#666' }}>Email: {email}</p>
    </div>
  );
};

export default TarjetaPersona; 