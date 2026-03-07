"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowUpRight } from "lucide-react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
}

const programs = [
    {
        id: "01", title: "Pre-Primary", grades: "Nursery – KG2", age: "3–5 years", color: "#dc2626", bg: "#fef2f2",
        desc: "Our play-based Pre-Primary programme fosters curiosity, communication, motor skills and social-emotional development through storytelling, art, music, and structured play.",
        subjects: ["English Language Skills", "Basic Mathematics", "Environmental Awareness", "Art & Craft", "Music & Movement", "Social Skills"],
        highlights: ["Montessori-inspired classrooms", "Parent-teacher interactions monthly", "Zero homework policy for Nursery", "CCTV-monitored campus"]
    },
    {
        id: "02", title: "Primary School", grades: "Grade 1 – 5", age: "6–11 years", color: "#1d4ed8", bg: "#eff6ff",
        desc: "The Primary programme builds strong foundations in core subjects while encouraging curiosity via science experiments, creative writing, library sessions, and computer basics.",
        subjects: ["English & Hindi", "Mathematics", "EVS / Science", "Social Studies", "Computer Science", "Physical Education"],
        highlights: ["Project-based learning", "Digital classrooms", "Weekly library period", "Inter-class competitions"]
    },
    {
        id: "03", title: "Middle School", grades: "Grade 6 – 8", age: "12–14 years", color: "#6d28d9", bg: "#f5f3ff",
        desc: "Middle School prepares students for the rigours of secondary academics through collaborative projects, lab science, coding clubs, and personality development workshops.",
        subjects: ["English", "Hindi / Sanskrit", "Mathematics", "Science", "Social Science", "Computer / IT"],
        highlights: ["Science & Math Olympiad prep", "Coding club", "Monthly guest lectures", "MUN participation"]
    },
    {
        id: "04", title: "Secondary (9–10)", grades: "Grade 9 – 10", age: "15–16 years", color: "#047857", bg: "#ecfdf5",
        desc: "Our CBSE Class 10 programme focuses on board exam excellence with structured revision, practice papers, and personalised mentoring from subject experts.",
        subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science", "IT/Vocational"],
        highlights: ["CBSE Board preparation", "Regular mock tests", "Career guidance sessions", "Remedial classes"]
    },
    {
        id: "05", title: "Senior Secondary (11–12)", grades: "Grade 11 – 12", age: "17–18 years", color: "#b45309", bg: "#fffbeb",
        desc: "Three specialized streams — Science, Commerce, and Arts — with dedicated coaching for Class 12 boards and competitive entrance exams (JEE / NEET / CLAT / CA Foundation).",
        subjects: ["Science: Physics, Chemistry, Maths/Bio", "Commerce: Accountancy, Business", "Arts: History, Political Sci, Psychology"],
        highlights: ["JEE / NEET crash courses", "Expert subject teachers", "Career counselling", "100% board results"]
    },
];

export default function ProgramsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-100 pt-5 pb-4 px-4">
                <div className="max-w-7xl mx-auto flex items-center gap-3">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-700 font-medium transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Home
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-sm font-bold text-blue-700">Programs</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                <Reveal>
                    <span className="inline-block text-blue-700 font-bold tracking-widest text-xs uppercase mb-4 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50">Academic Programs</span>
                    <h1 className="text-5xl font-black text-gray-900 mb-4">From Nursery to Class XII</h1>
                    <p className="text-lg text-gray-500 mb-16 max-w-2xl">A comprehensive, age-appropriate curriculum designed for holistic development at every stage of a child's growth.</p>
                </Reveal>

                <div className="space-y-10">
                    {programs.map((p, i) => (
                        <motion.div key={p.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-3xl border-2 border-gray-100 bg-white overflow-hidden hover:border-gray-200 hover:shadow-xl transition-all"
                            style={{ borderLeftWidth: 4, borderLeftColor: p.color }}
                        >
                            <div className="grid md:grid-cols-3 gap-0">
                                {/* left colored header */}
                                <div className="p-8 md:border-r border-gray-100" style={{ background: p.bg }}>
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white mb-4 shadow-md" style={{ background: p.color }}>{p.id}</div>
                                    <h2 className="text-2xl font-black text-gray-900 mb-1">{p.title}</h2>
                                    <p className="text-sm font-bold mb-1" style={{ color: p.color }}>{p.grades}</p>
                                    <p className="text-xs text-gray-500">Age: {p.age}</p>
                                </div>

                                {/* middle desc */}
                                <div className="p-8 md:border-r border-gray-100">
                                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{p.desc}</p>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Subjects</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {p.subjects.map(s => (
                                            <span key={s} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600">{s}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* right highlights */}
                                <div className="p-8">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Highlights</h4>
                                    <ul className="space-y-2.5">
                                        {p.highlights.map(h => (
                                            <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                                                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: p.color }} />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/admissions">
                                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                            className="mt-6 w-full py-2.5 rounded-xl text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md"
                                            style={{ background: p.color }}>
                                            Apply for {p.title} <ArrowUpRight className="w-3.5 h-3.5" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
