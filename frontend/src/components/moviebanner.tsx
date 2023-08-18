import * as React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import banner_antmant from '@/assets/images/banner_antmant.jpg';
import banner_peterpan from '@/assets/images/banner_peterpan.jpeg';
import banner_fastx from '@/assets/images/banner_fastx.jpg';
import banner_infinitywar from '@/assets/images/banner_infinitywar.jpg';
import banner_topgun from '@/assets/images/banner_topgun.jpg';
import Image from 'next/image';

const slides = [
  {
    path: banner_antmant,
    id:"64a481e4e7116e7eac98a4c9"
  },
  {
    path: banner_peterpan,
    id:"64a482d2e7116e7eac98a4e9"
  },
  {
    path: banner_fastx,
    id:"64a4671ddb1cd17266c811c2"

  },
  {
    path: banner_infinitywar,
    id:"64a48423e7116e7eac98a51d"
  },
  {
    path: banner_topgun,
    id:"64a483dfe7116e7eac98a511"
  },
];

const MovieBanner = () => {
  const [current, setCurrent] = React.useState(0);
  const [transition, setTransition] = React.useState(false);

  const goToPreviousSlide = () => {
    if (!transition) {
      setTransition(true);
      setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
    }
  };

  const goToNextSlide = () => {
    if (!transition) {
      setTransition(true);
      setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
    }
  };

  React.useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    setTransition(false);
  };

  return (
    <div className='max-w-[1050px] h-[650px] w-full m-auto pb-16 px-4 relative group rounded-xl overflow-hidden'>
      <div
        className={`w-full h-full rounded-2xl duration-1000 transition-opacity ease-in-out
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((slide, index) => (
            <div
                key={index}
                className={`h-full w-full absolute top-0 left-0 ${
                current === index ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-500`}
            >
                <Image src={slide.path} alt='' className='h-full w-full' />

                {current === index && (
                <button
                    className=' bg-background text-primary px-8 py-2 rounded absolute bottom-10 left-10 transition ease-in-out delay-150 transform hover:text-textColor hover:-translate-y-1 hover:scale-110 duration-200'
                    onClick={() => console.log('See More Clicked')}
                    style={{ zIndex: slides.length - index }}
                >
                    <a href={`/film/${slide.id}`}>See More</a>
                </button>
                )}
            </div>
            ))}

      </div>

      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <button onClick={goToPreviousSlide}>
          <ArrowBackIosNewIcon />
        </button>
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <button onClick={goToNextSlide}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default MovieBanner;
