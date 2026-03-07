"use client"

import { Button } from "@/components/ui/button"
import { ParticleHero } from "@/components/ui/particle-hero"
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"

export function HeroSection() {
    return (
        <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center pt-20">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            <div className="absolute inset-0 z-0 opacity-50">
                <ParticleHero />
            </div>

            <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
                            Building Intelligent <br />
                            <span className="text-blue-500 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                                Digital Ecosystems
                            </span> <br />
                            for Modern Schools
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed"
                    >
                        Transform your school with smart CRM systems, academic intelligence dashboards, campus security solutions, and future skills programs.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 text-lg">
                            Book a Free Consultation
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-12 text-lg">
                            Explore Solutions
                        </Button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative h-[500px] lg:h-[600px] w-full"
                >
                    <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full relative z-10"
                    />
                </motion.div>
            </div>
        </section>
    )
}
