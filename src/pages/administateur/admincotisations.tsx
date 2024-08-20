// src/pages/AdministrateurLogIn.tsx
import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminCotisations: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState<string | null>(null);
    const [surname, setSurname] = useState<string | null>(null);
    const [amount, setAmount] = useState(5); // Valeur par défaut
    const [description, setDescription] = useState('');
    const [paypalLink, setPaypalLink] = useState('');
    const [donations, setDonations] = useState<any[]>([]);

    const handleAmountChange = (value: number) => setAmount(Number(value));
    const handleDescriptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setDescription(e.target.value);

    const handleSubmit = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/donation`, {
                amount,
                description,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (response.status === 200) {
                setPaypalLink(response.data.message.split('open this on your current navigator: ')[1]);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de la donation:", error);
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
            const fetchDonations = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/donations/${localStorage.getItem('id')}`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });

                    if (response.status === 200) {
                        setDonations(response.data); // Store the donations data in state
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des donations:", error);
                }
            };
            fetchDonations();
        }
    }, [navigate]);

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 0.01,
            defaultValue: 0.5,
            min: 1,
            max: 6,
            precision: 2,
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

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
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Sommes deposees</span><br></br><hr></hr><br></br>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-3 sm:gap-6">
                                <div className="flex flex-col">
                                    <div className="-m-1.5 overflow-x-auto">
                                        <div className="p-1.5 min-w-full inline-block align-middle">
                                            <div className="border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900" style={{overflow:"scroll"}}>
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                                    <thead>
                                                        <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Description</th>
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Amount</th>
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                                    {donations.length > 0 ? (
                                                            donations.map((donation) => (
                                                                <tr className="divide-x divide-gray-200 dark:divide-neutral-700" key={donation.id}>
                                                                    <td className="whitespace-nowrap p-2">{donation.description}</td>
                                                                    <td className="whitespace-nowrap p-2">{donation.amount}💲</td>
                                                                    <td className="whitespace-nowrap p-2">{new Date(donation.createdAt).toLocaleString()}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td className="whitespace-nowrap p-2 text-center" colSpan={3}>Aucune somme déposée</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <br></br><br></br>
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" style={{ borderWidth: "1px", borderColor: "orange", borderRadius: "20px", marginTop: "50px" }}>
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Nouveau Depot</span><br></br><hr></hr><br></br>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-3 sm:gap-6" style={{ color: "orange", display: "inline-block" }}>
                                <u>
                                    <label style={{ fontWeight: 'bold', color: "black" }}>Montant💲</label>
                                </u>
                                <HStack maxW='320px'>
                                    <Button onClick={() => handleAmountChange(amount + 1)}>+</Button>
                                    <Input value={amount} onChange={(e) => handleAmountChange(e.target.value)} />
                                    <Button onClick={() => handleAmountChange(amount - 1)}>-</Button>
                                </HStack>
                                <u>
                                    <label style={{ fontWeight: 'bold', color: "black" }}>Description </label>
                                </u>
                                <Input placeholder='Entrez une description' value={description} onChange={handleDescriptionChange} />
                            </div><br></br>
                            <button onClick={handleSubmit} style={{ color: "orange", borderColor: "orange", borderWidth: "1px", width: "200px", padding: "5px", margin: "5px" }}>Submit</button>
                            <br></br>
                            {paypalLink && (
                                <div>
                                    <a href={paypalLink} target="_blank" rel="noopener noreferrer" style={{color:"blue"}}>Cliquez ici pour finaliser votre donation via PayPal</a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-1/3 ml-4">
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" style={{ borderWidth: "1px", borderColor: "orange", borderRadius: "20px", marginTop: "50px", height: "calc(100% - 50px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <h2 className="text-2xl font-bold mb-4 text-center">Bienvenue sur votre espace Intervenant</h2>
                            <h3 style={{ fontWeight: "bold", color: "orange" }}>{surname} {name}</h3>
                            <p className="text-center">
                                Ici, vous pouvez <span style={{ color: "orange", fontWeight: "bold" }}><u><span style={{ color: "black", fontWeight: "bold" }}>consulter vos depots et en initier de nouveaux</span></u></span>.
                                N'hésitez pas à signaler tout probleme survenant durant un depot ou dans votre historique.
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

export default AdminCotisations;
