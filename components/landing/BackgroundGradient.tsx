'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BackgroundGradient = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"
        animate={{
          x: mousePosition.x * 0.05,
          y: mousePosition.y * 0.05,
        }}
        transition={{ type: 'spring', damping: 15 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"
        animate={{
          x: -mousePosition.x * 0.03,
          y: -mousePosition.y * 0.03,
        }}
        transition={{ type: 'spring', damping: 20 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 rounded-full opacity-10 blur-3xl"
        animate={{
          x: mousePosition.x * 0.02,
          y: -mousePosition.y * 0.02,
        }}
        transition={{ type: 'spring', damping: 25 }}
      />
    </div>
  );
};