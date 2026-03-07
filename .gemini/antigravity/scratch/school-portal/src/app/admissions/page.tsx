"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, CheckCircle2, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

const steps = [
    { n: "01", title: "Fill Online Form", desc: "Complete the application form on our admissions portal with your child's details.", color: "#1d4ed8" },
    { n: "02", title: "Document Submission", desc: "Upload birth certificate, previous school records, and passport photo.", color: "#7c3aed" },
    { n: "03", title: "Entrance Assessment", desc: "Grades 6–12 appear for a brief assessment. Pre-primary is direct admission.", color: "#0369a1" },
    { n: "04", title: "Parent Interview", desc: "A short meeting with the admission coordinator to understand expectations.", color: "#047857" },
    { n: "05", title: "Offer Letter & Fee", desc: "Receive your admission offer and confirm your seat by paying the first term fee.", color: "#dc2626" },
];

const classes = [
    { grade: "Nursery – KG2", seats: "40 per section", age: "3–5 years", process: "Direct Admission" },
    { grade: "Grade 1 – 5", seats: "35 per section", age: "6–11 years", process: "Direct Admission" },
    { grade: "Grade 6 – 8", seats: "30 per section", age: "12–14 years", process: "Assessment + Interview" },
    { grade: "Grade 9 – 10", seats: "25 per section", age: "15–16 years", process: "Assessment + Interview" },
    { grade: "Grade 11 – 12", seats: "25 per section", age: "17–18 years", process: "Merit + Stream Selection" },
];

const docs = [
    "Birth Certificate (original + photocopy)",
    "Previous School Transfer Certificate",
    "Last 2 years Report Cards",
    "Aadhaar Card of Child",
    "Parent / Guardian Aadhaar Card",
    "2 Passport-size Photographs",
    "Proof of Residence (utility bill / rent agreement)",
    "Caste Certificate (if applicable)",
];

export default function AdmissionsPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", grade: "", parent: "", phone: "", email: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* breadcrumb */}
            <div className="bg-white border-b border-gray-100 pt-5 pb-4 px-4">
                <div className="max-w-7xl mx-auto flex items-center gap-3">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-700 font-medium transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Home
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-sm font-bold text-blue-700">Admissions</span>
                </div>
            </div>

            {/* hero */}
            <div className="relative h-56 md:h-72 overflow-hidden">
                <Image src="/school-campus.png" alt="School" fill className="object-cover" />
                <div className="absolute inset-0 bg-blue-900/80 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                            <span className="inline-block bg-amber-400 text-amber-900 text-xs font-black px-3 py-1.5 rounded-full mb-4">
                                2026–27 Admissions Open
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-white">Admissions</h1>
                            <p className="text-blue-200 mt-2 text-sm">Join the Sunrise International School family</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* process steps - static render, no whileInView */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="mb-10">
                        <span className="inline-block text-blue-700 font-bold tracking-widest text-xs uppercase mb-4 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50">
                            Application Process
                        </span>
                        <h2 className="text-4xl font-black text-gray-900">How to Apply</h2>
                    </div>

                    <div className="relative">
                        {/* vertical line */}
                        <div className="hidden md:block absolute left-[27px] top-7 bottom-7 w-0.5 bg-blue-100" />

                        <div className="space-y-5">
                            {steps.map((s, i) => (
                                <motion.div key={s.n}
                                    initial={{ opacity: 0, x: -24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.12, duration: 0.5 }}
                                    className="flex gap-5 items-start group"
                                >
                                    <div
                                        className="w-14 h-14 rounded-2xl text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform"
                                        style={{ background: s.color }}
                                    >
                                        {s.n}
                                    </div>
                                    <div className="flex-1 pt-3 border-b border-gray-100 pb-5">
                                        <h3 className="font-black text-gray-900 text-lg mb-1">{s.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <Link href="/portal">
                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-700 text-white font-black text-sm shadow-lg hover:bg-blue-800 transition-colors">
                                Apply Online <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                        <Link href="/contact">
                            <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-blue-300 hover:bg-blue-50 transition-all">
                                Contact Admissions
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* seat availability */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl font-black text-gray-900 mb-8">Seat Availability 2026–27</h2>
                    <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-blue-800 text-white">
                                <tr>
                                    {["Grade / Class", "Seats Available", "Age Criteria", "Admission Process"].map(h => (
                                        <th key={h} className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {classes.map((c, i) => (
                                    <tr key={c.grade} className={`hover:bg-blue-50/40 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                                        <td className="px-6 py-4 font-bold text-gray-900">{c.grade}</td>
                                        <td className="px-6 py-4 text-gray-600">{c.seats}</td>
                                        <td className="px-6 py-4 text-gray-600">{c.age}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-xl text-xs font-bold whitespace-nowrap">{c.process}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* documents + form */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 gap-14">
                        {/* documents */}
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 mb-8">Required Documents</h2>
                            <div className="space-y-3">
                                {docs.map((d, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <p className="text-sm text-gray-600">{d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* enquiry form */}
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 mb-8">Admission Enquiry</h2>
                            {submitted ? (
                                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                    className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-10 text-center">
                                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-black text-gray-900 mb-2">Enquiry Submitted!</h3>
                                    <p className="text-gray-500 text-sm">Our admissions team will contact you within 24 hours.</p>
                                    <Link href="/">
                                        <button className="mt-6 px-6 py-3 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-800 transition-colors">
                                            Back to Home
                                        </button>
                                    </Link>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {[
                                        { key: "name", label: "Child's Full Name", type: "text", placeholder: "Enter full name" },
                                        { key: "grade", label: "Applying for Grade", type: "text", placeholder: "e.g. Grade 5" },
                                        { key: "parent", label: "Parent / Guardian Name", type: "text", placeholder: "Enter name" },
                                        { key: "phone", label: "Mobile Number", type: "tel", placeholder: "+91 98765 43210" },
                                        { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                                    ].map(f => (
                                        <div key={f.key}>
                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">{f.label}</label>
                                            <input
                                                type={f.type}
                                                required
                                                placeholder={f.placeholder}
                                                value={form[f.key as keyof typeof form]}
                                                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-sm text-gray-900 transition-colors"
                                            />
                                        </div>
                                    ))}
                                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                        className="w-full py-4 rounded-2xl bg-blue-700 text-white font-black text-sm hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30 flex items-center justify-center gap-2">
                                        Submit Enquiry <ChevronRight className="w-4 h-4" />
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* contact strip */}
            <section className="bg-blue-800 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-wrap gap-6 justify-center items-center">
                        <a href="tel:+919876543210" className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors">
                            <Phone className="w-4 h-4" /><span className="text-sm font-bold">+91 98765 43210</span>
                        </a>
                        <a href="mailto:admissions@sunriseschool.edu.in" className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors">
                            <Mail className="w-4 h-4" /><span className="text-sm font-bold">admissions@sunriseschool.edu.in</span>
                        </a>
                        <div className="flex items-center gap-2 text-blue-200">
                            <Calendar className="w-4 h-4" /><span className="text-sm">Mon–Sat: 9 AM – 4 PM</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-200">
                            <MapPin className="w-4 h-4" /><span className="text-sm">Sector 21, New Delhi – 110062</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
