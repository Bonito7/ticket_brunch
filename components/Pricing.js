"use client";
import styles from './Pricing.module.css';

export default function Pricing({ onSelect }) {
  const passes = [
    { type: 'Pass Adhérent', price: '10.000', currency: 'FCFA', features: ['Accès complet', 'Buffet à volonté', 'Activités incluses'], popular: true },
    { type: 'Pass Non-Adhérent', price: '15.000', currency: 'FCFA', features: ['Accès complet', 'Buffet à volonté', 'Activités incluses'], popular: false },
    { type: 'Pass Enfant', price: '5.000', currency: 'FCFA', features: ['Accès (dès 6 ans)', 'Menu enfant', 'Jeux adaptés'], popular: false },
  ];

  return (
    <section className={styles.section} id="pricing">
      <h2 className={styles.heading}>Tarifs</h2>
      <div className={styles.grid}>
        {passes.map((pass, index) => (
          <div key={index} className={`${styles.card} ${pass.popular ? styles.popular : ''}`}>
            {pass.popular && <span className={styles.tag}>Recommandé</span>}
            <h3 className={styles.type}>{pass.type}</h3>
            <div className={styles.price}>{pass.price} <small style={{fontSize: '1rem', color: '#666'}}>{pass.currency}</small></div>
            <ul className={styles.features}>
              {pass.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button 
              className={styles.selectButton}
              onClick={() => onSelect(pass)}
            >
              Choisir ce pass
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
