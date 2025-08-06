'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react' // Using Lucide React for the tick icon

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF8] p-4 overflow-hidden relative">
      <div className="flex flex-col items-center text-center w-full">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.1, 1], opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative flex size-32 items-center justify-center rounded-full bg-[#EC3750] shadow-lg"
        >
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -5 }}
            transition={{ delay: 1, duration: 0.3, ease: 'easeOut' }}
            className="absolute"
          >
            <Check className="size-20 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
          className="mt-8"
        >
          <p className="text-4xl font-bold text-[#222] tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
            Congrats, you are now a HackClub ASIET member.
          </p>
          <p className="mt-2 text-base text-gray-400">
            Please check your email for more information
          </p>
        </motion.div>


        {/* Confetti elements */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -40, opacity: 0, x: Math.random() * 400 - 200, rotate: Math.random() * 360 }}
            animate={{ y: 400, opacity: [0, 1, 0], rotate: Math.random() * 720 }}
            transition={{
              delay: 0.5 + i * 0.1,
              duration: 3 + Math.random() * 2,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 5,
            }}
            className="confetti absolute size-3 rounded-full pointer-events-none"
            style={{
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
