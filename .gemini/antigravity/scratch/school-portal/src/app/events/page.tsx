"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Calendar, ChevronRight, Clock, MapPin,
    Trophy, Users, Music, BookOpen, Star, Filter
} from "lucide-react";
import { useState } from "react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
}

type EventCategory = "All" | "Sports" | "Academic" | "Cultural" | "Holiday" | "Exam";

const events = [
    {
        id: 1, date: "Mar 10", day: "10", month: "MAR", year: "2026",
        title: "Annual Sports Day 2026", category: "Sports" as EventCategory,
        time: "9:00 AM – 5:00 PM", venue: "School Sports Ground",
        desc: "A grand celebration of athletics featuring track events, team sports, and prize distribution. All parents warmly invited.",
        icon: Trophy, color: "#16a34a", bg: "bg-green-50", border: "border-green-200", tag: "bg-green-100 text-green-700",
    },
    {
        id: 2, date: "Mar 14", day: "14", month: "MAR", year: "2026",
        title: "Holi Holiday – School Closed", category: "Holiday" as EventCategory,
        time: "Full Day", venue: "Campus Closed",
        desc: "School will remain closed on account of the Holi festival. Wishing all students and families a colourful celebration!",
        icon: Star, color: "#f59e0b", bg: "bg-amber-50", border: "border-amber-200", tag: "bg-amber-100 text-amber-700",
    },
    {
        id: 3, date: "Mar 20", day: "20", month: "MAR", year: "2026",
        title: "Science Exhibition 2026", category: "Academic" as EventCategory,
        time: "10:00 AM – 4:00 PM", venue: "School Auditorium & Labs",
        desc: "Students from Grades 6–12 present their innovative science and technology projects. Open to parents and public.",
        icon: BookOpen, color: "#1d4ed8", bg: "bg-blue-50", border: "border-blue-200", tag: "bg-blue-100 text-blue-700",
    },
    {
        id: 4, date: "Mar 25", day: "25", month: "MAR", year: "2026",
        title: "Annual Cultural Fest – Utsav 2026", category: "Cultural" as EventCategory,
        time: "4:00 PM – 9:00 PM", venue: "School Auditorium",
        desc: "A spectacular evening of classical dance, drama, music, and art. Featuring 300+ student performers across all grades.",
        icon: Music, color: "#7c3aed", bg: "bg-violet-50", border: "border-violet-200", tag: "bg-violet-100 text-violet-700",
    },
    {
        id: 5, date: "Apr 01", day: "01", month: "APR", year: "2026",
        title: "Class 10 Board Exam – Last Day", category: "Exam" as EventCategory,
        time: "10:30 AM", venue: "Exam Hall, Block B",
        desc: "CBSE Class 10 board examinations conclude. All the best to our appearing students!",
        icon: BookOpen, color: "#dc2626", bg: "bg-red-50", border: "border-red-200", tag: "bg-red-100 text-red-700",
    },
    {
        id: 6, date: "Apr 05", day: "05", month: "APR", year: "2026",
        title: "Parent-Teacher Meeting – Primary", category: "Academic" as EventCategory,
        time: "9:00 AM – 1:00 PM", venue: "Respective Classrooms",
        desc: "Scheduled PTM for Grade 1–5 parents to discuss academic progress and share feedback with teachers.",
        icon: Users, color: "#1d4ed8", bg: "bg-blue-50", border: "border-blue-200", tag: "bg-blue-100 text-blue-700",
    },
    {
        id: 7, date: "Apr 14", day: "14", month: "APR", year: "2026",
        title: "Dr. Ambedkar Jayanti – Holiday", category: "Holiday" as EventCategory,
        time: "Full Day", venue: "Campus Closed",
        desc: "School will remain closed in honour of Dr. B.R. Ambedkar Jayanti.",
        icon: Star, color: "#f59e0b", bg: "bg-amber-50", border: "border-amber-200", tag: "bg-amber-100 text-amber-700",
    },
    {
        id: 8, date: "Apr 20", day: "20", month: "APR", year: "2026",
        title: "Inter-School Cricket Tournament", category: "Sports" as EventCategory,
        time: "8:00 AM – 6:00 PM", venue: "School Cricket Ground",
        desc: "Hosting the district-level Inter-School Cricket Tournament. Cheering for Team Sunrise!",
        icon: Trophy, color: "#16a34a", bg: "bg-green-50", border: "border-green-200", tag: "bg-green-100 text-green-700",
    },
];

