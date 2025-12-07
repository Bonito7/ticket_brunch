"use client";
import { useState, useEffect } from 'react';
import styles from './RegistrationForm.module.css';

export default function RegistrationForm({ selectedPass, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    passType: 'Pass Adhérent'
  });

  useEffect(() => {
    if (selectedPass) {
      setFormData(prev => ({ ...prev, passType: selectedPass.type }));
    }
  }, [selectedPass]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className={styles.section} id="register">
      <h2 className={styles.heading}>Réservation</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <label className={styles.label}>Nom complet</label>
          <input 
            className={styles.input} 
            name="name" 
            placeholder="Ex: Jean Kouassi" 
            required 
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Email</label>
          <input 
            className={styles.input} 
            name="email" 
            type="email" 
            placeholder="jean@example.com" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Téléphone</label>
          <input 
            className={styles.input} 
            name="phone" 
            type="tel" 
            placeholder="+225 07..." 
            required 
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Type de Pass</label>
          <select 
            className={styles.select} 
            name="passType" 
            value={formData.passType}
            onChange={handleChange}
          >
            <option value="Pass Adhérent">Pass Adhérent (10.000 FCFA)</option>
            <option value="Pass Non-adhérent">Pass Non-adhérent (15.000 FCFA)</option>
            <option value="Pass Enfant">Pass Enfant (5.000 FCFA)</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          Valider et Payer
        </button>
      </form>
    </section>
  );
}
