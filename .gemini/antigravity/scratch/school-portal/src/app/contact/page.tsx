"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
}

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-100 pt-5 pb-4 px-4">
                <div className="max-w-7xl mx-auto flex items-center gap-3">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-700 font-medium transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Home
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-sm font-bold text-blue-700">Contact</span>
                </div>
            </div>

            {/* header */}
            <div className="bg-blue-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span className="inline-block text-cyan-300 font-bold tracking-widest text-xs uppercase mb-4 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-white/10">Reach Out</span>
                        <h1 className="text-5xl font-black text-white">Contact Us</h1>
                        <p className="text-blue-200 mt-3 max-w-xl">We'd love to hear from you. Reach out for admissions, general queries, or visit our campus.</p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* left — contact info */}
                    <Reveal>
                        <h2 className="text-3xl font-black text-gray-900 mb-10">School Information</h2>
                        <div className="space-y-4">
                            {[
                                { icon: MapPin, label: "Address", value: "14, Sunrise Marg, Sector 21, New Delhi – 110062" },
                                { icon: Phone, label: "General Enquiry", value: "+91 98765 43210" },
                                { icon: Phone, label: "Admissions", value: "+91 98765 43211" },
                                { icon: Mail, label: "General Email", value: "info@sunriseschool.edu.in" },
                                { icon: Mail, label: "Admissions Email", value: "admissions@sunriseschool.edu.in" },
                                { icon: Clock, label: "Office Hours", value: "Mon–Sat: 8:00 AM – 4:30 PM" },
                            ].map((item, i) => (
                                <motion.div key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                                    <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                                        <item.icon className="w-5 h-5 text-blue-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                                        <p className="text-sm text-gray-800 font-semibold">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* map embed placeholder */}
                        <div className="mt-8 rounded-3xl overflow-hidden border-2 border-gray-100 h-52 bg-blue-50 flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-10 h-10 text-blue-300 mx-auto mb-2" />
                                <p className="text-sm text-gray-500 font-medium">Sector 21, New Delhi – 110062</p>
                                <a href="https://maps.google.com/?q=Sector+21+New+Delhi" target="_blank" rel="noreferrer"
                                    className="text-xs text-blue-600 font-bold mt-1 inline-block hover:underline">Open in Google Maps →</a>
                            </div>
                        </div>
                    </Reveal>

                    {/* right — contact form */}
                    <Reveal delay={0.12}>
                        <h2 className="text-3xl font-black text-gray-900 mb-8">Send a Message</h2>
                        {sent ? (
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-12 text-center">
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
                                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                                </motion.div>
                                <h3 className="text-xl font-black text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-500 text-sm">Thank you for reaching out. We'll respond within 1–2 business days.</p>
                                <Link href="/"><button className="mt-6 px-6 py-3 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-800 transition-colors">Back to Home</button></Link>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { key: "name", label: "Your Name", type: "text", placeholder: "Full name" },
                                        { key: "phone", label: "Mobile Number", type: "tel", placeholder: "+91 ..." },
                                    ].map(f => (
                                        <div key={f.key}>
                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">{f.label}</label>
                                            <input type={f.type} required placeholder={f.placeholder}
                                                value={form[f.key as keyof typeof form]}
                                                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-sm text-gray-900 transition-colors" />
                                        </div>
                                    ))}
                                </div>
                                {[
                                    { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                                    { key: "subject", label: "Subject", type: "text", placeholder: "e.g. Admission Query for Grade 5" },
                                ].map(f => (
                                    <div key={f.key}>
                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">{f.label}</label>
                                        <input type={f.type} required placeholder={f.placeholder}
                                            value={form[f.key as keyof typeof form]}
                                            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-sm text-gray-900 transition-colors" />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Message</label>
                                    <textarea required rows={5} placeholder="Type your message here..."
                                        value={form.message}
                                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-sm text-gray-900 resize-none transition-colors" />
                                </div>
                                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    className="w-full py-4 rounded-2xl bg-blue-700 text-white font-black text-sm hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30 flex items-center justify-center gap-2">
                                    <Send className="w-4 h-4" /> Send Message
                                </motion.button>
                            </form>
                        )}
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
