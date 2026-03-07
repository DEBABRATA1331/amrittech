"use client"

import { motion } from "framer-motion"
import { Link, Zap, Shield, Rocket, Layers } from "lucide-react"

const features = [
    {
        title: "Integrated Ecosystem",
        description: "One unified platform for everything from admission to academics.",
        icon: Link
    },
    {
        title: "Data-Driven Decisions",
        description: "Real-time analytics that help school owners make smarter choices.",
        icon: Zap
    },
    {
        title: "Enhanced Safety",
        description: "State-of-the-art digital security for every student and visitor.",
        icon: Shield
    },
    {
        title: "Future-Ready Skills",
        description: "Empowering students with robotics, coding, and AI literacy.",
        icon: Rocket
    },
    {
        title: "Scalable Architecture",
        description: "Customizable systems that grow with your institution's needs.",
        icon: Layers
    }
]

export function WhyChooseUs() {
    return (
        <section id="why-us" className="py-24 bg-black text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-blue-500 font-semibold mb-4">WHY CHOOSE US</h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-16">The Amrit Advantage</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="space-y-6"
                        >
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                <item.icon className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-lg font-bold">{item.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
