// src/pages/AdministrateurLogIn.tsx
import { Button, Input, InputGroup, InputLeftAddon, InputRightElement, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import companionnLogo from '../../../public/companionnChatBot.png';


const AdministrateurLogIn: React.FC = () => {
  
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [isHovered, setIsHovered] = useState(false);

  // États pour le formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // État pour le message de réponse
  const [responseMessage, setResponseMessage] = useState('');

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
      let timer: NodeJS.Timeout;
      if (showSuccessToast) {
          timer = setTimeout(() => {
              setShowSuccessToast(false);
              setShowErrorToast(false);
              navigate('/admin-home'); // Redirige après 5 secondes en cas de succès
          }, 5000);  // 5000 ms = 5 secondes
      }
      if (showErrorToast) {
          timer = setTimeout(() => {
              setShowSuccessToast(false);
              setShowErrorToast(false);
          }, 5000);  // 5000 ms = 5 secondes
      }
      return () => clearTimeout(timer);
  }, [showSuccessToast, showErrorToast, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {  // Utilisation de la variable d'environnement
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (response.status === 200) {
              setResponseMessage('Connexion réussie !');
              setShowSuccessToast(true);
              setShowErrorToast(false);
              
              // Stockage du token dans le localStorage
              localStorage.setItem('authToken', data.token);
              localStorage.setItem('surname', data.admin.surname);
              localStorage.setItem('name', data.admin.name);
              localStorage.setItem('id', data.admin.id);

          } else {
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
                                      Connexion réussie ! <Spinner color='teal.500' />
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
                  <h2 style={{ marginTop: "10px", color: "orange", fontWeight: "bold", fontSize: "50px", marginLeft: "130px" }}>Connexion</h2><hr />
                  <h6 style={{ fontFamily: "Chakra Petch", marginLeft: "286px", fontWeight: "bold" }}>.<span style={{ color: "orange" }}>.</span>.<span style={{ color: "orange" }}>A</span>d<span style={{ color: "orange" }}>m</span>i<span style={{ color: "orange" }}>n</span></h6>
                  <br /><br />
                  <label className="form-label mt-4" htmlFor="Email" style={{ color: "orange", fontWeight: "bold" }}>Email</label>
                  <InputGroup>
                      <InputLeftAddon>@</InputLeftAddon>
                      <Input
                          type="email"
                          placeholder="Email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </InputGroup><br /><br />
                  <label className="form-label mt-4" htmlFor="Password" style={{ color: "orange", fontWeight: "bold" }}>Password</label>
                  <InputGroup>
                      <Input
                          pr="4.5rem"
                          type={show ? 'text' : 'password'}
                          placeholder="Enter password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                              {show ? 'Hide' : 'Show'}
                          </Button>
                      </InputRightElement>
                  </InputGroup>
                  <br /><br />
                  <div className="button" style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                          type="submit"
                          style={{
                              width: "320px",
                              height: "45px",
                              borderRadius: "10px",
                              fontSize: "20px",
                              color: isHovered ? "white" : "orange",
                              borderColor:"orange",
                              backgroundColor: isHovered ? "orange" : "transparent",
                          }}
                      >
                          Se connecter
                      </Button>
                  </div>
                  <br />
                  <p style={{ fontSize: "13px", textAlign: "center" }}>
                      Vous n'avez pas de compte ? <a href="/administrateur-signin" style={{textDecoration:"none",color:"orange"}}>S'inscrire</a>
                  </p>
              </form>
          </div>
      </div>
  );

};

export default AdministrateurLogIn;
