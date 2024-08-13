import React, { useEffect, useState } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';

const IntervenantHome: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState<string | null>(null);
    const [surname, setSurname] = useState<string | null>(null);

    useEffect(() => {
        // Vérifier si authToken est présent dans le localStorage
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            // Si authToken n'est pas présent, rediriger vers la page de connexion ou une autre page appropriée
            navigate('/intervenant-login');
        } else {
            // Si authToken est présent, récupérer les valeurs name et surname
            const storedName = localStorage.getItem('name');
            const storedSurname = localStorage.getItem('surname');

            // Mettre à jour les variables d'état
            setName(storedName);
            setSurname(storedSurname);
        }
    }, [navigate]);

    return (
        <>
            <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm" style={{ marginLeft: "400px", paddingTop: "10px", width: "1000px" }}>
                <nav className="w-full bg-white border border-orange-400 rounded-[2rem] mx-2 py-2.5 md:flex md:items-center md:justify-between md:py-0 md:px-4 md:mx-auto" style={{ fontFamily: "Space Grotesk" }}>
                    <div className="relative flex justify-between items-center">
                        <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80 absolute top-0 left-0 transform transition-transform duration-300 hover:translate-x-1 hover:translate-y-1" href="/intervenant-home" aria-label="Preline" style={{ color: "orange", zIndex: 10 }}>
                            Companion
                        </a>
                        <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="/intervenant-home" aria-label="Preline" style={{ color: "black" }}>
                            Companion
                        </a>
                    </div>

                    <div id="hs-navbar-header-floating" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-navbar-header-floating-collapse">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
                            <Link to="/intervenant-home" className={`py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${location.pathname === '/intervenant-home' ? 'border-black text-orange-500' : 'border-transparent text-gray-500'} hover:text-gray-800`}>
                                Home
                            </Link>
                            <Link to="/intervenant-votes" className={`py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${location.pathname === '/intervenant-votes' ? 'border-black text-orange-500' : 'border-transparent text-gray-500'} hover:text-gray-800`}>
                                Votes
                            </Link>
                            <Link to="/intervenant-documents" className={`py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${location.pathname === '/intervenant-documents' ? 'border-black text-orange-500' : 'border-transparent text-gray-500'} hover:text-gray-800`}>
                                Documents
                            </Link>
                            <Link to="/intervenant-cotisations" className={`py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${location.pathname === '/intervenant-cotisations' ? 'border-black text-orange-500' : 'border-transparent text-gray-500'} hover:text-gray-800`}>
                                Cotisations
                            </Link>
                            <Link to="/intervenant-profile" className={`py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${location.pathname === '/intervenant-profile' ? 'border-black text-orange-500' : 'border-transparent text-gray-500'} hover:text-gray-800`}>
                                <span style={{ color: "orange" }}>P</span>rofil
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main style={{ fontFamily: "Space Grotesk", margin: "10px" }} >
                <div className="flex">
                    <div className="w-2/3">
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" style={{ borderWidth: "1px", borderColor: "orange", borderRadius: "20px", marginTop: "50px" }}>
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Missions Realisees</span><br></br><hr></hr><br></br>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Activite Test 1
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    10/08/2024 10:05
                                                </p>
                                            </div>
                                            <div>
                                                <svg className="shrink-0 size-5 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Activite Test 2
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    10/08/2024 10:05
                                                </p>
                                            </div>
                                            <div>
                                                <svg className="shrink-0 size-5 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Activite Test 3
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    10/08/2024 10:05
                                                </p>
                                            </div>
                                            <div>
                                                <svg className="shrink-0 size-5 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Activite Test 4
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    10/08/2024 10:05
                                                </p>
                                            </div>
                                            <div>
                                                <svg className="shrink-0 size-5 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div>
                        <br></br><br></br>
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" style={{ borderWidth: "1px", borderColor: "orange", borderRadius: "20px", marginTop: "50px" }}>
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Missions Ouvertes</span><br></br><hr></hr><br></br>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Activite Test A
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    10/08/2024 10:05
                                                </p>
                                            </div>
                                            <div>
                                                <svg className="shrink-0 size-5 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Activite Test B
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    10/08/2024 10:05
                                                </p>
                                            </div>
                                            <div>
                                                <svg className="shrink-0 size-5 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Activite Test C
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    10/08/2024 10:05
                                                </p>
                                            </div>
                                            <div>
                                                <svg className="shrink-0 size-5 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Activite Test D
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    10/08/2024 10:05
                                                </p>
                                            </div>
                                            <div>
                                                <svg className="shrink-0 size-5 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 ml-4">
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" style={{ borderWidth: "1px", borderColor: "orange", borderRadius: "20px", marginTop: "50px", height: "calc(100% - 50px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <h2 className="text-2xl font-bold mb-4 text-center">Bienvenue sur votre espace Intervenant</h2>
                            <h3 style={{fontWeight:"bold",color:"orange"}}>{surname} {name}</h3>
                            <p className="text-center">
                                Ici, vous pouvez <span style={{color:"orange",fontWeight:"bold"}}><u><span style={{color:"black",fontWeight:"bold"}}>consulter vos missions réalisées et ouvertes</span></u></span>.
                                N'hésitez pas à cliquer sur les différentes missions pour vous positionnez dessus ou les consulter.
                            </p>
                            {/* <button className="mt-6 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-300">
                                Commencer une nouvelle mission
                            </button> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default IntervenantHome;
