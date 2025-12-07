import styles from './EventInfo.module.css';

export default function EventInfo() {
  const activities = [
    { icon: '🤝', title: 'Réseautage', text: 'Connectez-vous avec les professionnels de la communication.' },
    { icon: '🍖', title: 'Barbecue Géant', text: 'Un buffet varié et savoureux à volonté.' },
    { icon: '🎲', title: 'Jeux & Détente', text: 'Des activités ludiques pour briser la glace.' },
    { icon: '🎧', title: 'Animation DJ', text: 'Ambiance festive garantie toute la journée.' },
  ];

  return (
    <section className={styles.section} id="info">
      <h2 className={styles.heading}>Au Programme</h2>
      <div className={styles.grid}>
        {activities.map((act, index) => (
          <div key={index} className={styles.card}>
            <span className={styles.icon}>{act.icon}</span>
            <h3 className={styles.cardTitle}>{act.title}</h3>
            <p className={styles.text}>{act.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