const categories: EventCategory[] = ["All", "Sports", "Academic", "Cultural", "Holiday", "Exam"];

export default function EventsPage() {
    const [filter, setFilter] = useState<EventCategory>("All");
    const [expanded, setExpanded] = useState<number | null>(null);

    const filtered = filter === "All" ? events : events.filter(e => e.category === filter);

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100 pt-5 pb-4 px-4">
                <div className="max-w-7xl mx-auto flex items-center gap-3">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-700 font-medium transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Home
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-sm font-bold text-blue-700">Events</span>
                </div>
            </div>

            {/* Header */}
            <div className="bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                            <Calendar className="w-3 h-3" /> Academic Calendar
                        </span>
                        <h1 className="text-5xl font-black text-white mb-3">School <span className="text-cyan-300">Events</span></h1>
                        <p className="text-blue-200 max-w-xl">Stay up-to-date with our academic calendar, sports days, cultural fests, exams, and holidays.</p>
                    </motion.div>
                </div>
            </div>

            {/* Filter bar */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <div className="flex items-center gap-2 overflow-x-auto">
                        <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                        {categories.map(cat => (
                            <motion.button key={cat} onClick={() => setFilter(cat)}
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${filter === cat
                                        ? "bg-blue-700 text-white shadow-md"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}>
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Events list */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <Reveal>
                    <p className="text-sm text-gray-500 mb-8">{filtered.length} event{filtered.length !== 1 ? "s" : ""} {filter !== "All" ? `in ${filter}` : "scheduled"}</p>
                </Reveal>
                <AnimatePresence mode="popLayout">
                    <div className="space-y-4">
                        {filtered.map((ev, i) => (
                            <motion.div key={ev.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.06, duration: 0.5 }}
                                className={`rounded-3xl border-2 ${ev.border} bg-white overflow-hidden hover:shadow-xl transition-all cursor-pointer`}
                                onClick={() => setExpanded(expanded === ev.id ? null : ev.id)}
                            >
                                <div className="flex items-stretch">
                                    {/* Date panel */}
                                    <div className={`${ev.bg} px-5 py-5 flex flex-col items-center justify-center min-w-[80px] border-r ${ev.border}`}>
                                        <p className="text-3xl font-black leading-none" style={{ color: ev.color }}>{ev.day}</p>
                                        <p className="text-xs font-black mt-1" style={{ color: ev.color }}>{ev.month}</p>
                                        <p className="text-[10px] text-gray-500 mt-0.5">{ev.year}</p>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 px-6 py-5 min-w-0">
                                        <div className="flex flex-wrap items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${ev.tag}`}>{ev.category}</span>
                                                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{ev.time}</span>
                                                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.venue}</span>
                                                </div>
                                                <h3 className="font-black text-gray-900 text-base md:text-lg">{ev.title}</h3>
                                            </div>
                                            <motion.div animate={{ rotate: expanded === ev.id ? 90 : 0 }} className="shrink-0 mt-1">
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Icon accent */}
                                    <div className={`${ev.bg} px-4 flex items-center border-l ${ev.border}`}>
                                        <ev.icon className="w-5 h-5" style={{ color: ev.color }} />
                                    </div>
                                </div>

                                {/* Expanded description */}
                                <AnimatePresence>
                                    {expanded === ev.id && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`border-t ${ev.border} ${ev.bg} px-6 overflow-hidden`}>
                                            <p className="text-sm text-gray-600 leading-relaxed py-4">{ev.desc}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-400 font-semibold">No events in this category</p>
                    </div>
                )}
            </div>

            {/* CTA */}
            <div className="bg-blue-800 py-12 text-center">
                <Reveal>
                    <h2 className="text-2xl font-black text-white mb-2">Stay Updated</h2>
                    <p className="text-blue-200 text-sm mb-6">Subscribe to receive event alerts directly on the School Portal.</p>
                    <Link href="/portal">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                            className="px-7 py-3.5 rounded-xl bg-white text-blue-800 font-black text-sm shadow-xl flex items-center gap-2 mx-auto">
                            Access Portal <ChevronRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </Reveal>
            </div>
        </div>
    );
}
