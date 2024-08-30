import { Inter } from 'next/font/google';
import { League_Spartan, Alegreya } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const leagueSpartan = League_Spartan({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const alegreya = Alegreya({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Scriptly.',
  description: 'Effortless YouTube Automation made easy using Scriptly.',
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body className={`${leagueSpartan.className}`}>
            <NavBar />
        {children}
      <Footer />
      </body>

    </html>
  );
}
