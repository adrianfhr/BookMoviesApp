import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/components/navbar";
import FilmDetail from '@/movies/filmDetail';
import { getMovieDetails } from '../../../api/api-helper';
import Footer from '@/components/footer';

const FilmPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [filmData, setFilmData] = useState(null);

  useEffect(() => {
    getMovieDetails(id)
      .then((data) => {
        setFilmData(data.movie);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  
  return (
    <div className='bg-background h-screen'>
      <Navbar />
      <div className= "my-auto mx-auto">
        {filmData !== null ? (
          <FilmDetail film={filmData} />
        ) : (
          <p>Loading film data...</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default FilmPage;
