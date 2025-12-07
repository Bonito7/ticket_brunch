"use client";
import { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import styles from './Ticket.module.css';

export default function Ticket({ data, onBack }) {
  const [qrSrc, setQrSrc] = useState('');
  const ticketRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Generate QR Code with JSON data
    const qrData = JSON.stringify({
      id: data.id,
      name: data.name,
      type: data.passType
    });

    QRCode.toDataURL(qrData).then(url => {
      setQrSrc(url);
    });
  }, [data]);

  const downloadPDF = async () => {
    if (!ticketRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2, // Improve quality
        backgroundColor: null // Transparent background handling
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape, A4
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate scaling to center and fit
      const imgWidth = pdfWidth * 0.8;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(`Ticket_BrunchCom_${data.name.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error("PDF Error:", err);
      alert("Erreur lors de la génération du PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Scroll wrapper for mobile */}
      <div style={{
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        width: '100%',
        padding: '1rem 0'
      }}>
        <div className={styles.ticket} ref={ticketRef} style={{minWidth: '600px'}}>
          <div className={styles.left}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
              <div>
                 <h1 className={styles.eventTitle}>Brunch'Com</h1>
                 <p className={styles.tagline}>LE BRUNCH DU COMMUNICANT</p>
              </div>
              <img src="/logo_colored.png" alt="Brunch Logo" style={{height: '108px'}} />
            </div>
            
            <div className={styles.details}>
              <div style={{gridColumn: '1 / span 2'}}>
                 <p className={styles.label}>NOM</p>
                 <p className={styles.value}>{data.name}</p>
              </div>
              <div>
                <p className={styles.label}>DATE</p>
                <p className={styles.value}>{data.date}</p>
              </div>
              <div>
                <p className={styles.label}>TYPE DE PASS</p>
                <p className={styles.value} style={{color: '#f47b20'}}>{data.passType}</p>
              </div>
              <div style={{gridColumn: '1 / span 2'}}>
                 <p className={styles.label}>LIEU</p>
                 <p className={styles.value} style={{maxWidth: '80%'}}>{data.location}</p>
              </div>
            </div>
            
            <div className={styles.repcomSection}>
              <p className={styles.repcomLabel}>ORGANISE PAR</p>
              <div className={styles.repcomBox}>
                 <img src="/repcom_full.png" alt="REPCOM" style={{height: '50px'}} />
                 <p className={styles.repcomText}>Réseau des Professionnels de la Communication</p>
              </div>
            </div>
          </div>
          
          <div className={styles.right}>
            <div className={styles.qrContainer}>
               {qrSrc && <img src={qrSrc} alt="QR Code" style={{ width: '140px', height: '140px' }} />}
            </div>
            <p className={styles.ticketId}>#{data.id}</p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.downloadBtn} onClick={downloadPDF} disabled={isGenerating}>
          {isGenerating ? 'Génération...' : 'Télécharger le PDF'}
        </button>
        <button className={styles.backBtn} onClick={onBack}>
          Retour
        </button>
      </div>
    </div>
  );
}
