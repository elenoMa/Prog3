import TarjetaPersona from './TarjetaPersona';

const ListaTarjetas = ({ personas }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {personas.map((persona) => (
        <TarjetaPersona key={persona.id} persona={persona} />
      ))}
    </div>
  );
};

export default ListaTarjetas; 