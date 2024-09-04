import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface User {
    id: number;
    email: string;
    name: string;
    surname: string;
    createdAt: string;
    isDeleted: boolean;
    isAvailable: boolean;
    status: {
        id: number;
        description: string;
    };
}

const Others: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState<string | null>(null);
    const [surname, setSurname] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // Vérifier si authToken est présent dans le localStorage
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            navigate('/intervenant-login');
        } else {
            const storedName = localStorage.getItem('name');
            const storedSurname = localStorage.getItem('surname');
            setName(storedName);
            setSurname(storedSurname);
        }
    }, [navigate]);

    useEffect(() => {
        // Appel à l'API pour récupérer les utilisateurs
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error('Erreur lors du chargement des utilisateurs:', error);
            }
        };

        fetchUsers();
    }, []);

    const updateUserStatus = async (userId: number, isDeleted: boolean) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ isDeleted,actual_password:"Motdepasse237#" })
            });
            // Mettre à jour l'état local après modification
            setUsers(users.map(user => user.id === userId ? { ...user, isDeleted } : user));
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut de l\'utilisateur:', error);
        }
    };

    const handleDelete = (userId: number) => {
        updateUserStatus(userId, true);
    };

    // const handleActivate = (userId: number) => {
    //     updateUserStatus(userId, false);
    // };

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
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Missions Réalisées</span><br /><hr /><br />
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-3 sm:gap-6">
                                <div className="flex flex-col">
                                    <div className="-m-1.5 overflow-x-auto">
                                        <div className="p-1.5 min-w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Surname</th>
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Email</th>
                                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Created At</th>
                                                            <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                                        {users.map(user => (
                                                            <tr key={user.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{user.name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.surname}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.email}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                    {user.isDeleted ? (
                                                                        <button  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-400 disabled:opacity-50 disabled:pointer-events-none">Deleted</button>
                                                                    ) : (
                                                                        <button onClick={() => handleDelete(user.id)} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Delete</button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default Others;