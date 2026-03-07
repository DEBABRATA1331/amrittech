"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Blocks, Code, Binary, Trophy } from "lucide-react"
import Link from "next/link"

const programs = [
    {
        title: "Robotics Workshops",
        description: "Hands-on experience with hardware kits and embedded systems.",
        icon: Blocks
    },
    {
        title: "Coding Bootcamps",
        description: "Intensive training in modern programming languages.",
        icon: Code
    },
    {
        title: "AI & Python Programs",
        description: "Future-ready curriculum focused on machine learning basics.",
        icon: Binary
    },
    {
        title: "Inter-school Hackathons",
        description: "Platforms for students to showcase their innovation.",
        icon: Trophy
    }
]

export function RoboticsSection() {
    return (
        <section id="robotics" className="py-24 bg-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.4),transparent)]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-white font-semibold mb-4 text-lg">FUTURE SKILLS LAB</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Preparing Students for the <br />
                        Next Industrial Revolution
                    </h3>
                    <p className="text-blue-100 text-lg">
                        Our innovation programs go beyond textbooks, giving students the tools they need to build, code, and innovate.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {programs.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all text-white text-center group"
                        >
                            <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <item.icon className="w-7 h-7 text-blue-600" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                            <p className="text-blue-100 text-sm">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/innovation">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 h-14 text-lg font-bold">
                            Start Innovation Program
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
