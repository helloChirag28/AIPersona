'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Persona } from '@/types';

interface PersonaStore {
  personas: Persona[];
  addPersona: (persona: Persona) => void;
  removePersona: (id: string) => void;
  clearPersonas: () => void;
}

export const usePersonaStore = create<PersonaStore>()(
  persist(
    (set) => ({
      personas: [],
      addPersona: (persona) =>
        set((state) => ({
          personas: [persona, ...state.personas],
        })),
      removePersona: (id) =>
        set((state) => ({
          personas: state.personas.filter((persona) => persona.id !== id),
        })),
      clearPersonas: () => set({ personas: [] }),
    }),
    {
      name: 'persona-storage',
    }
  )
);