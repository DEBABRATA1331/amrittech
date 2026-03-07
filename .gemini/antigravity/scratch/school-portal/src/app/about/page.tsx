"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, BookOpen, GraduationCap, Globe, Award, Users, Clock, ChevronRight } from "lucide-react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
}

const pillars = [
    { icon: Shield, title: "Safe Campus", desc: "24/7 CCTV surveillance and AI-powered gate-pass management keep every child secure.", color: "bg-blue-100 text-blue-700" },
    { icon: BookOpen, title: "World-Class Library", desc: "10,000+ volumes, e-books, digital journals, and a dedicated reading lounge.", color: "bg-purple-100 text-purple-700" },
    { icon: GraduationCap, title: "Expert Faculty", desc: "Qualified, experienced teachers with a student-first mentoring philosophy.", color: "bg-amber-100 text-amber-700" },
    { icon: Globe, title: "Global Exposure", desc: "International exchange programmes and MUN participation since 2010.", color: "bg-emerald-100 text-emerald-700" },
    { icon: Award, title: "Award-Winning", desc: "4× Best School of the Year, NAAC A+, ISO 9001 certified institution.", color: "bg-rose-100 text-rose-700" },
    { icon: Users, title: "Inclusive Learning", desc: "Special educators and counsellors support every child's unique learning needs.", color: "bg-cyan-100 text-cyan-700" },
];

const timeline = [
    { year: "2001", title: "Founded", desc: "Sunrise International School was established with 200 students in New Delhi." },
    { year: "2005", title: "CBSE Affiliation", desc: "Received full CBSE senior secondary affiliation, expanding to Class 12." },
    { year: "2010", title: "Infrastructure Expansion", desc: "New science labs, computer centre, and sports complex inaugurated." },
    { year: "2015", title: "NAAC A+ Grade", desc: "Achieved the highest possible NAAC accreditation grade." },
    { year: "2020", title: "Digital Campus", desc: "Partnered with Amrit Tech to launch full ERP — virtual classes, digital attendance." },
    { year: "2026", title: "25 Years of Excellence", desc: "3,200+ students, 180+ faculty, and a legacy of academic achievement." },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* back nav */}
            <div className="bg-white border-b border-gray-100 pt-5 pb-4 px-4">
                <div className="max-w-7xl mx-auto flex items-center gap-3">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-700 font-medium transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Home
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-sm font-bold text-blue-700">About</span>
                </div>
            </div>

            {/* hero banner */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <Image src="/school-campus.png" alt="School" fill className="object-cover" />
                <div className="absolute inset-0 bg-blue-900/70 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <p className="text-blue-200 text-xs uppercase tracking-widest font-bold mb-2">About Our School</p>
                            <h1 className="text-4xl md:text-6xl font-black text-white">Building Leaders<br /><span className="text-cyan-300">Since 2001</span></h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* mission */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <Reveal>
                            <span className="inline-block text-blue-700 font-bold tracking-widest text-xs uppercase mb-5 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50">Our Mission</span>
                            <h2 className="text-4xl font-black text-gray-900 mb-5">Excellence in Every Dimension</h2>
                            <p className="text-gray-600 mb-4 leading-relaxed text-lg">Sunrise International School is a CBSE-affiliated institution committed to holistic education. We blend academic excellence with values, creativity, and leadership development.</p>
                            <p className="text-gray-500 leading-relaxed">Located in Sector 21, New Delhi, our 5-acre campus houses modern science labs, a digital library, arts block, sports complex, and a smart classroom ecosystem powered by Amrit Tech's ERP platform.</p>
                            <div className="mt-8 flex items-center gap-3 flex-wrap">
                                {["CBSE", "NAAC A+", "ISO 9001", "4× Award"].map(b => (
                                    <span key={b} className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">{b}</span>
                                ))}
                            </div>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <div className="relative rounded-3xl overflow-hidden h-80 shadow-2xl group">
                                <Image src="/school-classroom.png" alt="Classroom" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* pillars */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Reveal><h2 className="text-3xl font-black text-gray-900 mb-12 text-center">What Makes Us Different</h2></Reveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {pillars.map((p, i) => (
                            <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -6, boxShadow: "0 16px 40px -8px rgba(0,0,0,0.1)" }}
                                className="bg-white rounded-3xl border border-gray-100 p-7 transition-all">
                                <div className={`w-12 h-12 rounded-2xl ${p.color} flex items-center justify-center mb-4`}><p.icon className="w-5 h-5" /></div>
                                <h3 className="font-black text-gray-900 mb-2">{p.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* timeline */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <Reveal><h2 className="text-3xl font-black text-gray-900 mb-14 text-center">Our Journey</h2></Reveal>
                    <div className="relative">
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2" />
                        <div className="space-y-10">
                            {timeline.map((t, i) => (
                                <motion.div key={t.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className={`flex gap-6 md:gap-10 items-start ${i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}>
                                    <div className="md:w-1/2 flex justify-end md:justify-start">
                                        <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                                            <span className="inline-block bg-blue-700 text-white text-xs font-black px-3 py-1 rounded-full mb-2">{t.year}</span>
                                            <h3 className="font-black text-gray-900 mb-1">{t.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
                                        </div>
                                    </div>
                                    <div className="absolute left-3 md:relative md:left-auto flex items-center justify-center">
                                        <div className="w-6 h-6 rounded-full bg-blue-700 border-4 border-white shadow-md" />
                                    </div>
                                    <div className="md:w-1/2 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-800 py-16 text-center">
                <div className="max-w-xl mx-auto px-4">
                    <Reveal>
                        <h2 className="text-3xl font-black text-white mb-4">Join Our School Community</h2>
                        <p className="text-blue-200 mb-8">Apply for the 2026–27 academic year. Limited seats available.</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link href="/admissions">
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                                    className="px-7 py-3.5 rounded-xl bg-white text-blue-800 font-black text-sm shadow-xl flex items-center gap-2">
                                    Apply Now <ChevronRight className="w-4 h-4" />
                                </motion.button>
                            </Link>
                            <Link href="/contact">
                                <button className="px-7 py-3.5 rounded-xl border-2 border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-all">Contact Us</button>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}

