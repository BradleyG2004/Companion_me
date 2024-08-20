import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfileImagee from '../../assets/7309707.jpg';

const AdminProfile: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [nom, setNom] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    const [surname, setSurname] = useState<string | null>(null);
    const [prenom, setPrenom] = useState<string | null>(null);

    const [password, setPassword] = useState('');
    const [apassword, setApassword] = useState('');

    const handleClick = () => setShow(!show);
    const [show, setShow] = useState(false);

    const handleClickk = () => setShoww(!showw);
    const [showw, setShoww] = useState(false);

    const [isDeleted, DeleteAccountt] = useState(false);

    const DeleteAccount = async () => {
        const result = prompt("Entrez votre mot de passe actuel :");
        if (!result) {
            alert("Please enter your current password to confirm changes.");
            return;
        }
        const updatedData: {
            isDeleted?: boolean,
            actual_password?: string;
        } = {};

        const userId = localStorage.getItem('id');

        DeleteAccountt(!isDeleted);

        updatedData.isDeleted = !isDeleted;
        updatedData.actual_password = result;

        console.log(updatedData)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            const data = await response.json();
            if (response.status === 200) {
                localStorage.removeItem('name');
                localStorage.removeItem('surname');
                localStorage.removeItem('authToken');
                localStorage.removeItem('id');
                window.location.reload();
            } else {
                alert(`${JSON.stringify(data, null, 2)}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error sending data: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    const [email, setEmail] = useState<string | null>(null);
    const [emaill, setEmaill] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredd, setIsHoveredd] = useState(false);

    // const [responseMessage, setResponseMessage] = useState('');

    // const [showSuccessToast, setShowSuccessToast] = useState(false);
    // const [showErrorToast, setShowErrorToast] = useState(false);


    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const userId = localStorage.getItem('id');

        if (!authToken) {
            navigate('/intervenant-login');
            return;
        }

        // Récupérer les informations de l'utilisateur
        axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }).then((response: AxiosResponse) => {
            const { name, surname, profile, email } = response.data;
            setNom(name);
            setEmaill(email);
            setPrenom(surname);
            if (profile && profile.length > 0) {
                setProfileImage(profile); // Pas besoin de réencoder, l'image est déjà encodée en base64
            }
        }).catch((error: AxiosError) => {
            console.error('Error fetching user data:', error);
        });
    }, [navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 16 * 1024 * 1024) {
                alert("File size should not exceed 16MB");
                return;
            }
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                alert("Only JPG and PNG formats are accepted");
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleUpload = () => {
        const authToken = localStorage.getItem('authToken');

        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post(`${import.meta.env.VITE_API_URL}/upload-profile`, formData, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(response => {
            console.log(response)
            alert("Profile updated successfully!");
            // Recharger la page ou mettre à jour l'image de profil affichée
            window.location.reload();
        }).catch(error => {
            console.error('Error uploading file:', error);
            alert("Failed to upload profile picture.");
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const userId = localStorage.getItem('id');

        const updatedData: {
            name?: string;
            surname?: string;
            email?: string;
            password?: string;
            actual_password?: string;
        } = {};

        if (name) updatedData.name = name;
        if (surname) updatedData.surname = surname;
        if (email) updatedData.email = email;
        if (password) updatedData.password = password;

        // Check if any field is filled and apassword is provided
        if (Object.keys(updatedData).length > 0) {
            if (!apassword) {
                alert("Please enter your current password to confirm changes.");
                return;
            }
            updatedData.actual_password = apassword;
        } else {
            alert("No changes detected. Please fill at least one field to update.");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            const data = await response.json();
            if (response.status === 200) {
                alert(`User successfully updated`);
                // Update local storage if necessary
                if (data.token) localStorage.setItem('authToken', data.token);
                if (data.other) {
                    if (data.other.surname) localStorage.setItem('surname', data.other.surname);
                    if (data.other.name) localStorage.setItem('name', data.other.name);
                }
                // Refresh the page or update state as needed
                window.location.reload();
            } else {
                alert(`${JSON.stringify(data, null, 2)}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error sending data: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    const Disconnect = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('surname');
        localStorage.removeItem('authToken');
        localStorage.removeItem('id');
        window.location.reload();
    }

    // Check if any field is filled
    const isAnyFieldFilled = name || surname || email || password;


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
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Informations de Profil</span><br></br><hr></hr><br></br>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-6">
                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Nom
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    {nom}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Prenom
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    {prenom}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Email
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    {emaill}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3>Nouveau nom</h3>
                                                <Input
                                                    placeholder='Entrez votre nom'
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Nouveau prenom
                                                </h3>
                                                <Input
                                                    placeholder='Entrez votre prenom'
                                                    onChange={(e) => setSurname(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Nouvel Email
                                                </h3>
                                                <Input
                                                    type="email"
                                                    placeholder="Email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Nouveau password
                                                </h3>
                                                <InputGroup>
                                                    <Input
                                                        pr="4.5rem"
                                                        type={show ? 'text' : 'password'}
                                                        placeholder="Entrez votre mot de passe"
                                                        required
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <InputRightElement width="4.5rem">
                                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                                            {show ? 'Hide' : 'Show'}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                {isAnyFieldFilled && (
                                    <a className="group flex flex-col bg-white border shadow-sm rounded-xl transition">
                                        <div className="p-4 md:p-5">
                                            <div className="flex justify-between items-center gap-x-3">
                                                <div className="grow">
                                                    <h3>Mot de passe actuel</h3>
                                                    <InputGroup>
                                                        <Input
                                                            pr="4.5rem"
                                                            type={showw ? 'text' : 'password'}
                                                            placeholder="Entrez votre mot de passe actuel"
                                                            required
                                                            onChange={(e) => setApassword(e.target.value)}
                                                        />
                                                        <InputRightElement width="4.5rem">
                                                            <Button h="1.75rem" size="sm" onClick={handleClickk}>
                                                                {showw ? 'Hide' : 'Show'}
                                                            </Button>
                                                        </InputRightElement>
                                                    </InputGroup>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                )}
                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl transition">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 style={{ marginLeft: "100px" }}>Submission</h3>
                                                <Button
                                                    onClick={handleSubmit}
                                                    onMouseEnter={() => setIsHoveredd(true)}
                                                    onMouseLeave={() => setIsHoveredd(false)}
                                                    style={{
                                                        width: "100%",
                                                        borderWidth: "1px",
                                                        borderColor: "orange",
                                                        color: isHoveredd ? "white" : "orange",
                                                        backgroundColor: isHoveredd ? "orange" : "transparent",
                                                    }}
                                                    isDisabled={!isAnyFieldFilled || !apassword}
                                                >
                                                    Enregistrer
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <br></br><br></br>
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" style={{ borderWidth: "1px", borderColor: "orange", borderRadius: "20px", marginTop: "50px" }}>
                            <span style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}>Options</span><br></br><hr></hr><br></br>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#" onClick={Disconnect}>
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Deconnexion
                                                </h3>
                                            </div>
                                            <div>
                                                <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/128/6749/6749139.png"></img>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800" href="#" onClick={DeleteAccount}>
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Supprimer mon compte
                                                </h3>
                                            </div>
                                            <div>
                                                <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/128/3159/3159218.png"></img>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <Link to="/FAQ" className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    FAQ
                                                </h3>
                                            </div>
                                            <div>
                                                <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/128/651/651050.png"></img>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/PROBLEM" className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center gap-x-3">
                                            <div className="grow">
                                                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                                                    Signaler un probleme
                                                </h3>
                                            </div>
                                            <div>
                                                <img style={{ height: "60px" }} src="https://cdn-icons-png.flaticon.com/128/11494/11494300.png"></img>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 ml-4">
                        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" style={{ borderWidth: "1px", borderColor: "orange", borderRadius: "20px", marginTop: "50px", height: "calc(100% - 50px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ width: "90%", borderWidth: "1px", display: "flex", flexDirection: "column" }}>
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                                ) : (
                                    <img src={ProfileImagee}
                                        alt="Profilee" ></img>
                                )}
                            </div><br></br>
                            <span>Upload a new photo Here 📷</span>
                            <input type='file' accept="image/jpeg, image/png" onChange={handleFileChange} style={{ borderRadius: "5px", borderColor: "orange", borderWidth: "1px", padding: "2px" }} />
                            <Button onClick={handleUpload}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={{
                                    width: "357px",
                                    borderWidth: "1px",
                                    borderColor: "orange",
                                    color: isHovered ? "white" : "orange",
                                    backgroundColor: isHovered ? "orange" : "transparent",
                                }}>Enregistrer</Button>
                            {/* <h3 style={{ fontWeight: "bold", color: "orange" }}>{surname} {name}</h3> */}
                            <p className="text-center">
                                <span style={{ color: "orange", fontWeight: "bold" }}><u><span style={{ color: "black", fontWeight: "bold" }}>{surname} {name}</span></u></span>
                                Ici vous pouvez consulter et modifier vos informations de profile.
                            </p>
                        </div>
                    </div>
                </div>
            </main></>
    );
}

export default AdminProfile;