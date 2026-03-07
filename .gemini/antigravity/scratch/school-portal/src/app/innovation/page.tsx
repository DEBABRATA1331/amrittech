"use client"

import Spline from '@splinetool/react-spline';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Rocket, Cpu, Code2, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InnovationProgramPage() {
    return (
        <div className="min-h-screen bg-[#050510] text-white selection:bg-blue-500/30">
            {/* Navigation Bar */}
            <header className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center bg-black/10 backdrop-blur-md border-b border-white/5">
                <Link href="/" className="group text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-medium">
                    <span className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </span>
                    Back to Portal
                </Link>
                <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-semibold tracking-wider text-blue-400 flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                    </span>
                    BETA ACCESS
                </div>
            </header>

            <main>
                {/* Hero Section with Spline 3D Animation */}
                <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                    {/* The 3D Interactive Canvas */}
                    <div className="absolute inset-0 z-0 cursor-move">
                        <div className="w-full h-full scale-[1.2] md:scale-100 flex items-center justify-center pt-20">
                            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
                        </div>
                    </div>

                    {/* Overlay gradients for seamless blending */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/50 via-transparent to-[#050510] pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050510_100%)] opacity-60 pointer-events-none z-10" />

                    <div className="relative z-20 text-center mt-auto pb-24 md:pb-32 px-4 max-w-4xl mx-auto pointer-events-none flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-blue-600 drop-shadow-2xl">
                                The Future is Interactive
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed pointer-events-auto">
                                Interact with the 3D model above. Build robotics, master AI, and shape tomorrow with our hands-on curriculum.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="pointer-events-auto"
                        >
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-[0_0_40px_-5px_rgba(37,99,235,0.6)] transition-all hover:scale-105 group border border-blue-400/30">
                                Enroll in Program
                                <Rocket className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform group-hover:-translate-y-1" />
                            </Button>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-24 px-4 bg-[#050510] relative z-20 border-t border-white/5">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">What You Will Learn</h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                Our comprehensive program covers the necessary skills to excel in the upcoming technological era.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Cpu className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Hardware & IoT</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Understand the physical layer of technology. Build circuits, program microcontrollers, and create smart connected devices from scratch.
                                </p>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Code2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Software Engineering</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Write clean, efficient code. Master next-generation web frameworks, full-stack development, and modern architectural patterns.
                                </p>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <BrainCircuit className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">AI & Machine Learning</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Dive into the minds of machines. Train neural networks, process natural language, and build predictive models that solve real problems.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
