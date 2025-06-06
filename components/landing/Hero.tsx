'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import TypewriterComponent from 'typewriter-effect';
import Link from 'next/link';

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        className="container max-w-5xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="inline-block mb-6 px-3 py-1 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30"
          variants={itemVariants}
        >
          <span className="text-sm font-medium">AI-Powered Persona Creation</span>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
          variants={itemVariants}
        >
          Craft Your Digital Twin with AI
        </motion.h1>
        
        <motion.div 
          className="mb-8 h-12 text-xl md:text-2xl text-muted-foreground"
          variants={itemVariants}
        >
          <TypewriterComponent
            options={{
              strings: [
                "Build your ideal digital persona.",
                "Create fictional characters instantly.",
                "Generate realistic profiles with AI.",
                "Define your digital twin's personality."
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/builder">
            <Button variant="gradient" size="xl" className="rounded-full group">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};