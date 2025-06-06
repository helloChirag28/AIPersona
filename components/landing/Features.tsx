'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Briefcase, PenTool } from 'lucide-react';

export const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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

  const features = [
    {
      icon: <Lightbulb className="h-8 w-8 text-blue-500" />,
      title: "Choose Mood",
      description: "Select from a range of emotional states to define your persona's temperament and approach to life.",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-purple-500" />,
      title: "Select Profession",
      description: "Define your persona's career path and professional background to shape their skills and expertise.",
    },
    {
      icon: <PenTool className="h-8 w-8 text-indigo-500" />,
      title: "Generate Persona",
      description: "Our AI combines your selections to create a fully realized digital identity with a unique personality.",
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create your digital twin in three simple steps
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-3 mb-4 inline-block rounded-lg bg-background">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border">
                <span className="font-medium">{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};