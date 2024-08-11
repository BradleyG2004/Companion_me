// src/pages/AdministrateurLogIn.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FileManager from '../../components/filemanager';
import DocumentTable from '../../components/documenttable';
// import ThreeScene from '../../components/Threescene';

const IntervenantDocuments: React.FC = () => {
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
                                <span style={{ color: "orange" }}>P</span>rofile
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main style={{ fontFamily: "Space Grotesk", margin: "10px" }} >
                <div className="flex">
                    <div className="w-2/3">
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" style={{ borderWidth: "1px", borderColor: "orange", borderRadius: "20px", marginTop: "50px" }}>
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Documents Deposes</span><br></br><hr></hr><br></br>
                            <div>
                                <DocumentTable></DocumentTable>
                            </div>
                        </div>
                        <br></br>
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" style={{ borderWidth: "1px", borderColor: "orange", borderRadius: "20px", marginTop: "50px" }}>
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Deposer un document</span><br></br><hr></hr><br></br>
                            <div>
                                <FileManager></FileManager>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 ml-4">
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" style={{ borderWidth: "1px", borderColor: "orange", borderRadius: "20px", marginTop: "50px", height: "calc(100% - 50px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <h2 className="text-2xl font-bold mb-4 text-center">Bienvenue sur votre espace Intervenant</h2>
                            <h3 style={{ fontWeight: "bold", color: "orange" }}>{surname} {name}</h3>
                            <p className="text-center">
                                Ici, vous pouvez <span style={{ color: "orange", fontWeight: "bold" }}><u><span style={{ color: "black", fontWeight: "bold" }}>consulter vos missions réalisées et ouvertes</span></u></span>.
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

export default IntervenantDocuments;
