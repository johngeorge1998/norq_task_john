"use client"

import { Loader } from '@mantine/core';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ 
      repeat: Infinity, 
      duration: 1.5,
      ease: "easeInOut"
    }}
  >
    <Loader size="md" color="indigo" type="dots" />
  </motion.div>
  );
}