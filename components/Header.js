import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Brunch'Com Logo" style={{height: '100%', objectFit: 'contain'}} />
      </div>
      
      <div className={styles.actions}>
        <Link href="/admin" className={styles.adminButton}>
          Administrer
        </Link>
        <Link href="#register" className={styles.ctaButton}>
          Réserver
        </Link>
      </div>
    </header>
  );
}
