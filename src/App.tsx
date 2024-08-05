// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './layout';
import Card from './components/card';
import ThreeScene from './components/Threescene';
import './global.css';
import './App.css';
import IntervenantLogIn from './pages/intervenant/intervenantlogin';
import AdministrateurLogIn from './pages/administateur/adminlogin';
import IntervenantSignIn from './pages/intervenant/intervenantsignin';
import AdministrateurSignIn from './pages/administateur/adminsignin';

const AppContent: React.FC = () => {
  const location = useLocation();

  return location.pathname === '/' ? (
    <Layout title="Welcome to React with Vite">
      <main>
        <h1>Welcome to <span className="text-gradient-orange"><a href="https://www.ensembleautrement.fr/logement">Companionn</a></span></h1>
        <ThreeScene />
        <ul role="list" className="link-card-grid">
          <Card
            href="/intervenant-login"
            title="Intervenant-LogIn"
            body="Entrez vos informations et accéder à votre compte Intervenant"
          />
          <Card
            href="/administrateur-login"
            title="Administrateur-LogIn"
            body="Entrez vos informations et accéder à votre compte Administrateur"
          />
          <Card
            href="/intervenant-signin"
            title="Intervenant-SignIn"
            body="Entrez vos informations et créer votre compte Intervenant"
          />
          <Card
            href="/administrateur-signin"
            title="Administrateur-SignIn"
            body="Entrez vos informations et créer votre compte Administrateur"
          />
        </ul>
      </main>
    </Layout>
  ) : (
    <Routes>
      <Route path="/intervenant-login" element={<IntervenantLogIn />} />
      <Route path="/administrateur-login" element={<AdministrateurLogIn />} />
      <Route path="/intervenant-signin" element={<IntervenantSignIn />} />
      <Route path="/administrateur-signin" element={<AdministrateurSignIn />} />
      {/* Ajouter d'autres routes si nécessaire */}
      <Route path="*" element={<div>Page not found</div>} /> {/* Optionnel: Page 404 */}
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
