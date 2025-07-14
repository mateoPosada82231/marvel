import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchMarvelCharacters = async (search = '') => {
    setLoading(true);
    try {
      // Usamos nuestro backend para hacer la petición
      let url = 'http://localhost:3001/api/marvel/characters';
      
      // Añadimos parámetros de búsqueda si existen
      if (search) {
        url += `?nameStartsWith=${encodeURIComponent(search)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Error al obtener datos de la API de Marvel')
      }
      
      const data = await response.json()
      setCharacters(data.data.results || [])
      setError(null);
    } catch (err) {
      console.error('Error:', err)
      setError('No pudimos cargar los personajes. Intenta de nuevo más tarde.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarvelCharacters()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMarvelCharacters(searchTerm);
  }

  return (
    <>
      <h1>Marvel Characters</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar personaje..."
        />
        <button type="submit">Buscar</button>
      </form>
      
      {loading && <p>Cargando personajes...</p>}
      {error && <p className="error">{error}</p>}
      
      {characters.length > 0 && (
        <div className="characters-grid">
          {characters.map(character => (
            <div key={character.id} className="character-card">
              <h3>{character.name}</h3>
              {character.thumbnail && (
                <img 
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                  alt={character.name}
                  className="character-image"
                />
              )}
              {character.description && <p>{character.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {!loading && characters.length === 0 && !error && (
        <p>No se encontraron personajes</p>
      )}
      
      <p>Powered by Marvel API</p>
    </>
  )
}

export default App