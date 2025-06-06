'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Persona, PersonaFormData } from '@/types';
import { generatePersona } from '@/lib/openai';
import { usePersonaStore } from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { PersonaForm } from '@/components/builder/PersonaForm';
import { PersonaCard } from '@/components/builder/PersonaCard';
import { PersonaGrid } from '@/components/builder/PersonaGrid';
import { LoadingCard } from '@/components/builder/LoadingCard';
import { BackgroundGradient } from '@/components/landing/BackgroundGradient';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function BuilderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);
  const { personas, addPersona, removePersona } = usePersonaStore();

  const handleFormSubmit = async (data: PersonaFormData) => {
    setIsLoading(true);
    setCurrentPersona(null);

    try {
      const result = await generatePersona(data);
      
      const newPersona: Persona = {
        id: uuidv4(),
        ...data,
        fullName: result.fullName,
        bio: result.bio,
        personalityTraits: result.personalityTraits,
        skills: result.skills,
        createdAt: new Date(),
      };
      
      setCurrentPersona(newPersona);
    } catch (error) {
      console.error('Failed to generate persona:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePersona = () => {
    if (currentPersona) {
      addPersona(currentPersona);
      setCurrentPersona(null);
    }
  };

  const handleDeletePersona = (id: string) => {
    removePersona(id);
  };

  return (
    <main className="min-h-screen pb-16">
      <BackgroundGradient />
      <Navbar />
      
      <div className="container mx-auto pt-28 px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <motion.div 
            className="w-full md:w-1/3 md:sticky md:top-28"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <Link href="/" className="mr-2">
                <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Persona Builder</h1>
            </div>
            
            <PersonaForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </motion.div>
          
          <motion.div 
            className="w-full md:w-2/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Your Digital Twin</h2>
              <p className="text-muted-foreground">
                Generate and save multiple personas for different contexts.
              </p>
            </div>
            
            {isLoading ? (
              <LoadingCard />
            ) : currentPersona ? (
              <div className="mb-8">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">Recently Generated</h3>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSavePersona} 
                      variant="secondary"
                      size="sm"
                      className="rounded-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Persona
                    </Button>
                    <Button 
                      onClick={() => setCurrentPersona(null)} 
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Discard
                    </Button>
                  </div>
                </div>
                <PersonaCard persona={currentPersona} isNew />
              </div>
            ) : null}
            
            {personas.length > 0 && (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">Saved Personas</h3>
                  <span className="text-sm text-muted-foreground">
                    {personas.length} {personas.length === 1 ? 'persona' : 'personas'}
                  </span>
                </div>
                <PersonaGrid personas={personas} onDelete={handleDeletePersona} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}