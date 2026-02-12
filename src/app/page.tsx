'use client';

import { motion, Variants } from "framer-motion";

import ScrollSequence from '@/components/ScrollSequence';


const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    },
  },
};


export default function Home() {
  return (
    <main className="relative w-full h-[400vh] bg-black text-white">
      {/* The Scroll Sequence Background - Fixed position */}
      <ScrollSequence
        frameCount={181}
        imagesPath="/images/valkyriesequence/"
        className="fixed inset-0 z-0 opacity-80"
      />

      {/* Content Overlay */}
      <div className="relative z-10 w-full">

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl mix-blend-difference"
          >
            Valkyrie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl font-light text-gray-400 uppercase mix-blend-difference"
          >
            Aston Martin
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-24 animate-pulse text-gray-500 text-sm tracking-widest uppercase"
          >
            Scroll to Explore
          </motion.div>
        </section>

        {/* Spacer for scroll pacing */}
        <div className="h-[20vh]"></div>

        {/* Specifications Section */}
        <section className="min-h-screen flex flex-col items-start justify-center p-8 px-4 md:px-24 pointer-events-none">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-2xl p-8 rounded-lg backdrop-blur-sm bg-black/20 border-l border-green-500/50"
          >
            <h2 className="text-xs font-bold text-green-500 tracking-widest uppercase mb-4">Performance</h2>
            <div className="space-y-2 mb-8">
              <h3 className="text-5xl md:text-7xl font-bold uppercase text-white">1160 HP</h3>
              <p className="text-2xl text-gray-400">Naturally Aspirated V12</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm tracking-wide text-gray-300 border-t border-gray-800 pt-8">
              <div>
                <span className="block text-gray-500 uppercase text-xs mb-1">Engine</span>
                6.5L Cosworth Hybrid
              </div>
              <div>
                <span className="block text-gray-500 uppercase text-xs mb-1">Redline</span>
                11,100 RPM
              </div>
              <div>
                <span className="block text-gray-500 uppercase text-xs mb-1">Price</span>
                $3,000,000
              </div>
              <div>
                <span className="block text-gray-500 uppercase text-xs mb-1">Production</span>
                Limited Run
              </div>
            </div>
          </motion.div>
        </section>

        {/* Design Section */}
        <section className="min-h-screen flex flex-col items-end justify-center p-8 px-4 md:px-24 text-right pointer-events-none">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-2xl p-8 rounded-lg backdrop-blur-sm bg-black/20 border-r border-green-500/50"
          >
            <h2 className="text-xs font-bold text-green-500 tracking-widest uppercase mb-4">Design</h2>
            <h3 className="text-4xl md:text-6xl font-bold uppercase mb-6 leading-tight text-white">
              Aerodynamic<br />Purity
            </h3>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              A Formula One™ inspired hypercar built with ultra-light carbon fiber and aggressive airflow tunnels.
              Every surface is designed for negative lift and maximum downforce.
            </p>
          </motion.div>
        </section>

        {/* Footer/Final Section */}
        <section className="min-h-[50vh] flex items-center justify-center p-8 pointer-events-none">
          <p className="text-gray-600 text-sm tracking-widest uppercase">
            Aston Martin Valkyrie Sequence Showcase
          </p>
        </section>

      </div>
    </main>
  );
}
