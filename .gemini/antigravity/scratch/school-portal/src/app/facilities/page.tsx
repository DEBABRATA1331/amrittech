"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, ChevronRight, Utensils, Trophy, Music, Monitor,
    Check, Star, Clock, Users, Wifi, Tv2, Mic2, Palette, Dumbbell, BookOpen
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

const facilities = [
    {
        id: "canteen",
        icon: Utensils,
        label: "Canteen",
        emoji: "🍽️",
        color: "#f59e0b",
        bg: "from-amber-500 to-orange-600",
        light: "bg-amber-50",
        border: "border-amber-200",
        textColor: "text-amber-700",
        image: "/school-canteen.png",
        title: "Hygienic & Nutritious School Canteen",
        desc: "Our fully equipped canteen serves fresh, FSSAI-certified nutritious meals prepared daily by trained chefs. With a seating capacity of 500+ students, the canteen offers a hygienic, comfortable environment where students can enjoy balanced Indian meals including dal, rice, sabzi, rotis, fresh juice, and healthy snacks.",
        highlights: [
            { icon: Star, text: "FSSAI certified kitchen" },
            { icon: Users, text: "Seats 500+ students" },
            { icon: Clock, text: "Open 7:30 AM – 4:30 PM" },
            { icon: Check, text: "No junk food policy" },
            { icon: Check, text: "RO purified water" },
            { icon: Check, text: "Separate veg & non-veg sections" },
        ],
        menuItems: [
            { meal: "Breakfast", items: "Idli Sambar · Poha · Upma · Milk" },
            { meal: "Lunch", items: "Dal · Rice · Roti · Sabzi · Curd" },
            { meal: "Snacks", items: "Sandwiches · Fruits · Juice · Biscuits" },
        ]
    },
    {
        id: "sports",
        icon: Trophy,
        label: "Sports",
        emoji: "🏆",
        color: "#16a34a",
        bg: "from-green-500 to-emerald-700",
        light: "bg-green-50",
        border: "border-green-200",
        textColor: "text-green-700",
        image: "/school-sports-ground.png",
        title: "World-Class Sports Facilities",
        desc: "Spread across 2.5 acres, our sports complex offers professional-grade facilities for cricket, football, basketball, badminton, athletics, and swimming. Dedicated PE coaches and annual sports festivals inspire students to discover their athletic potential and develop teamwork, discipline, and resilience.",
        highlights: [
            { icon: Trophy, text: "400m athletics track" },
            { icon: Trophy, text: "CBSE-standard cricket pitch" },
            { icon: Dumbbell, text: "Modern gymnasium" },
            { icon: Check, text: "Indoor badminton courts" },
            { icon: Check, text: "25-meter swimming pool" },
            { icon: Check, text: "Professional PE coaches" },
        ],
        menuItems: [
            { meal: "Team Sports", items: "Cricket · Football · Basketball · Volleyball" },
            { meal: "Individual", items: "Athletics · Badminton · Table Tennis · Chess" },
            { meal: "Wellness", items: "Yoga · Gymnastics · Swimming · Karate" },
        ]
    },
    {
        id: "activities",
        icon: Music,
        label: "Extra-Curricular",
        emoji: "🎭",
        color: "#7c3aed",
        bg: "from-violet-500 to-purple-700",
        light: "bg-violet-50",
        border: "border-violet-200",
        textColor: "text-violet-700",
        image: "/school-activities.png",
        title: "Rich Extra-Curricular Life",
        desc: "Beyond academics, Sunrise International School nurtures creativity, culture, and confidence through a vibrant array of clubs and activities. From classical dance and Hindustani music to robotics, debate, MUN, and community service — every student finds their passion and platform.",
        highlights: [
            { icon: Mic2, text: "Dance & Drama clubs" },
            { icon: Palette, text: "Fine arts & pottery studio" },
            { icon: Music, text: "Music room – vocals, tabla, guitar" },
            { icon: Check, text: "Robotics & coding club" },
            { icon: Check, text: "MUN & debate society" },
            { icon: Check, text: "Annual cultural fest" },
        ],
        menuItems: [
            { meal: "Performing Arts", items: "Classical Dance · Drama · Western Music" },
            { meal: "STEM Clubs", items: "Robotics · Coding · Science Olympiad" },
            { meal: "Leadership", items: "MUN · Student Council · Community Service" },
        ]
    },
    {
        id: "classroom",
        icon: Monitor,
        label: "Smart Rooms",
        emoji: "🖥️",
        color: "#0369a1",
        bg: "from-sky-500 to-blue-700",
        light: "bg-sky-50",
        border: "border-sky-200",
        textColor: "text-sky-700",
        image: "/school-classroom.png",
        title: "Technology-Powered Smart Classrooms",
        desc: "All 60 classrooms are equipped with 75-inch interactive SMART boards, HD projectors, high-speed Wi-Fi, and student response systems. Teachers create immersive 3D lessons, run live quizzes, and track individual student progress in real time using our Amrit Tech ERP — making every class engaging and data-driven.",
        highlights: [
            { icon: Monitor, text: "75\" SMART interactive boards" },
            { icon: Tv2, text: "HD ceiling projectors" },
            { icon: Wifi, text: "High-speed Wi-Fi in every room" },
            { icon: BookOpen, text: "Digital textbooks & e-library" },
            { icon: Check, text: "Live student response system" },
            { icon: Check, text: "Amrit Tech ERP integration" },
        ],
        menuItems: [
            { meal: "Hardware", items: "SMART Boards · Projectors · Document Cameras" },
            { meal: "Software", items: "Amrit Tech ERP · Google Workspace · Khan Academy" },
            { meal: "Connectivity", items: "300 Mbps Wi-Fi · 4G Backup · CCTV Monitored" },
        ]
    },
];

