import { Inter } from 'next/font/google';
import { League_Spartan, Alegreya } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import { Router } from 'next/navigation';

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
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <html lang="en">
      <body className={`${leagueSpartan.className}`} >
      <NavBar />
        {children}
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
