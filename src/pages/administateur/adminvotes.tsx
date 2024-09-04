// src/pages/AdministrateurLogIn.tsx
import { Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, useToast, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const AdminVotes: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const [dates, setDates] = useState([{ starting: '', ending: '' }]);
    const [votes, setVotes] = useState<Vote[] | null>(null);
    const [propos, setPropos] = useState([{ description: '' }]);
    const [name, setName] = useState<string | null>(null);
    const [surname, setSurname] = useState<string | null>(null);
    const [selectedPropositionsByVote, setSelectedPropositionsByVote] = useState<{ [key: string]: string }>({});

    const now = new Date();

    const [starting, setStarting] = useState<string>('');
    const [ending, setEnding] = useState<string>('');
    const [rounds, setRounds] = useState<number>(1);
    // const [propositions, setPropositions] = useState<Proposition[]>([]);
    const [propositionss, setPropositionss] = useState<number>(2);
    const [description, setDescription] = useState<string>('');
    interface Proposition {
        id: string | number;
        description: string;
    }
    const [propositionsByVote, setPropositionsByVote] = useState<{ [key: string]: Proposition[] }>({});
    const [roundIdByVote, setRoundIdByVote] = useState<{ [key: string]: number | string }>({});

    const handleSubmit = async () => {
        const voteData = {
            description,
            starting,
            ending,
            rounds
        };


        try {
            // Step 1: Create the vote
            const voteResponse = await fetch(`${import.meta.env.VITE_API_URL}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(voteData),
            });

            if (!voteResponse.ok) {
                throw new Error('Une erreur est survenue lors de la création du vote.');
            }

            const voteResult = await voteResponse.json();
            const voteId = voteResult.id; // Assuming the API returns the voteId as `id`

            // Step 2: Create the rounds
            console.log(dates)
            for (let i = 0; i < rounds; i++) {
                const roundData = {
                    starting: dates[i].starting,
                    ending: dates[i].ending,
                    voteId: voteId,
                };

                const roundResponse = await fetch(`${import.meta.env.VITE_API_URL}/round`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    },
                    body: JSON.stringify(roundData),
                });

                if (!roundResponse.ok) {
                    throw new Error(`Une erreur est survenue lors de la création du round ${i + 1}.`);
                }
            }

            // Step 3: Create the propositions
            for (let i = 0; i < propositionss; i++) {
                const propositionData = {
                    description: propos[i].description,
                    voteId: voteId,
                };

                const propositionResponse = await fetch(`${import.meta.env.VITE_API_URL}/proposition`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    },
                    body: JSON.stringify(propositionData),
                });

                if (!propositionResponse.ok) {
                    throw new Error(`Une erreur est survenue lors de la création de la proposition ${i + 1}.`);
                }
            }

            toast({
                title: "Succès",
                description: "Le vote, les rounds et les propositions ont été créés avec succès.",
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
    const handleDateChange = (index: number, type: 'starting' | 'ending', value: string) => {
        const newDates = [...dates];
        newDates[index][type] = value;
        setDates(newDates);
    };
    const handlePropositionChange = (index: number, type: 'description', value: string) => {
        const newPropos = [...propos];
        newPropos[index][type] = value;
        setPropos(newPropos);
    };
    const handleRoundsChange = (value: string) => {
        const newRounds = Number(value);
        setRounds(newRounds);

        // Adjust the number of date pairs according to the number of rounds
        const newDates = [...dates];
        if (newRounds > dates.length) {
            for (let i = dates.length; i < newRounds; i++) {
                newDates.push({ starting: '', ending: '' });
            }
        } else {
            newDates.length = newRounds;
        }
        setDates(newDates);
    };
    const handlePropositionssChange = (value: string) => {
        const newPropositions = Number(value);
        setPropositionss(newPropositions);

        const newPropos = [...propos];
        if (newPropositions > propos.length) {
            for (let i = propos.length; i < newPropositions; i++) {
                newPropos.push({ description: '' });
            }
        } else {
            newPropos.length = newPropositions;
        }
        setPropos(newPropos);
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
            fetchVotes();
        }
    }, [navigate]);

    
    const fetchVotes = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/votes`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const data = await response.json();
            setVotes(data.votes);
            checkActiveVote(data.votes);
        } catch (error) {
            console.error('Error fetching votes:', error);
        }
    };

    interface Vote {
        id: string | number;
        description: string;
        starting: string;
        ending: string;
    }
    const remHours = (date: Date, hours: number): Date => {
        const newDate = new Date(date);
        newDate.setHours(newDate.getHours() - hours);
        return newDate;
    };

    const checkActiveVote = async (votes: Vote[]) => {
        const now = new Date();
        for (const vote of votes) {
            const roundsResponse = await fetch(`${import.meta.env.VITE_API_URL}/rounds/${vote.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const rounds = await roundsResponse.json();
            for (const round of rounds) {
                const startDate = remHours(new Date(round.starting), 2);
                const endDate = remHours(new Date(round.ending), 2);
                if (now >= startDate && now <= endDate) {
                    // Fetch propositions only for the active round
                    await fetchPropositions(vote.id, round.id);
                    break;
                }
            }
        }
    };

    const fetchPropositions = async (voteId: number | string, roundId: number | string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/propositions/${voteId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const data = await response.json();

            // Store propositions and roundId associated with this vote
            setPropositionsByVote(prevState => ({
                ...prevState,
                [voteId]: data
            }));
            setRoundIdByVote(prevState => ({
                ...prevState,
                [voteId]: roundId
            }));

            // Log the propositions for debugging
            console.log('Fetched propositions for vote:', voteId, data);
        } catch (error) {
            console.error('Error fetching propositions:', error);
        }
    };

    const handleVote = async (voteId: number | string) => {
        const selectedProposition = selectedPropositionsByVote[voteId];
        if (!selectedProposition) {
            toast({
                title: "Erreur",
                description: "Veuillez sélectionner une proposition",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/choice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    propositionId: selectedProposition,
                    roundId: roundIdByVote[voteId], // Utilisation du roundId associé à ce vote
                })
            });

            if (response.ok) {
                toast({
                    title: "Succès",
                    description: "Votre vote a été enregistré",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                fetchVotes(); // Rafraîchir les votes après un vote réussi
            } else {
                throw new Error('Erreur lors du vote');
            }
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors du vote",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };
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
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-3 sm:gap-6">
                                <div className="flex flex-col">
                                    <div className="-m-1.5 overflow-x-auto">
                                        <div className="p-1.5 min-w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Description</th>
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Starting</th>
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Ending</th>
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">State</th>
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Choices</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                                        {votes?.map((vote) => {
                                                            const startDate = remHours(new Date(vote.starting), 2);
                                                            const endDate = remHours(new Date(vote.ending), 2);
                                                            const isActive = now >= startDate && now <= endDate;

                                                            return (
                                                                <tr key={vote.id} className={isActive ? "bg-red-100" : "bg-gray-100"}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-800">
                                                                        {vote.description}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                                        {new Date(startDate).toLocaleString()}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                                        {new Date(endDate).toLocaleString()}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                                        {isActive ? "Running" : "Closed/Unstarted"}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                                        {isActive ? (
                                                                            <>
                                                                                <Select
                                                                                    value={selectedPropositionsByVote[vote.id] || ""}
                                                                                    onChange={(e) => {
                                                                                        const newSelection = e.target.value;
                                                                                        setSelectedPropositionsByVote((prevState) => ({
                                                                                            ...prevState,
                                                                                            [vote.id]: newSelection,
                                                                                        }));
                                                                                    }}
                                                                                >
                                                                                    <option value="">Select a proposition</option>
                                                                                    {propositionsByVote[vote.id]?.map((prop: Proposition) => (
                                                                                        <option key={prop.id} value={prop.id}>
                                                                                            {prop.description}
                                                                                        </option>
                                                                                    ))}
                                                                                </Select>
                                                                                <Button onClick={() => handleVote(vote.id)} style={{ padding: "5px" }}>🗳️</Button>
                                                                            </>
                                                                        ) : (
                                                                            "---"
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
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
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Nouveau Vote</span><br></br><hr></hr><br></br>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-3 sm:gap-6">
                                <table>
                                    <tr>
                                        <td>
                                            <div className="relative flex justify-between items-center">
                                                <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80 absolute top-0 left-0 transform transition-transform duration-300 hover:translate-x-1 hover:translate-y-1" aria-label="Preline" style={{ color: "orange", zIndex: 10 }}>
                                                    VOTE
                                                </a>
                                                <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80" aria-label="Preline" style={{ color: "black" }}>
                                                    VOTE
                                                </a>
                                            </div>
                                            <div>Description:</div>
                                            <Input
                                                style={{ width: "70%" }}
                                                placeholder='Entrez une description'
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <td colSpan={2}>
                                                <div>Rounds </div>
                                                <NumberInput
                                                    size='sm'
                                                    maxW={16}
                                                    value={rounds}
                                                    min={1}
                                                    max={3}
                                                    onChange={(value) => handleRoundsChange(value)}
                                                >
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </td>
                                            <td style={{ padding: "30px" }}>
                                                <div>Propositions </div>
                                                <NumberInput
                                                    size='sm'
                                                    maxW={16}
                                                    value={propositionss}
                                                    min={1}
                                                    max={5}
                                                    onChange={(value) => handlePropositionssChange(value)}
                                                >
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </td>
                                        </td>
                                    </tr>
                                    <tr><td>
                                        <div>Starting:</div>
                                        <Input
                                            type="datetime-local"
                                            value={starting}
                                            onChange={(e) => setStarting(e.target.value)}
                                            style={{ borderColor: "orange", borderWidth: "2px", width: "70%" }}
                                        />
                                    </td>
                                        <td>
                                            <div>Ending:</div>
                                            <Input
                                                type="datetime-local"
                                                value={ending}
                                                onChange={(e) => setEnding(e.target.value)}
                                                style={{ borderColor: "orange", borderWidth: "2px", width: "70%" }}
                                            />
                                        </td>
                                    </tr>
                                </table>
                                <div className="relative flex justify-between items-center">
                                    <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80 absolute top-0 left-0 transform transition-transform duration-300 hover:translate-x-1 hover:translate-y-1" aria-label="Preline" style={{ color: "orange", zIndex: 10 }}>
                                        ROUNDS
                                    </a>
                                    <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80" aria-label="Preline" style={{ color: "black" }}>
                                        ROUNDS
                                    </a>
                                </div>
                                <div>
                                    {dates.map((round, index) => (
                                        <div style={{ borderWidth: "2px", borderColor: "orange", display: "inline-block", marginRight: "100px", padding: "10px", borderRadius: "10px" }}>
                                            <React.Fragment key={index}>
                                                <div>Starting Round {index + 1}:</div>
                                                <Input
                                                    type="datetime-local"
                                                    value={round.starting}
                                                    onChange={(e) => handleDateChange(index, 'starting', e.target.value)}
                                                    style={{ borderColor: "orange", borderWidth: "2px" }}
                                                />
                                                <div>Ending Round {index + 1}:</div>
                                                <Input
                                                    type="datetime-local"
                                                    value={round.ending}
                                                    onChange={(e) => handleDateChange(index, 'ending', e.target.value)}
                                                    style={{ borderColor: "orange", borderWidth: "2px" }}
                                                />
                                            </React.Fragment>
                                        </div>
                                    ))}
                                </div>
                                <div className="relative flex justify-between items-center">
                                    <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80 absolute top-0 left-0 transform transition-transform duration-300 hover:translate-x-1 hover:translate-y-1" aria-label="Preline" style={{ color: "orange", zIndex: 10 }}>
                                        PROPOSITIONS
                                    </a>
                                    <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80" aria-label="Preline" style={{ color: "black" }}>
                                        PROPOSITIONS
                                    </a>
                                </div>
                                <div>
                                    {propos.map((round, index) => (
                                        <div style={{ borderWidth: "2px", borderColor: "orange", display: "inline-block", marginRight: "100px", padding: "10px", borderRadius: "10px" }}>
                                            <React.Fragment key={index}>
                                                <div>Description Proposition {index + 1}:</div>
                                                <Input
                                                    value={round.description}
                                                    onChange={(e) => handlePropositionChange(index, 'description', e.target.value)}
                                                    style={{ borderColor: "orange", borderWidth: "2px" }}
                                                />
                                            </React.Fragment>
                                        </div>
                                    ))}
                                </div>
                                <br></br>
                                <Button
                                    style={{ borderColor: "orange", borderWidth: "7px" }}
                                    onClick={handleSubmit}
                                >
                                    Submit
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
