// src/pages/AdministrateurLogIn.tsx
import { Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, useToast  } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Joi from "joi";

const voteValidationSchema = Joi.object({
    description: Joi.string().required(),
    starting: Joi.date().iso().min('now').required(), 
    ending: Joi.date().iso().greater(Joi.ref('starting')).required(),
    rounds: Joi.number().min(1).max(3).required()
}).options({ abortEarly: false });

const AdminVotes: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const [name, setName] = useState<string | null>(null);
    const [surname, setSurname] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [starting, setStarting] = useState<string>('');
    const [ending, setEnding] = useState<string>('');
    const [rounds, setRounds] = useState<number>(1);
    const [description, setDescription] = useState<string>('');
    const handleSubmit = async () => {
        const voteData = {
            description,
            starting,
            ending,
            rounds
        };

        const { error } = voteValidationSchema.validate(voteData);
        if (error) {
            toast({
                title: "Erreur de validation",
                description: error.details.map((err) => err.message).join(', '),
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(voteData),
            });

            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de l\'envoi du formulaire.');
            }

            toast({
                title: "Succès",
                description: "Le vote a été créé avec succès.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            navigate('/admin-votes');
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de la création du vote.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

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
                        <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80 absolute top-0 left-0 transform transition-transform duration-300 hover:translate-x-1 hover:translate-y-1" href="/admin-home" aria-label="Preline" style={{ color: "orange", zIndex: 10 }}>
                            Companion
                        </a>
                        <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="/intervenant-home" aria-label="Preline" style={{ color: "black" }}>
                            Companion
                        </a>
                    </div>

                    <div id="hs-navbar-header-floating" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-navbar-header-floating-collapse">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
                            <Link to="/admin-home" className={`py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${location.pathname === '/admin-home' ? 'border-black text-orange-500' : 'border-transparent text-gray-500'} hover:text-gray-800`}>
                                Home
                            </Link>
                            <Link to="/admin-votes" className={`py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${location.pathname === '/admin-votes' ? 'border-black text-orange-500' : 'border-transparent text-gray-500'} hover:text-gray-800`}>
                                Votes
                            </Link>
                            <Link to="/admin-documents" className={`py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${location.pathname === '/admin-documents' ? 'border-black text-orange-500' : 'border-transparent text-gray-500'} hover:text-gray-800`}>
                                Documents
                            </Link>
                            <Link to="/admin-cotisations" className={`py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${location.pathname === '/admin-cotisations' ? 'border-black text-orange-500' : 'border-transparent text-gray-500'} hover:text-gray-800`}>
                                Cotisations
                            </Link>
                            <Link to="/admin-profile" className={`py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${location.pathname === '/admin-profile' ? 'border-black text-orange-500' : 'border-transparent text-gray-500'} hover:text-gray-800`}>
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
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Historique</span><br></br><hr></hr><br></br>
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
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Nouveau Vote</span><br></br><hr></hr><br></br>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                                <div>Description:</div>
                                <Input
                                    placeholder='Entrez une description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div>Rounds:</div>
                                <NumberInput
                                    size='sm'
                                    maxW={16}
                                    value={rounds}
                                    min={1}
                                    max={3}
                                    onChange={(value) => setRounds(Number(value))}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <div>Starting:</div>
                                <Input
                                    type="datetime-local"
                                    value={starting}
                                    onChange={(e) => setStarting(e.target.value)}
                                    style={{ borderColor: "orange", borderWidth: "2px" }}
                                />
                                <div>Ending:</div>
                                <Input
                                    type="datetime-local"
                                    value={ending}
                                    onChange={(e) => setEnding(e.target.value)}
                                    style={{ borderColor: "orange", borderWidth: "2px" }}
                                />
                                <Button
                                    onClick={handleSubmit}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    style={{
                                        width: "100px",
                                        height: "40px",
                                        borderRadius: "10px",
                                        fontSize: "20px",
                                        color: isHovered ? "white" : "orange",
                                        borderColor: "orange",
                                        backgroundColor: isHovered ? "orange" : "transparent",
                                    }}
                                >
                                    Open
                                </Button>
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

export default AdminVotes;
