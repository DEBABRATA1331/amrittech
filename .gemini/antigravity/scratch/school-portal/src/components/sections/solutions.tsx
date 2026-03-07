"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, ShieldCheck, Database, LineChart, Cpu, BrainCircuit } from "lucide-react"
import { motion } from "framer-motion"

const solutions = [
    {
        title: "School Website & CRM",
        description: "End-to-end admission funnel management and premium website design.",
        benefits: ["Online Admission Portal", "Lead Management System", "Automated Follow-ups"],
        icon: Smartphone,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "Academic Intelligence",
        description: "Deep analytics for student performance and institutional growth.",
        benefits: ["Predictive Scoring", "Learning Gap Analysis", "Automated Report Generation"],
        icon: LineChart,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },
    {
        title: "Visitor Gate-Pass System",
        description: "Digital security system for campus access and safety.",
        benefits: ["QR-Based Entry", "Parent Instant Alerts", "Real-time Presence Log"],
        icon: ShieldCheck,
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    },
    {
        title: "Career Mapping Engine",
        description: "Aptitude assessment and personalized career path identification.",
        benefits: ["Psychometric Analysis", "Subject Recommendations", "Counseling Dashboard"],
        icon: BrainCircuit,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        title: "Student Wellness Monitor",
        description: "Monitoring behavioral trends and emotional well-being.",
        benefits: ["Safe Environment Protocol", "Early Warning Signals", "Counselor Insights"],
        icon: Database,
        color: "text-rose-500",
        bg: "bg-rose-500/10"
    },
    {
        title: "Robotics Innovation Camps",
        description: "Integrated future skills programs for next-gen innovators.",
        benefits: ["Robotics Hardware Kits", "Curriculum Integration", "National Competitions"],
        icon: Cpu,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10"
    }
]

export function SolutionsSection() {
    return (
        <section id="solutions" className="py-24 bg-black relative">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-blue-500 font-semibold mb-4">OUR SOLUTIONS</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Intelligent Tools for <br />
                        Modern Educational Leaders
                    </h3>
                    <p className="text-gray-400 text-lg">
                        We provide a comprehensive digital infrastructure that handles everything from admissions to student outcomes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="bg-white/5 border-white/10 hover:border-blue-500/50 transition-all duration-300 group h-full">
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bg} group-hover:scale-110 transition-transform`}>
                                        <item.icon className={`w-6 h-6 ${item.color}`} />
                                    </div>
                                    <CardTitle className="text-white text-xl">{item.title}</CardTitle>
                                    <CardDescription className="text-gray-400 mt-2">{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <ul className="space-y-2">
                                        {item.benefits.map((benefit, bIndex) => (
                                            <li key={bIndex} className="flex items-center gap-2 text-sm text-gray-300">
                                                <div className="w-1 h-1 rounded-full bg-blue-500" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant="link" className="text-blue-500 p-0 h-auto font-semibold hover:text-blue-400">
                                        Learn More →
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