export default function FacilitiesPage() {
    const [active, setActive] = useState(0);
    const facility = facilities[active];

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100 pt-5 pb-4 px-4">
                <div className="max-w-7xl mx-auto flex items-center gap-3">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-700 font-medium transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Home
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-sm font-bold text-blue-700">Campus Facilities</span>
                </div>
            </div>

            {/* Hero Header */}
            <div className="relative h-52 md:h-64 overflow-hidden">
                <Image src="/school-campus.png" alt="Campus" fill className="object-cover" />
                <div className="absolute inset-0 bg-blue-900/78 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                            <span className="inline-block bg-white/15 border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 backdrop-blur-sm">Campus Life</span>
                            <h1 className="text-4xl md:text-6xl font-black text-white">Our <span className="text-cyan-300">Facilities</span></h1>
                            <p className="text-blue-200 mt-2 text-sm">Everything a student needs to thrive — under one roof</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Tab Selector */}
            <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
                        {facilities.map((f, i) => (
                            <motion.button key={f.id} onClick={() => setActive(i)}
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shrink-0 transition-all ${active === i
                                    ? `text-white shadow-md`
                                    : "text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200"
                                    }`}
                                style={active === i ? { background: `linear-gradient(135deg, ${f.color}, ${f.color}cc)` } : {}}
                            >
                                <span className="text-base">{f.emoji}</span>
                                {f.label}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <AnimatePresence mode="wait">
                <motion.div key={active}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Image + Info hero */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                            {/* Image */}
                            <div className="relative h-72 md:h-[420px] rounded-3xl overflow-hidden shadow-2xl group">
                                <Image src={facility.image} alt={facility.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                {/* floating label */}
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-5 left-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100"
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                                        style={{ background: facility.color + "20" }}>
                                        {facility.emoji}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-gray-900">{facility.label}</p>
                                        <p className="text-xs font-bold" style={{ color: facility.color }}>World-class facility</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Text */}
                            <div>
                                <span className={`inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full border ${facility.light} ${facility.border} ${facility.textColor}`}>
                                    {facility.emoji} {facility.label}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5 leading-tight">{facility.title}</h2>
                                <p className="text-gray-600 leading-relaxed mb-8">{facility.desc}</p>

                                {/* highlights grid */}
                                <div className="grid grid-cols-2 gap-2.5">
                                    {facility.highlights.map((h, i) => (
                                        <motion.div key={h.text}
                                            initial={{ opacity: 0, x: -12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.06 }}
                                            className={`flex items-center gap-2.5 p-3 rounded-xl border ${facility.light} ${facility.border}`}>
                                            <h.icon className="w-4 h-4 shrink-0" style={{ color: facility.color }} />
                                            <span className="text-xs font-semibold text-gray-700">{h.text}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details strip */}
                    <div className="border-t border-gray-100 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                            <h3 className="text-lg font-black text-gray-900 mb-6">What We Offer</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {facility.menuItems.map((item, i) => (
                                    <motion.div key={item.meal}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.1)" }}
                                        className={`p-6 rounded-2xl border-2 bg-white ${facility.border} transition-all`}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: facility.color }} />
                                            <span className="text-xs font-black uppercase tracking-widest" style={{ color: facility.color }}>{item.meal}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.items}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation between facilities */}
            <div className="bg-white border-t border-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {facilities.map((f, i) => (
                            <motion.button key={f.id} onClick={() => setActive(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${active === i ? "text-white shadow-lg" : `${f.light} ${f.textColor} border ${f.border}`
                                    }`}
                                style={active === i ? { background: f.color } : {}}>
                                <span>{f.emoji}</span> {f.label}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-16 bg-blue-800 text-center">
                <Reveal>
                    <h2 className="text-3xl font-black text-white mb-3">See Our Campus in Person</h2>
                    <p className="text-blue-200 mb-8 text-sm">Schedule a campus tour or apply for admissions today.</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link href="/admissions">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                                className="px-7 py-3.5 rounded-xl bg-white text-blue-800 font-black text-sm shadow-xl flex items-center gap-2">
                                Apply for Admission <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-7 py-3.5 rounded-xl border-2 border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-all">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
