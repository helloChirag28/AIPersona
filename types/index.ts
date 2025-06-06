export type Mood = 'calm' | 'energetic' | 'serious' | 'creative';

export type Profession = 'designer' | 'developer' | 'doctor' | 'athlete';

export interface PersonaFormData {
  mood: Mood;
  profession: Profession;
  interests: string[];
}

export interface Persona extends PersonaFormData {
  id: string;
  fullName: string;
  bio: string;
  personalityTraits: string[];
  skills: string[];
  createdAt: Date;
}