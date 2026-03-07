"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Users, BookOpen, Phone, MapPin, Mail, Menu, X, ChevronRight,
  Star, Clock, Shield, Trophy, GraduationCap, ArrowUpRight, Award, Bookmark,
  ChevronDown, Sparkles, Globe, Utensils, Music, Monitor
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { FloatingNotification } from "@/components/floating-notification";
import { PortalSelection } from "@/components/portal-selection";

// ─── animated counter ─────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 25 });
  const [display, setDisplay] = useState("0");
  useEffect(() => { if (inView) motionVal.set(target); }, [inView, target, motionVal]);
  useEffect(() => spring.on("change", v => setDisplay(Math.round(v).toLocaleString())), [spring]);
  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── reveal wrapper ───────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" }) {
  const map = { up: { y: 40, x: 0 }, left: { y: 0, x: -40 }, right: { y: 0, x: 40 } };
  return (
    <motion.div initial={{ opacity: 0, ...map[direction] }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// ─── 3D tilt card ─────────────────────────────────────────────
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  return (
    <motion.div ref={ref}
      onMouseMove={e => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setRot({ x: ((e.clientY - r.top) / r.height - 0.5) * 10, y: ((e.clientX - r.left) / r.width - 0.5) * -10 });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      animate={{ rotateX: rot.x, rotateY: rot.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}>{children}</motion.div>
  );
}

// ─── data ─────────────────────────────────────────────────────
const navLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Facilities", href: "/facilities" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const stats = [
  { value: 3200, suffix: "+", label: "Students Enrolled", icon: Users, color: "text-blue-700", bg: "bg-blue-100" },
  { value: 180, suffix: "+", label: "Expert Faculty", icon: GraduationCap, color: "text-purple-700", bg: "bg-purple-100" },
  { value: 25, suffix: " Yrs", label: "of Excellence", icon: Trophy, color: "text-amber-700", bg: "bg-amber-100" },
  { value: 98, suffix: "%", label: "Board Pass Rate", icon: Star, color: "text-emerald-700", bg: "bg-emerald-100" },
];

const programs = [
  { id: "01", title: "Pre-Primary", grades: "Nursery – KG2", desc: "Play-based learning that sparks curiosity, communication, and social development.", color: "#dc2626", bg: "#fef2f2", hover: "hover:shadow-red-100" },
  { id: "02", title: "Primary School", grades: "Grade 1 – 5", desc: "Strong foundations in English, Mathematics, Science, and Social Studies.", color: "#1d4ed8", bg: "#eff6ff", hover: "hover:shadow-blue-100" },
  { id: "03", title: "Middle School", grades: "Grade 6 – 8", desc: "Critical thinking, lab science, coding, and project-based collaborative learning.", color: "#6d28d9", bg: "#f5f3ff", hover: "hover:shadow-purple-100" },
  { id: "04", title: "Senior Secondary", grades: "Grade 9 – 12", desc: "Science, Commerce & Arts with dedicated career counselling and mentorship.", color: "#047857", bg: "#ecfdf5", hover: "hover:shadow-green-100" },
];

const achievements = [
  { metric: 15, suffix: "+", label: "National Olympiad Medals", icon: Trophy },
  { metric: 100, suffix: "%", label: "NAAC A+ Accreditation", icon: Award },
  { metric: 4, suffix: "×", label: "Best School – Delhi", icon: Star },
  { metric: 100, suffix: "%", label: "University Placements", icon: Bookmark },
];

const news = [
  { tag: "Event", tagClass: "bg-blue-100 text-blue-700 border-blue-200", title: "Annual Sports Day 2026", date: "March 10, 2026", desc: "A celebration of athleticism and school spirit. All parents warmly invited." },
  { tag: "Exam", tagClass: "bg-red-100 text-red-700 border-red-200", title: "Board Exam Timetable Released", date: "March 5, 2026", desc: "Class 10 & 12 exam schedule is now live on the student portal." },
  { tag: "Admission", tagClass: "bg-green-100 text-green-700 border-green-200", title: "Admissions Open 2026–27", date: "March 1, 2026", desc: "Apply online for Nursery to Grade 11. Limited seats available." },
  { tag: "Holiday", tagClass: "bg-amber-100 text-amber-700 border-amber-200", title: "Holi Holiday Notice", date: "March 14, 2026", desc: "School will remain closed on March 14 for the Holi festival." },
];

export default function SchoolWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <FloatingNotification />

      {/* ── NAVBAR ───────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="relative w-12 h-12 shrink-0">
              <Image src="/school-logo.png" alt="Sunrise International School" fill className="object-contain rounded-full" />
            </motion.div>
            <div className="hidden sm:block">
              <p className="font-extrabold text-blue-900 leading-none text-sm tracking-wide">Sunrise International School</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-0.5">CBSE Affiliated · Est. 2001 · New Delhi</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href}
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
            {/* Portal nav link */}
            <Link href="/#portal"
              className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 relative group">
              <Sparkles className="w-3.5 h-3.5" />
              Portal
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/#portal">
              <button className="text-sm font-bold text-blue-700 hover:text-blue-800 px-4 py-2 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all">
                Staff Login
              </button>
            </Link>
            <Link href="/#portal">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="text-sm font-bold text-white px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-all shadow-md shadow-blue-700/30">
                Parent Login
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden">
              <div className="px-4 py-4">
                {/* portal highlight for mobile */}
                <Link href="/#portal" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-2xl bg-blue-50 border border-blue-200 mb-3">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700 font-black text-sm">School Portal</span>
                  <ChevronRight className="w-4 h-4 text-blue-400 ml-auto" />
                </Link>
                {navLinks.map((l, i) => (
                  <motion.div key={l.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={l.href} onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 border-b border-gray-50 text-gray-700 font-semibold text-sm hover:text-blue-700 transition-colors">
                      {l.label}
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 flex gap-2">
                  <Link href="/#portal" className="flex-1">
                    <button className="w-full text-blue-700 font-black py-3 rounded-xl border-2 border-blue-200 text-sm">Staff Login</button>
                  </Link>
                  <Link href="/#portal" className="flex-1">
                    <button className="w-full text-white font-black py-3 rounded-xl bg-blue-700 text-sm shadow-md">Parent Login</button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image src="/school-campus.png" alt="Sunrise International School Campus" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/88 via-blue-900/65 to-blue-800/30" />
        </motion.div>

        <motion.div style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-amber-300" />
                CBSE Affiliated · Est. 2001 · New Delhi
              </span>
            </motion.div>

            {["Sunrise", "International", "School"].map((word, i) => (
              <motion.div key={word}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.13, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <span className={`block font-black leading-[1.02] drop-shadow-xl ${word === "International" ? "text-cyan-300 text-[clamp(2.5rem,8vw,5rem)]" : "text-white text-[clamp(2.5rem,8vw,5rem)]"}`}>
                  {word}
                </span>
              </motion.div>
            ))}

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-blue-100 mt-5 mb-8 max-w-lg leading-relaxed">
              Empowering students with world-class education, strong values, and a passion for lifelong learning.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-3">
              <Link href="/#portal">
                <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-900 font-black text-sm shadow-2xl">
                  Access School Portal <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/admissions">
                <motion.button whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-900 font-black text-sm transition-colors shadow-lg">
                  Apply for Admission
                </motion.button>
              </Link>
              <a href="#about">
                <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
                  <ChevronDown className="w-4 h-4 animate-bounce" /> Explore
                </button>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t-4 border-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-3 px-4 md:px-6 py-4">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className={`text-xl md:text-2xl font-black ${s.color}`}><AnimatedCounter target={s.value} suffix={s.suffix} /></p>
                  <p className="text-[10px] md:text-xs text-gray-500">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <Reveal direction="left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 md:h-[470px] group">
                <Image src="/school-classroom.png" alt="Modern classroom" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-5 left-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100">
                  <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900">NAAC A+ Accredited</p>
                    <p className="text-[10px] text-gray-500">Highest possible rating</p>
                  </div>
                </motion.div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-5 right-5 bg-amber-400 rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
                  <p className="text-xs font-black text-amber-900">4× Best School Delhi</p>
                </motion.div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <span className="inline-block text-blue-700 font-bold tracking-widest text-xs uppercase mb-5 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50">About Our School</span>
              <h2 className="text-4xl md:text-[48px] font-black text-gray-900 mb-5 leading-tight">Building Tomorrow's<br /><span className="text-blue-700">Leaders</span> Since 2001</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">Sunrise International School is a CBSE-affiliated institution committed to holistic education. We blend academic excellence with values, creativity, and leadership development.</p>
              <p className="text-gray-500 mb-8 leading-relaxed text-sm">Our 5-acre campus features modern science labs, a 10,000-volume library, an arts block, sports complex, and a smart classroom ecosystem powered by Amrit Tech's ERP platform.</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Shield, label: "Safe Campus", text: "24/7 CCTV · AI gate-pass", color: "bg-blue-100 text-blue-700" },
                  { icon: BookOpen, label: "Modern Library", text: "10,000+ books & e-resources", color: "bg-purple-100 text-purple-700" },
                  { icon: GraduationCap, label: "Expert Faculty", text: "Qualified & experienced", color: "bg-amber-100 text-amber-700" },
                  { icon: Globe, label: "Global Exposure", text: "Exchange programmes", color: "bg-emerald-100 text-emerald-700" },
                ].map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }} whileHover={{ y: -4, boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)" }}
                    className="flex items-start gap-3 p-4 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 transition-all cursor-default">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link href="/about">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-blue-200 text-blue-700 font-bold text-sm hover:border-blue-400 hover:bg-blue-50 transition-all">
                  Learn More About Us <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ─────────────────────────────────────────── */}
      <section id="programs" className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Reveal>
              <span className="inline-block text-blue-700 font-bold tracking-widest text-xs uppercase mb-4 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50">Academic Programs</span>
            </Reveal>
            <Reveal delay={0.1}><h2 className="text-4xl md:text-5xl font-black text-gray-900">From Nursery to Class XII</h2></Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, boxShadow: "0 20px 48px -8px rgba(0,0,0,0.13)" }}
                onHoverStart={() => setHoveredProgram(i)}
                onHoverEnd={() => setHoveredProgram(null)}
                style={{ borderLeftWidth: 4, borderLeftColor: hoveredProgram === i ? p.color : "transparent" }}
                className="group rounded-3xl border-2 border-gray-100 bg-white p-7 transition-all cursor-pointer"
              >
                <motion.div whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }} transition={{ duration: 0.4 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white mb-5 shadow-md"
                  style={{ background: p.color }}>{p.id}</motion.div>
                <h3 className="text-xl font-black text-gray-900 mb-1">{p.title}</h3>
                <p className="text-xs font-bold mb-4" style={{ color: p.color }}>{p.grades}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                <Link href="/programs">
                  <motion.div animate={{ opacity: hoveredProgram === i ? 1 : 0, x: hoveredProgram === i ? 0 : -10 }}
                    className="mt-5 flex items-center gap-1 text-xs font-bold" style={{ color: p.color }}>
                    View details <ArrowUpRight className="w-3 h-3" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/programs">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl bg-blue-700 text-white font-black text-sm hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/25 flex items-center gap-2 mx-auto">
                View All Programs <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CAMPUS LIFE ──────────────────────────────────────── */}
      <section id="campus" className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Reveal>
                <span className="inline-block text-blue-700 font-bold tracking-widest text-xs uppercase mb-4 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50">Campus Life</span>
              </Reveal>
              <Reveal delay={0.1}><h2 className="text-4xl md:text-5xl font-black text-gray-900">Beyond Classrooms</h2></Reveal>
              <Reveal delay={0.15}><p className="text-gray-500 mt-3 max-w-lg">A thriving campus where students eat, play, create, and learn with the best facilities.</p></Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link href="/facilities">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 text-white font-black text-sm shadow-lg hover:bg-blue-800 transition-colors shrink-0">
                  Explore All Facilities <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: "🍽️", title: "Hygienic Canteen", sub: "FSSAI Certified · 500+ seats", img: "/school-canteen.png", color: "#f59e0b", light: "from-amber-400 to-orange-500", tag: "Nutrition", href: "/facilities" },
              { emoji: "🏆", title: "Sports Complex", sub: "Cricket · Football · Swimming", img: "/school-sports-ground.png", color: "#16a34a", light: "from-green-400 to-emerald-600", tag: "Athletics", href: "/facilities" },
              { emoji: "🎭", title: "Arts & Activities", sub: "Dance · Drama · Robotics · MUN", img: "/school-activities.png", color: "#7c3aed", light: "from-violet-400 to-purple-600", tag: "Creativity", href: "/facilities" },
              { emoji: "🖥️", title: "Smart Classrooms", sub: "75″ SMART Boards · Amrit Tech ERP", img: "/school-classroom.png", color: "#0369a1", light: "from-sky-400 to-blue-700", tag: "Technology", href: "/facilities" },
            ].map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
                style={{ height: 320 }}
              >
                <Link href={card.href} className="block h-full">
                  {/* image */}
                  <Image src={card.img} alt={card.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* hover color overlay */}
                  <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${card.color}, transparent)` }} />

                  {/* top tag */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-black text-white bg-gradient-to-r ${card.light} shadow-md`}>
                      {card.emoji} {card.tag}
                    </span>
                  </div>

                  {/* bottom text */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <motion.div
                      initial={{ y: 8, opacity: 0.8 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="transform transition-transform duration-300 group-hover:-translate-y-2"
                    >
                      <h3 className="text-lg font-black text-white mb-1">{card.title}</h3>
                      <p className="text-xs text-white/70 mb-3">{card.sub}</p>
                      <motion.div
                        className="flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: card.color === "#0369a1" ? "#38bdf8" : card.color === "#7c3aed" ? "#c4b5fd" : card.color === "#16a34a" ? "#4ade80" : "#fcd34d" }}>
                        View facility <ChevronRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* quick stats strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Utensils, label: "Canteen Meals/day", value: "2,400+", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
              { icon: Trophy, label: "Sports Facilities", value: "12+", color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
              { icon: Music, label: "Activity Clubs", value: "18+", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
              { icon: Monitor, label: "Smart Classrooms", value: "60", color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100" },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 ${stat.bg} ${stat.border} transition-all`}>
                <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className={`text-2xl font-black ${stat.color}`}><AnimatedCounter target={parseInt(stat.value.replace(/\D/g, ''))} suffix={stat.value.replace(/[0-9]/g, '')} /></p>
                  <p className="text-[10px] text-gray-500">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ─────────────────────────────────────── */}
      <section id="achievements" className="py-20 md:py-24 bg-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-12">
              <span className="inline-block text-cyan-300 font-bold tracking-widest text-xs uppercase mb-4 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-white/10">Our Track Record</span>
              <h2 className="text-4xl md:text-5xl font-black text-white">Why Families Choose Us</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((a, i) => (
              <motion.div key={a.label}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                whileHover={{ y: -8, scale: 1.04 }}
                className="rounded-3xl bg-white/10 border border-white/20 p-6 md:p-8 text-center backdrop-blur-sm hover:bg-white/20 transition-all group">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/25 transition-colors">
                  <a.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </motion.div>
                <p className="text-4xl md:text-5xl font-black text-white mb-2"><AnimatedCounter target={a.metric} suffix={a.suffix} /></p>
                <p className="text-xs md:text-sm text-blue-100 font-medium">{a.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ─────────────────────────────────────────────── */}
      <section id="news" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Reveal><span className="inline-block text-blue-700 font-bold tracking-widest text-xs uppercase mb-4 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50">Latest Updates</span></Reveal>
              <Reveal delay={0.1}><h2 className="text-4xl md:text-5xl font-black text-gray-900">Announcements</h2></Reveal>
            </div>
            <Reveal delay={0.2}>
              <Link href="/contact" className="text-blue-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Contact school <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {news.map((n, i) => (
              <motion.div key={n.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                whileHover={{ y: -5, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.1)" }}
                className="group rounded-3xl border-2 border-gray-100 bg-white p-6 md:p-7 hover:border-blue-200 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border ${n.tagClass}`}>{n.tag}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-gray-900 mb-2 text-base md:text-lg group-hover:text-blue-700 transition-colors">{n.title}</h3>
                    <p className="text-xs text-gray-400 mb-2 flex items-center gap-1.5"><Clock className="w-3 h-3" />{n.date}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{n.desc}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-blue-500 transition-colors mt-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTAL CARDS INTEGRATION ───────────────────────── */}
      <PortalSelection />

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section id="contact" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <Reveal direction="left">
              <span className="inline-block text-blue-700 font-bold tracking-widest text-xs uppercase mb-5 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50">Contact Us</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Get In Touch</h2>
              <div className="space-y-3">
                {[
                  { icon: MapPin, label: "Address", value: "14, Sunrise Marg, Sector 21, New Delhi – 110062" },
                  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                  { icon: Mail, label: "Email", value: "info@sunriseschool.edu.in" },
                  { icon: Clock, label: "Office Hours", value: "Mon–Sat: 8:00 AM – 4:30 PM" },
                ].map((item, i) => (
                  <motion.div key={item.label}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-sm text-gray-800 font-semibold">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.03 }}
                  className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 text-white font-black text-sm hover:bg-blue-800 transition-colors shadow-lg">
                  Send a Message <ChevronRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <TiltCard className="rounded-3xl border-2 border-gray-200 bg-white p-8 md:p-10 text-center shadow-xl hover:shadow-2xl transition-shadow">
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                  <div className="w-20 h-20 mx-auto mb-5 relative">
                    <Image src="/school-logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Admissions Open</h3>
                <p className="text-blue-700 font-bold mb-1 text-sm">2026–27 Academic Year</p>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Apply online for Nursery to Grade 11. Limited seats — early applications get priority consideration.</p>
                <Link href="/admissions">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-sm shadow-lg shadow-blue-700/30 transition-all">
                    Apply for Admission →
                  </motion.button>
                </Link>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["CBSE", "NAAC A+", "ISO 9001"].map(b => (
                    <div key={b} className="py-1.5 rounded-lg bg-blue-50 border border-blue-100">
                      <p className="text-xs font-bold text-blue-700">{b}</p>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-3 gap-8 border-b border-blue-800">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 relative shrink-0"><Image src="/school-logo.png" alt="Logo" fill className="object-contain" /></div>
              <div>
                <p className="font-black text-white text-sm">Sunrise International School</p>
                <p className="text-xs text-blue-300">CBSE · Est. 2001</p>
              </div>
            </div>
            <p className="text-sm text-blue-300 italic">&#34;Wisdom · Innovation · Character&#34;</p>
          </div>
          <div>
            <p className="text-white font-bold mb-4 text-sm">Quick Links</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-3">
              {[...navLinks, { label: "Portal", href: "/#portal" }, { label: "Admissions", href: "/admissions" }, { label: "News", href: "#news" }].map(l => (
                <Link key={l.label} href={l.href} className="text-xs text-blue-300 hover:text-white transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white font-bold mb-4 text-sm">Contact</p>
            <p className="text-xs text-blue-300 mb-1">📍 Sector 21, New Delhi – 110062</p>
            <p className="text-xs text-blue-300 mb-1">📞 +91 98765 43210</p>
            <p className="text-xs text-blue-300">✉️ info@sunriseschool.edu.in</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-blue-400">© 2026 Sunrise International School. All Rights Reserved.</p>
          <p className="text-xs text-blue-500">ERP by <a href="http://localhost:3002" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 font-bold">Amrit Tech Solution</a></p>
        </div>
      </footer>
    </div>
  );
}

