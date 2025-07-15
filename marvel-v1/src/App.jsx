import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [heroes, setHeroes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedHero, setSelectedHero] = useState({})
  const [viewModal, setViewModal] = useState(false)

  const fetchSuperHeroes = async (search = 'man') => {
    setLoading(true);
    try {
      // Usamos nuestro backend para hacer la petición
      let url = `http://localhost:3001/api/superheroes/search?name=${encodeURIComponent(search || 'man')}`;

      console.log('Realizando búsqueda:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error al obtener datos de superhéroes')
      }

      const data = await response.json()

      // La estructura de la respuesta es diferente a la de Marvel
      if (data.response === 'success') {
        setHeroes(data.results || []);
        setError(null);
      } else {
        setHeroes([]);
        if (data.error) {
          setError(`Error: ${data.error}`);
        }
      }
    } catch (err) {
      console.error('Error:', err)
      setError('No pudimos cargar los superhéroes. Intenta de nuevo más tarde.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSuperHeroes()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSuperHeroes(searchTerm);
  }

  return (
    <>
      <h1>Superhero Explorer</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar superhéroe..."
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando superhéroes...</p>}
      {error && <p className="error">{error}</p>}

      {viewModal || heroes.length > 0 && (
        <div className="characters-grid">
          {heroes.map(hero => (
            <div key={hero.id} className="character-card">
              <h3>{hero.name}</h3>
              <img
                src={hero.image?.url}
                alt={hero.name}
                className="character-image"
              />
              <div className="hero-info">
                <p><strong>Publisher:</strong> {hero.biography?.publisher || 'Desconocido'}</p>
                <p><strong>Alias:</strong> {hero.biography?.["alter-egos"] || 'Ninguno'}</p>
                {hero.powerstats && (
                  <div className="powerstats">
                    <h4 style={{ color: '#333' }}>Estadísticas</h4>
                    <div className="stat">
                      <span>IQ:</span>
                      <div className="stat-bar" style={{ width: `${hero.powerstats.intelligence}%` }}></div>
                      <span>{hero.powerstats.intelligence}</span>
                    </div>
                    <div className="stat">
                      <span>Fuerza:</span>
                      <div className="stat-bar" style={{ width: `${hero.powerstats.strength}%` }}></div>
                      <span>{hero.powerstats.strength}</span>
                    </div>
                    <div className="stat">
                      <span>Velocidad:</span>
                      <div className="stat-bar" style={{ width: `${hero.powerstats.speed}%` }}></div>
                      <span>{hero.powerstats.speed}</span>
                    </div>
                      <button onClick={() => { setViewModal(!viewModal); setSelectedHero(hero); }}>{viewModal ? 'Cerrar' : 'Ver todo'}</button>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      )}
      {viewModal && (
        <div className='modal'>
          <div className='modal-content'>
            <button className='close' onClick={() => setViewModal(false)}>&times; </button>
            <h2>{selectedHero.name}</h2>
            <img src={selectedHero.image?.url} alt={selectedHero.name} className="modal-image" />
            <p><strong>Publisher:</strong> {selectedHero.biography?.publisher || 'Desconocido'}</p>
            <p><strong>Alias:</strong> {selectedHero.biography?.["alter-egos"] || 'Ninguno'}</p>
            <p><strong>Inteligencia:</strong> {selectedHero.powerstats?.intelligence || 'N/A'}</p>
            <p><strong>Fuerza:</strong> {selectedHero.powerstats?.strength || 'N/A'}</p>
            <p><strong>Velocidad:</strong> {selectedHero.powerstats?.speed || 'N/A'}</p>
            <p><strong>Género:</strong> {selectedHero.appearance?.gender || 'Desconocido'}</p>
            <p><strong>Altura:</strong> {selectedHero.appearance?.height?.join(' / ') || 'Desconocido'}</p>
            <p><strong>Peso:</strong> {selectedHero.appearance?.weight?.join(' / ') || 'Desconocido'}</p>
            <p><strong>Color de ojos:</strong> {selectedHero.appearance?.eyeColor || 'Desconocido'}</p>
            <p><strong>Color de pelo:</strong> {selectedHero.appearance?.hairColor || 'Desconocido'}</p>
            <p><strong>Primera aparición:</strong> {selectedHero.biography?.["first-appearance"] || 'Desconocido'}</p>
            <p><strong>Lugar de nacimiento:</strong> {selectedHero.biography?.["place-of-birth"] || 'Desconocido'}</p>
            <p><strong>Alias:</strong> {selectedHero.biography?.aliases?.join(', ') || 'Ninguno'}</p>
            <p><strong>Grupo de afiliación:</strong> {selectedHero.connections?.["group-affiliation"] || 'Ninguno'}</p>
            <p><strong>Relaciones:</strong> {selectedHero.connections?.["relatives"] || 'Ninguno'}</p>
            <p><strong>Inteligencia:</strong> {selectedHero.powerstats?.intelligence || 'N/A'}</p>
            <p><strong>Fuerza:</strong> {selectedHero.powerstats?.strength || 'N/A'}</p>
            <p><strong>Velocidad:</strong> {selectedHero.powerstats?.speed || 'N/A'}</p>
            <p><strong>Resistencia:</strong> {selectedHero.powerstats?.durability || 'N/A'}</p>
            <p><strong>Poder:</strong> {selectedHero.powerstats?.power || 'N/A'}</p>
            <p><strong>Combate:</strong> {selectedHero.powerstats?.combat || 'N/A'}</p>
          </div>
        </div>
      )}
      {!loading && heroes.length === 0 && !error && (
        <p>No se encontraron superhéroes</p>
      )}

      <p>Powered by SuperHero API</p>
    </>
  )
}

export default App