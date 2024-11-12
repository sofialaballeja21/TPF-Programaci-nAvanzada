import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons'; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para los resultados de búsqueda
  const [loading, setLoading] = useState(false); // Estado para el cargando
  const [error, setError] = useState(null); // Estado para errores

  const logo = <FontAwesomeIcon icon={faTicket} style={{color: "#f0f0f0",}} size="2xl"/>;

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=94a49cba2e09398c1ec43ef890550064&query=${searchTerm}`
        );
        const data = await response.json();
        if (data.results) {
          setSearchResults(data.results); // Guardar los resultados de búsqueda
        } else {
          setSearchResults([]); // Si no hay resultados, mantener un array vacío
        }
      } catch (err) {
        setError('Error al buscar películas.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <header className="bg-customBlueDark text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="logo flex items-center space-x-4">
          {logo} 
          <a className="text-5xl font-bold text-transparent bg-clip-text bg-customBlueMedium">
            Toto Video
          </a>
        </div>

        {/* Menú de navegación */}
        <nav className={`md:flex space-x-6 ${menuOpen ? 'block' : 'hidden'}`}>
          <a href="/" className="hover:text-gray-400">Inicio</a>
        </nav>

        {/* Input de búsqueda y botón */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar películas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(); // Llama a la función de búsqueda cuando se presiona Enter
              }
            }}
            className="w-80 p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-md"
          >
            Buscar
          </button>
        </div>

        {/* Menú hamburguesa para pantallas pequeñas */}
        <div className="md:hidden">
          <button
            className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mostrar resultados de búsqueda */}
      {loading && <p className="text-center text-xl text-customBlueMedium">Cargando...</p>}
      {error && <p className="text-center text-xl text-red-500">{error}</p>}
      
      <div>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {searchResults.map((movie) => (
              <div key={movie.id} className="bg-customBlueLight p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
              </div>
            ))}
          </div>
        ) : searchTerm && !loading && !error ? (
          <p className="text-center text-xl text-customBlueDark">No se encontraron resultados.</p>
        ) : null}
      </div>
    </header>
  );
};

export default Header;

