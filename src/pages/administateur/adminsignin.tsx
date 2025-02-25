// src/pages/AdministrateurSignIn.tsx
import { Input, InputGroup, InputLeftAddon, InputRightElement, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import companionnLogo from '../../../public/companionnChatBot.png';

const AdministrateurSignIn: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [isHovered, setIsHovered] = useState(false);

  // États pour le formulaire
  const [surname, setPrenom] = useState('');
  const [name, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');

  // État pour le message de réponse
  const [responseMessage, setResponseMessage] = useState('');

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const navigate = useNavigate();  // Initialisez useNavigate pour la redirection

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessToast) {
      timer = setTimeout(() => {
        setShowSuccessToast(false);
        setShowErrorToast(false);
        navigate('/administrateur-login'); // Redirige après 5 secondes en cas de succès
      }, 5000);  // 5000 ms = 5 secondes
    }
    if (showErrorToast) {
      timer = setTimeout(() => {
        setShowSuccessToast(false);
        setShowErrorToast(false);
      }, 5000);  // 5000 ms = 5 secondes
    }
    return () => clearTimeout(timer);  // Nettoyage du timer
  }, [showSuccessToast, showErrorToast, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ surname, name, email, password, key }),  // Inclure la clé dans les données
      });

      if (response.status === 201) {
        // Message de succès
        setResponseMessage('Inscription réussie !');
        setShowSuccessToast(true);
        setShowErrorToast(false);
      } else {
        // Message d'erreur basé sur la réponse
        const data = await response.json();
        setResponseMessage(`Erreur : ${data.message || 'Une erreur est survenue'}`);
        setShowSuccessToast(false);
        setShowErrorToast(true);
      }

    } catch (error) {
      console.error('Erreur:', error);
      setResponseMessage('Erreur lors de l\'envoi des données');
      setShowSuccessToast(false);
      setShowErrorToast(true);
    }
  };

  return (
    <div className="container signin row" style={{ paddingLeft: 300, fontFamily: "Space Grotesk" }}>
      <div className="signin-left col">
        <div className="title-signin">
          {showSuccessToast && (
            <div className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert" tabIndex={-1} aria-labelledby="hs-toast-success-example-label">
              <div className="flex p-4">
                <div className="shrink-0">
                  <svg className="shrink-0 size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                  </svg>
                </div>
                <div className="ms-3">
                  <p id="hs-toast-success-example-label" className="text-sm text-gray-700 dark:text-neutral-400">
                    Inscription réussie !
                  </p>
                </div>
              </div>
            </div>
          )}
          {showErrorToast && (
            <div className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert" tabIndex={-1} aria-labelledby="hs-toast-error-example-label">
              <div className="flex p-4">
                <div className="shrink-0">
                  <svg className="shrink-0 size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                  </svg>
                </div>
                <div className="ms-3">
                  <p id="hs-toast-error-example-label" className="text-sm text-gray-700 dark:text-neutral-400">
                    Erreur : {responseMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
        <div className="title-logo">
          <a href="/"><img src={companionnLogo} alt="Companionn ChatBot" /></a>
        </div>
      </div>
      <div className="signin-right col">
        <form onSubmit={handleSubmit} style={{ width: "100%", paddingRight: "40px", fontWeight: "bold" }}>
          <h2 style={{ marginTop: "10px", color: "orange", fontWeight: "bold", fontSize: "50px", marginLeft: "80px" }}>Enregistrement</h2><hr />
          <h6 style={{ fontFamily: "Chakra Petch", marginLeft: "286px", fontWeight: "bold" }}>.<span style={{ color: "orange" }}>.</span>.<span style={{ color: "orange" }}>A</span>d<span style={{ color: "orange" }}>m</span>i<span style={{ color: "orange" }}>n</span></h6>
          <label className="form-label mt-4" htmlFor="First name" style={{ color: "orange", fontWeight: "bold" }}>Prenom</label>
          <Input
            placeholder='Entrez votre prenom'
            required
            onChange={(e) => setPrenom(e.target.value)}
          />
          <label className="form-label mt-4" htmlFor="Last name" style={{ color: "orange", fontWeight: "bold" }}>Nom</label>
          <Input
            placeholder='Entrez votre nom'
            required
            onChange={(e) => setNom(e.target.value)}
          />
          <label className="form-label mt-4" htmlFor="Email" style={{ color: "orange", fontWeight: "bold" }}>Email</label>
          <InputGroup>
            <InputLeftAddon>@</InputLeftAddon>
            <Input
              type="email"
              placeholder="Entrez votre Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <label className="form-label mt-4" htmlFor="Password" style={{ color: "orange", fontWeight: "bold" }}>Password</label>
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
          <label className="form-label mt-4" htmlFor="Key" style={{ color: "orange", fontWeight: "bold" }}>Key</label>
          <InputGroup>
            <InputLeftAddon>@</InputLeftAddon>
            <Input
              placeholder="Entrez votre clé"
              required
              onChange={(e) => setKey(e.target.value)}
            />
          </InputGroup>
          <button
            type="submit"
            style={{
              borderColor: "orange",
              marginTop: "5px",
              width: "100px",
              height: "40px",
              color: isHovered ? "white" : "orange",  // Change la couleur du texte en blanc sur hover
              backgroundColor: isHovered ? "orange" : "transparent",  // Change la couleur de fond sur hover
              fontWeight: "bold",
              marginLeft: "400px",
              transition: "background-color 0.3s, color 0.3s", // Animation de la transition
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Submit
          </button>
          {/* <div style={{ marginTop: '20px', color: 'orange', fontWeight: 'bold' }}>
            {responseMessage}
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default AdministrateurSignIn;
