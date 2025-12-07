"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Ticket from '../../components/Ticket';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    // Simple client-side auth for prototype
    const pass = prompt("Mot de passe Admin :");
    if (pass === "admin123") {
      setIsAuthenticated(true);
      fetchParticipants();
    } else {
      alert("Accès refusé");
      window.location.href = "/";
    }
  }, []);

  const fetchParticipants = async () => {
    try {
      const res = await fetch('/api/register');
      
      // Check if response is OK
      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error Response:", errorText);
        alert(`Erreur API (${res.status}): ${errorText.substring(0, 200)}`);
        setParticipants([]);
        return;
      }
      
      // Try to parse JSON
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setParticipants(data);
      } else {
        console.error("API Error:", data);
        alert("Erreur de chargement : " + (data.error || JSON.stringify(data)));
        setParticipants([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Impossible de contacter le serveur: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer ce participant ?")) return;
    
    await fetch('/api/admin', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchParticipants();
  };

  const exportCSV = () => {
    const headers = ["ID", "Nom", "Email", "Téléphone", "Pass", "Date Inscription"];
    const rows = participants.map(p => [
      p.id, p.name, p.email, p.phone, p.passType, p.registeredAt
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "participants_brunch.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (!isAuthenticated) return null;

  if (selectedTicket) {
    return (
      <div style={{position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'white', zIndex: 1000}}>
        <Ticket data={selectedTicket} onBack={() => setSelectedTicket(null)} />
      </div>
    );
  }

  return (
    <div style={{padding: '2rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <Link href="/">
            <img src="/logo_colored.png" alt="Brunch" style={{height: '100px', cursor: 'pointer', transition: 'transform 0.2s'}} />
          </Link>
          <h1 style={{color: '#0f2b46', margin: 0}}>Administration</h1>
        </div>
        <button 
          onClick={exportCSV}
          style={{
            background: '#0f2b46', color: 'white', padding: '0.5rem 1rem', 
            borderRadius: '4px', fontWeight: 'bold'
          }}
        >
          Exporter CSV
        </button>
      </div>

      <table style={{width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
        <thead>
          <tr style={{background: '#f4f4f4', textAlign: 'left'}}>
            <th style={{padding: '1rem', borderBottom: '2px solid #ddd'}}>ID</th>
            <th style={{padding: '1rem', borderBottom: '2px solid #ddd'}}>Nom</th>
            <th style={{padding: '1rem', borderBottom: '2px solid #ddd'}}>Téléphone</th>
            <th style={{padding: '1rem', borderBottom: '2px solid #ddd'}}>Pass</th>
            <th style={{padding: '1rem', borderBottom: '2px solid #ddd'}}>Email</th>
            <th style={{padding: '1rem', borderBottom: '2px solid #ddd'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(p => (
            <tr key={p.id} style={{borderBottom: '1px solid #eee'}}>
              <td style={{padding: '1rem'}}>{p.id}</td>
              <td style={{padding: '1rem'}}>{p.name}</td>
              <td style={{padding: '1rem'}}>{p.phone}</td>
              <td style={{padding: '1rem'}}>{p.passType}</td>
              <td style={{padding: '1rem'}}>{p.email}</td>
              <td style={{padding: '1rem', display: 'flex', gap: '0.5rem'}}>
                <button 
                  onClick={() => setSelectedTicket(p)}
                  style={{padding: '0.25rem 0.5rem', background: '#f47b20', color: 'white', borderRadius: '4px'}}
                >
                  Ticket
                </button>
                <button 
                  onClick={() => handleDelete(p.id)}
                  style={{padding: '0.25rem 0.5rem', background: '#d9534f', color: 'white', borderRadius: '4px'}}
                >
                  Suppr.
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
