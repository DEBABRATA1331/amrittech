"use client";

import Link from "next/link";
import {
    Users, GraduationCap, School, Sparkles,
    ChevronRight, Shield, BarChart2, BookOpen, CheckCircle,
    Bell, FileText, CreditCard, MessageCircle, ClipboardList,
    TrendingUp, Building2, CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";


const portals = [
    {
        role: "Parent",
        title: "Parent Portal",
        tagline: "Stay close to your child's progress",
        description: "Track attendance in real time, view report cards, pay fees online, receive instant announcements, and chat directly with teachers.",
        href: "/parent/dashboard",
        icon: Users,
        accent: "#3b82f6",
        accentLight: "#eff6ff",
        accentBorder: "#bfdbfe",
        gradient: "from-blue-500 to-indigo-500",
        gradientSoft: "from-blue-50 to-indigo-50",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        badgeBg: "bg-blue-50 border-blue-200",
        badgeText: "text-blue-700",
        btnGradient: "from-blue-500 to-indigo-600",
        features: [
            { icon: BarChart2, label: "Live Attendance Tracking" },
            { icon: FileText, label: "Report Cards & Grades" },
            { icon: CreditCard, label: "Online Fee Payment" },
            { icon: MessageCircle, label: "Teacher Chat & Alerts" },
        ],
    },
    {
        role: "Teacher",
        title: "Teacher Portal",
        tagline: "Teach smarter every day",
        description: "Mark attendance with one tap, submit grades, assign homework, review student progress analytics, and stay in sync with parents.",
        href: "/teacher/dashboard",
        icon: GraduationCap,
        accent: "#8b5cf6",
        accentLight: "#f5f3ff",
        accentBorder: "#ddd6fe",
        gradient: "from-violet-500 to-purple-600",
        gradientSoft: "from-violet-50 to-purple-50",
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
        badgeBg: "bg-violet-50 border-violet-200",
        badgeText: "text-violet-700",
        btnGradient: "from-violet-500 to-purple-600",
        features: [
            { icon: ClipboardList, label: "One-tap Attendance" },
            { icon: BookOpen, label: "Grade Submission" },
            { icon: FileText, label: "Homework & Assignments" },
            { icon: TrendingUp, label: "Student Analytics" },
        ],
    },
    {
        role: "Principal",
        title: "Principal Portal",
        tagline: "Lead with insights & clarity",
        description: "View the full school at a glance — staff performance, student outcomes, fee collections, academic calendar, and board-level reports.",
        href: "/principal/dashboard",
        icon: School,
        accent: "#10b981",
        accentLight: "#ecfdf5",
        accentBorder: "#a7f3d0",
        gradient: "from-emerald-500 to-teal-600",
        gradientSoft: "from-emerald-50 to-teal-50",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        badgeBg: "bg-emerald-50 border-emerald-200",
        badgeText: "text-emerald-700",
        btnGradient: "from-emerald-500 to-teal-600",
        features: [
            { icon: Building2, label: "School-wide Dashboard" },
            { icon: Shield, label: "Staff & HR Management" },
            { icon: BarChart2, label: "Academic Analytics" },
            { icon: Bell, label: "Announcements & Circulars" },
        ],
    },
];

export function PortalSelection() {
    return (
        <section id="portal" className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-200/30 blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-indigo-200/30 blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">

                {/* Heading */}
                <div className="text-center mb-12 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white border border-blue-100 text-blue-600 shadow-sm mb-5"
                    >
                        <Sparkles className="w-3 h-3" />
                        Smart School ERP · Powered by Amrit Tech
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4"
                    >
                        Access Your
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600">
                            Secure Dashboard
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-slate-500 text-base"
                    >
                        Select your role to access your personalised, secure dashboard.
                    </motion.p>
                </div>

                {/* Portal Cards */}
                <div className="grid md:grid-cols-3 gap-6 w-full mt-4">
                    {portals.map((portal, i) => (
                        <motion.div
                            key={portal.role}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div
                                className="relative h-full rounded-3xl bg-white border border-slate-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col p-7 group"
                                style={{ boxShadow: `0 8px 32px -4px ${portal.accent}18` }}
                            >
                                {/* Soft gradient bg on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradientSoft} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Top color bar */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${portal.gradient} rounded-t-3xl`} />

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Badge + Icon row */}
                                    <div className="flex items-start justify-between mb-5">
                                        <motion.div
                                            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
                                            transition={{ duration: 0.4 }}
                                            className={`w-14 h-14 rounded-2xl ${portal.iconBg} flex items-center justify-center shadow-sm`}
                                        >
                                            <portal.icon className={`w-7 h-7 ${portal.iconColor}`} />
                                        </motion.div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${portal.badgeBg} ${portal.badgeText}`}>
                                            {portal.role}
                                        </span>
                                    </div>

                                    {/* Title & tagline */}
                                    <h3 className="text-2xl font-black text-slate-900 mb-1">{portal.title}</h3>
                                    <p className="text-xs font-semibold mb-4 italic" style={{ color: portal.accent }}>{portal.tagline}</p>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">{portal.description}</p>

                                    {/* Features */}
                                    <ul className="space-y-2 mb-7">
                                        {portal.features.map((f, fi) => (
                                            <motion.li
                                                key={f.label}
                                                initial={{ opacity: 0, x: -8 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 + fi * 0.05 }}
                                                className="flex items-center gap-2.5"
                                            >
                                                <div className={`w-6 h-6 rounded-lg ${portal.iconBg} flex items-center justify-center shrink-0`}>
                                                    <f.icon className={`w-3.5 h-3.5 ${portal.iconColor}`} />
                                                </div>
                                                <span className="text-xs text-slate-600 font-medium">{f.label}</span>
                                                <CheckCircle className="w-3 h-3 ml-auto shrink-0" style={{ color: portal.accent }} />
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Link href={portal.href} className="block w-full">
                                        <div
                                            className={`w-full py-3.5 rounded-2xl bg-gradient-to-r ${portal.btnGradient} text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 transition-all group/btn`}
                                            style={{ boxShadow: `0 6px 20px -4px ${portal.accent}50` }}
                                        >
                                            Enter {portal.role} Portal
                                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center gap-4 mt-12 justify-center"
                >
                    {[
                        { icon: Shield, text: "256-bit SSL Encryption" },
                        { icon: CheckCircle, text: "Role-based Access" },
                        { icon: Bell, text: "Real-time Notifications" },
                    ].map((b, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-100 shadow-sm backdrop-blur-sm">
                            <b.icon className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-xs font-semibold text-slate-500">{b.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
