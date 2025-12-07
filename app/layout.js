import './globals.css';

export const metadata = {
  title: "Brunch'Com - Le Brunch du Communicant",
  description: 'Réservez votre place pour le Brunch du Communicant.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
