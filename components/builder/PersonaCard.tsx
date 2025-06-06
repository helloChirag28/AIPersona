'use client';

import { motion } from 'framer-motion';
import { Persona } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { BookUser, CalendarDays, Brain, Sparkles, Trash2 } from 'lucide-react';

interface PersonaCardProps {
  persona: Persona;
  isNew?: boolean;
  onDelete?: (id: string) => void;
}

export function PersonaCard({ persona, isNew = false, onDelete }: PersonaCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      layout
    >
      <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/80 relative group">
        {isNew && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">New</Badge>
          </div>
        )}
        
        <CardHeader className="p-6 pb-2">
          <motion.div variants={itemVariants} className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Badge 
                variant="outline" 
                className="capitalize px-2 py-0 text-xs"
              >
                {persona.mood}
              </Badge>
              <Badge 
                variant="outline"
                className="capitalize px-2 py-0 text-xs"
              >
                {persona.profession}
              </Badge>
            </div>
            <h3 className="text-2xl font-bold">{persona.fullName}</h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarDays className="h-3 w-3 mr-1" />
              {formatDate(persona.createdAt)}
            </div>
          </motion.div>
        </CardHeader>
        
        <CardContent className="p-6 pt-4">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <BookUser className="h-4 w-4" />
                <span>Bio</span>
              </div>
              <p className="text-sm">{persona.bio}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Brain className="h-4 w-4" />
                <span>Personality Traits</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {persona.personalityTraits.map((trait, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="px-2 py-0 text-xs"
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span>Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {persona.skills.map((skill, index) => (
                  <Badge 
                    key={index}
                    className="px-2 py-0 text-xs bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span>Interests</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {persona.interests.map((interest, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="px-2 py-0 text-xs"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </CardContent>
        
        {onDelete && (
          <CardFooter className="p-6 pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDelete(persona.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}