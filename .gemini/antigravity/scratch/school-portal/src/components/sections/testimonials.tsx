"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
    {
        text: "Amrit Tech's CRM has completely transformed our admission process. We've seen a 30% increase in conversions since implementation.",
        author: "Dr. Rajesh Sharma",
        role: "Principal, Global International School"
    },
    {
        text: "The Robotics Lab is the highlight of our campus. The curriculum is detailed and students are deeply engaged with the hands-on projects.",
        author: "Mrs. Anjali Gupta",
        role: "Trustee, Bright Minds Academy"
    },
    {
        text: "The student analytics dashboard gives us insights we never had before. It's truly data-driven education management.",
        author: "Mr. Vikram Singh",
        role: "Administrator, City Public School"
    }
]

export function TestimonialsSection() {
    return (
        <section className="py-24 bg-black text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-blue-500 font-semibold mb-4">TESTIMONIALS</h2>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Educators</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl relative"
                        >
                            <Quote className="w-10 h-10 text-blue-500/20 absolute top-6 right-6" />
                            <p className="text-gray-300 mb-8 italic leading-relaxed">"{item.text}"</p>
                            <div>
                                <p className="font-bold text-lg">{item.author}</p>
                                <p className="text-blue-500 text-sm">{item.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
