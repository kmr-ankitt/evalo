"use client"
import React from 'react'
import Header from '../(root)/_components/Header'
import { div } from 'framer-motion/m'
import { BookOpen } from 'lucide-react'
import { AnimatePresence, motion } from "framer-motion";
import LoginAsStudent from '@/components/LoginAsStudent'
import LoginAsInstructor from '@/components/LoginAsInstructor'


const page = () => {
  return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r
             from-blue-500/10 to-purple-500/10 text-sm text-gray-400 mb-6"
          >
            <BookOpen className="w-4 h-4" />
            Community Code Library
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-6"
          >
           “Introducing the Smart Grader"
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 mb-8"
          >
            “Your Virtual TA: Automating Grading, Amplifying Learning!”

          </motion.p>

          
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <LoginAsStudent />
            <LoginAsInstructor />
          </div>

      </div>
    </div>
  )
}

export default page