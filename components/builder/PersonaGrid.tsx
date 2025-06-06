'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Persona } from '@/types';
import { PersonaCard } from './PersonaCard';

interface PersonaGridProps {
  personas: Persona[];
  onDelete: (id: string) => void;
}

export function PersonaGrid({ personas, onDelete }: PersonaGridProps) {
  return (
    <div className="mt-8">
      {personas.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {personas.map((persona, index) => (
              <motion.div
                key={persona.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.05,
                }}
              >
                <PersonaCard
                  persona={persona}
                  isNew={index === 0}
                  onDelete={onDelete}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">
            No personas saved yet. Generate one to get started!
          </p>
        </motion.div>
      )}
    </div>
  );
}