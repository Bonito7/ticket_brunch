"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Ticket from '../../components/Ticket';
import * as XLSX from 'xlsx';

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


  const exportExcel = () => {
    // Prepare data for Excel
    const data = participants.map(p => ({
      'ID': p.id,
      'Nom': p.name,
      'Email': p.email,
      'Téléphone': p.phone,
      'Pass': p.passType,
      'Date Inscription': new Date(p.registeredAt).toLocaleString('fr-FR')
    }));

    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Set column widths for better readability
    const columnWidths = [
      { wch: 15 }, // ID
      { wch: 25 }, // Nom
      { wch: 30 }, // Email
      { wch: 20 }, // Téléphone
      { wch: 20 }, // Pass
      { wch: 25 }  // Date Inscription
    ];
    worksheet['!cols'] = columnWidths;

    // Create workbook and add worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');

    // Generate Excel file and download
    const fileName = `participants_brunch_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
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
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <Link href="/">
            <img src="/logo_colored.png" alt="Brunch" style={{height: '80px', cursor: 'pointer', transition: 'transform 0.2s'}} />
          </Link>
          <h1 style={{color: '#0f2b46', margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2rem)'}}>Administration</h1>
        </div>
        <button 
          onClick={exportExcel}
          style={{
            background: '#0f2b46', color: 'white', padding: '0.5rem 1rem', 
            borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', border: 'none'
          }}
        >
          Exporter Excel
        </button>
      </div>

      {/* Horizontal scroll wrapper for mobile */}
      <div style={{
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        width: '100%'
      }}>
        <table style={{width: '100%', minWidth: '800px', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
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
    </div>
  );
}
