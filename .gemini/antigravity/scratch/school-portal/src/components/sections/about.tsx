"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutSection() {
    return (
        <section id="about" className="py-24 bg-white text-black overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 space-y-8"
                    >
                        <h2 className="text-blue-600 font-semibold">ABOUT AMRIT TECH SOLUTION</h2>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                            Empowering Schools for the <br />
                            <span className="text-blue-600">Digital Age</span>
                        </h3>

                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p>
                                Amrit Tech Solution empowers schools with technology-driven operational efficiency, student intelligence systems, and innovation programs that prepare students for the future.
                            </p>
                            <p>
                                We believe that every school, whether private or government-run, deserves a world-class digital ecosystem. Our mission is to bridge the gap between traditional education and the digital future by provide intelligent tools that simplify administration and enhance learning outcomes.
                            </p>
                            <p>
                                From advanced CRM systems for admissions to state-of-the-art robotics labs, our solutions are designed to be scalable, secure, and easy to use.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
                            <div>
                                <p className="text-4xl font-bold text-blue-600">50+</p>
                                <p className="text-sm text-gray-500 mt-1">Schools Transformed</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-blue-600">10k+</p>
                                <p className="text-sm text-gray-500 mt-1">Students Impacted</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-blue-600">24/7</p>
                                <p className="text-sm text-gray-500 mt-1">Expert Support</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative"
                    >
                        <div className="aspect-square relative rounded-2xl overflow-hidden border-8 border-gray-100 shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=1000"
                                alt="Modern School"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600 rounded-2xl -z-10" />
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-gray-100 rounded-full -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
