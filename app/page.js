"use client";
import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import EventInfo from '../components/EventInfo';
import Pricing from '../components/Pricing';
import RegistrationForm from '../components/RegistrationForm';
import Ticket from '../components/Ticket'; // We will create this next

export default function Home() {
  const [selectedPass, setSelectedPass] = useState(null);
  const [ticketData, setTicketData] = useState(null);

  const handlePassSelect = (pass) => {
    setSelectedPass(pass);
    const formSection = document.getElementById('register');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegistrationSubmit = async (data) => {
    // Generate IDs locally for now, could be server-side later
    const ticketId = 'TKT-' + Math.floor(Math.random() * 100000);
    const fullData = {
      ...data,
      id: ticketId,
      date: '13 Décembre 2024',
      time: '10h00',
      location: 'Jardin Botanique de Bingerville'
    };

    // Save to API
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData)
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('API Error:', result);
        alert(`Erreur lors de l'enregistrement: ${result.error || 'Erreur inconnue'}`);
        return; // Don't show ticket if save failed
      }

      if (!result.success) {
        console.error('Save failed:', result);
        alert(`Erreur: ${result.error || 'Échec de l\'enregistrement'}`);
        return;
      }

      alert('Inscription validée et enregistrée !');
      setTicketData(fullData);
    } catch (err) {
      console.error('Network error:', err);
      alert("Erreur de connexion au serveur. Veuillez réessayer.");
    }
  };

  if (ticketData) {
    return (
      <main>
        <Ticket data={ticketData} onBack={() => setTicketData(null)} />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <Hero />
      <EventInfo />
      <Pricing onSelect={handlePassSelect} />
      <RegistrationForm selectedPass={selectedPass} onSubmit={handleRegistrationSubmit} />
      
      <footer style={{padding: '3rem 2rem', textAlign: 'center', backgroundColor: '#000000', color: 'white'}}>
        <img src="/repcom_logo.png" alt="REPCOM" style={{height: '80px', marginBottom: '1rem'}} /> 
        <p>© 2025 REPCOM - Tous droits réservés</p>
        <p style={{fontSize: '0.9rem', color: '#ccc', marginTop: '0.5rem'}}>Réseau des Professionnels de la Communication</p>
      </footer>
    </main>
  );
}
