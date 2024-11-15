import './styles/globals.css';

export const metadata = {
  title: 'Car Dealer App',
  description: 'A project for DevelopsToday - by Gabriel Palhares',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
