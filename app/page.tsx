import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { BackgroundGradient } from '@/components/landing/BackgroundGradient';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <BackgroundGradient />
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}