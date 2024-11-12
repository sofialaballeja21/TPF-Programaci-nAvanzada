import React, { useEffect, useState } from 'react';
import { getData } from '../utils/getData';  
import { useNavigate } from 'react-router-dom';

const imagenUrl = 'https://image.tmdb.org/t/p/w500';

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData({ page: currentPage });
        setData(result);
        setTotalPages(result.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div className="text-center text-xl text-customBlueMedium">Cargando...</div>;
  if (error) return <div className="text-center text-xl text-red-500">Error al cargar los datos: {error}</div>;

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const maxPagesVisible = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesVisible - 1);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto px-6 py-12 bg-customBlueExtraLight min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-customBlueDark">Películas Populares</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data && data.results.map((movie) => (
          <div 
            key={movie.id} 
            className="bg-customBlueLight p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => handleMovieClick(movie.id)}
          >
            {movie.poster_path ? (
              <img
                src={`${imagenUrl}${movie.poster_path}`} 
                alt={movie.original_title} 
                className="w-full h-auto rounded-md mb-4"
              />
            ) : (
              <div className="bg-customBlueDark w-full h-64 rounded-md mb-4 flex items-center justify-center text-customBlueExtraLight">
                No Image Available
              </div>
            )}
            <h2 className="text-xl font-semibold text-customBlueDark">{movie.original_title}</h2>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 space-x-4">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          className="bg-customBlueMedium hover:bg-customBlueDark text-white px-4 py-2 rounded-md"
          disabled={currentPage === 1}
        >
          Atrás
        </button>

        {startPage > 1 && <span className="px-2 text-customBlueDark">...</span>}
        {pageNumbers.map((page) => (
          <button 
            key={page} 
            onClick={() => handlePageChange(page)} 
            className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-customBlueDark text-white' : 'bg-customBlueMedium text-white hover:bg-customBlueDark'}`}
          >
            {page}
          </button>
        ))}
        {endPage < totalPages && <span className="px-2 text-customBlueDark">...</span>}

        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          className="bg-customBlueMedium hover:bg-customBlueDark text-white px-4 py-2 rounded-md"
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Home;



