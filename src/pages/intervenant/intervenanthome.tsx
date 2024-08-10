import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IntervenantHome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier la présence du token dans le localStorage
    const authToken = localStorage.getItem('authToken');
    
    // Si le token est absent ou null, rediriger vers la page d'accueil
    if (!authToken) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm" style={{ paddingLeft: "600px", paddingTop: "5px" }}>
        <nav className="w-full bg-white border border-orange-400 rounded-[2rem] mx-2 py-2.5 md:flex md:items-center md:justify-between md:py-0 md:px-4 md:mx-auto" style={{ fontFamily: "Space Grotesk" }}>
          <div className="relative flex justify-between items-center">
            <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80 absolute top-0 left-0 transform transition-transform duration-300 hover:translate-x-1 hover:translate-y-1" href="/" aria-label="Preline" style={{ color: "orange", zIndex: 10 }}>
              Companion
            </a>
            <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="/" aria-label="Preline" style={{ color: "black" }}>
              Companion
            </a>
          </div>

          <div id="hs-navbar-header-floating" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-navbar-header-floating-collapse">
            <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
              <a className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-gray-800 font-medium text-gray-800 focus:outline-none dark:border-neutral-200 dark:text-neutral-200" href="#" aria-current="page">Home</a>
              <a className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200" href="#">Projects</a>
              <a className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200" href="#">Work</a>
              <a className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200" href="#">Articles</a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default IntervenantHome;
