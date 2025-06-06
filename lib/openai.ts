import { PersonaFormData, Persona } from '@/types';

interface OpenAIResponse {
  fullName: string;
  bio: string;
  personalityTraits: string[];
  skills: string[];
}

export async function generatePersona(
  formData: PersonaFormData
): Promise<OpenAIResponse> {
  // In a real implementation, you would call the OpenAI API here
  // For this example, we'll simulate a response
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Generate based on the mood, profession, and interests
  const { mood, profession, interests } = formData;
  
  // Sample personality traits based on mood
  const moodTraits = {
    calm: ['Patient', 'Composed', 'Thoughtful', 'Balanced', 'Serene'],
    energetic: ['Enthusiastic', 'Dynamic', 'Passionate', 'Lively', 'Motivated'],
    serious: ['Focused', 'Analytical', 'Disciplined', 'Methodical', 'Dependable'],
    creative: ['Imaginative', 'Innovative', 'Artistic', 'Curious', 'Visionary'],
  };

  // Sample skills based on profession
  const professionSkills = {
    designer: ['UI/UX Design', 'Visual Communication', 'Typography', 'Color Theory', 'Prototyping'],
    developer: ['Frontend Development', 'Backend Architecture', 'Problem Solving', 'Algorithm Design', 'System Optimization'],
    doctor: ['Patient Care', 'Diagnostics', 'Medical Research', 'Healthcare Management', 'Clinical Analysis'],
    athlete: ['Physical Training', 'Competition Strategy', 'Team Coordination', 'Mental Fortitude', 'Performance Analysis'],
  };

  // Generate a name based on profession and mood
  const firstNames = ['Alex', 'Jordan', 'Morgan', 'Taylor', 'Cameron', 'Riley', 'Jamie', 'Casey'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Chen', 'Patel', 'Garcia', 'Martinez', 'Kim'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;

  // Generate a bio
  const bioTemplates = [
    `A ${mood} ${profession} with a passion for ${interests.join(' and ')}. Always looking to innovate and push boundaries.`,
    `Combining expertise in ${profession} fields with a ${mood} approach to problem-solving. Deeply interested in ${interests.join(', ')}.`,
    `Known for bringing a ${mood} energy to ${profession} challenges. Finds inspiration in ${interests.join(' and ')}.`,
    `A forward-thinking ${profession} who approaches work with a ${mood} mindset. Outside of work, enjoys exploring ${interests.join(' and ')}.`,
  ];
  
  const bio = bioTemplates[Math.floor(Math.random() * bioTemplates.length)];

  // Select traits and skills
  const personalityTraits = moodTraits[mood].sort(() => 0.5 - Math.random()).slice(0, 3);
  const skills = professionSkills[profession].sort(() => 0.5 - Math.random()).slice(0, 4);
  
  // Add an interest-based skill
  if (interests.length > 0) {
    const interestSkill = `${interests[0]} Expertise`;
    skills.push(interestSkill);
  }

  return {
    fullName,
    bio,
    personalityTraits,
    skills,
  };
}