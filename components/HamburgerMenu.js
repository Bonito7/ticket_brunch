"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './HamburgerMenu.module.css';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToRegister = (e) => {
    e.preventDefault();
    closeMenu();
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hamburger Icon - Hide when menu is open */}
      {!isOpen && (
        <button 
          className={styles.hamburger} 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeMenu}
        ></div>
      )}

      {/* Menu */}
      <nav className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <button 
          className={styles.closeButton} 
          onClick={closeMenu}
        >
          ×
        </button>
        
        <ul className={styles.menuList}>
          <li>
            <a 
              href="#register" 
              className={styles.menuLink}
              onClick={scrollToRegister}
            >
              📝 Réserver
            </a>
          </li>
          <li>
            <Link 
              href="/admin" 
              className={styles.menuLink}
              onClick={closeMenu}
            >
              🔐 Administrer
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
