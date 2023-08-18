import React, { useEffect, useState } from 'react';
import { getAllMovies} from '../../api/api-helper';
import MovieBanner from '@/components/moviebanner';

const Film = () => {
  const [films, setFilms] = useState([]);

 
  useEffect(() => {
    getAllMovies()
      .then((data) => setFilms(data))
      .catch((err) => console.log(err));
    console.log(films);
  }, [])


  return (
    <div className=" relative p-10">
      <div className="flex flex-col items-center justify-center h-48 my-14 ">
        <h1 className="text-4xl md:text-5xl lg:text-[180px] italic font-dancing font-semibold text-center text-textColor">Sea Movie</h1>
      </div>
      <MovieBanner/>
      <div className="flex flex-col h-42 ">
        <h2 className=" text-lg md:text-5xl lg:text-6xl ml-10 font-poppins font-semibold text-textColor mt-10">All Movies</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto p-10 ">
        {films.map((film) => (
          <a href={`/film/${film._id}`} key={film._id} className="bg-primary rounded-lg overflow-hidden hover:shadow-2xl transition ease-in-out delay-150 transform hover:-translate-y-1 hover:scale-110 duration-200 group">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={film.poster_url}
                alt={film.title}
                className="object-cover rounded"
              />
            </div>
            <div className="p-4 relative">
              <h2 className="text-sm md:text-base font-merriweather font-semibold h-12 md:h-16 lg:h-20 mb-2 text-center">{film.title}</h2>
              <p className="text-xs font-merriweather font-semibold text-denary group-hover:text-textColor absolute right-2 bottom-2 ml-auto">
                see more &gt;
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
  
};

export default Film;
