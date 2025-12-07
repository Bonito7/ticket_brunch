import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Brunch'Com</h1>
      <p className={styles.subtitle}>Le Brunch du Communicant</p>
      
      <div className={styles.info}>
        <div className={styles.infoItem}>
          📅 Samedi 13 Décembre, 10h00
        </div>
        <div className={styles.infoItem}>
          📍 Jardin Botanique de Bingerville
        </div>
      </div>

      <Link href="#register" className={styles.ctaLarge}>
        Prendre mon pass
      </Link>
    </section>
  );
}
