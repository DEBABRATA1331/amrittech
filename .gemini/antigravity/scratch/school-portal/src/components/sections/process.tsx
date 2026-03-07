"use client"

import { motion } from "framer-motion"

const steps = [
    { id: "01", title: "Consultation", desc: "Understanding your school's unique challenges and goals." },
    { id: "02", title: "System Design", desc: "Tailoring the digital ecosystem to fit your requirements." },
    { id: "03", title: "Implementation", desc: "Seamless deployment with full data migration support." },
    { id: "04", title: "Ongoing Support", desc: "Dedicated team to ensure your systems run perfectly." }
]

export function ProcessSection() {
    return (
        <section className="py-24 bg-gray-50 text-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-blue-600 font-semibold mb-4">OUR PROCESS</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How We Transform Schools</h3>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    <div className="hidden md:block absolute top-[2.25rem] left-0 w-full h-0.5 bg-gray-200 -z-0" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 text-center">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-6 shadow-lg">
                                {step.id}
                            </div>
                            <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                            <p className="text-gray-500 text-sm">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
