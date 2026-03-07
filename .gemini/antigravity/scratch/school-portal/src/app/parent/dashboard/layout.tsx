"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import {
    LayoutDashboard, BookOpen, Activity, CreditCard,
    Bell, MessageSquare, Users, Calendar, IdCard, LogOut,
    ChevronRight, Menu, X, Sun
} from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
    { href: "/parent/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "text-blue-600", bg: "bg-blue-50" },
    { href: "/parent/dashboard/academics", label: "Academics", icon: BookOpen, color: "text-violet-600", bg: "bg-violet-50" },
    { href: "/parent/dashboard/activity", label: "Activities", icon: Activity, color: "text-purple-600", bg: "bg-purple-50" },
    { href: "/parent/dashboard/finance", label: "Finance", icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
    { href: "/parent/dashboard/notices", label: "Notices", icon: Bell, color: "text-orange-600", bg: "bg-orange-50" },
    { href: "/parent/dashboard/remarks", label: "Remarks", icon: MessageSquare, color: "text-pink-600", bg: "bg-pink-50" },
    { href: "/parent/dashboard/teachers", label: "Teachers", icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
    { href: "/parent/dashboard/timetable", label: "Timetable", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
    { href: "/parent/dashboard/tracker", label: "Student ID", icon: IdCard, color: "text-red-600", bg: "bg-red-50" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { student, parentRole, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        if (!student) router.replace("/parent")
    }, [student, router])

    if (!student) return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
    )

    const parent = parentRole === "father" ? student.father : student.mother
    const handleLogout = () => { logout(); router.push("/parent") }

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="p-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-100 shadow-sm bg-white flex items-center justify-center">
                        <Sun className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="font-black text-slate-900 text-sm leading-tight">Parent Portal</p>
                        <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">Sunrise Int&apos;l School</p>
                    </div>
                </div>
            </div>

            {/* Parent info card */}
            <div className="mx-3 mt-4 p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-black text-sm">
                        {parent.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-black text-sm truncate">{parent.name}</p>
                        <p className="text-blue-200 text-[10px] font-bold capitalize">{parentRole}</p>
                    </div>
                </div>
                <div className="pt-2 border-t border-white/20">
                    <p className="text-blue-200 text-[10px] mb-0.5">Student</p>
                    <p className="text-white text-xs font-black">{student.name}</p>
                    <p className="text-blue-200 text-[10px]">Class {student.class}-{student.section} · Roll #{student.rollNo}</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {navItems.map(({ href, label, icon: Icon, color, bg }) => {
                    const active = pathname === href
                    return (
                        <Link key={href} href={href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all group ${active
                                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${active ? "bg-white/20" : bg}`}>
                                <Icon className={`w-3.5 h-3.5 ${active ? "text-white" : color}`} />
                            </div>
                            <span className="text-sm font-bold">{label}</span>
                            {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                        </Link>
                    )
                })}
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-slate-100">
                <button onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all">
                    <div className="w-7 h-7 rounded-xl bg-red-50 flex items-center justify-center">
                        <LogOut className="w-3.5 h-3.5 text-red-500" />
                    </div>
                    <span className="text-sm font-bold">Logout</span>
                </button>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 bg-white flex-col fixed top-0 left-0 h-full z-40 border-r border-slate-100 shadow-sm">
                <SidebarContent />
            </aside>

            {/* Mobile header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Sun className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <p className="font-black text-slate-900 text-sm leading-none">Parent Portal</p>
                        <p className="text-blue-500 text-[9px] font-bold uppercase tracking-widest">Sunrise School</p>
                    </div>
                </div>
                <button onClick={() => setMobileOpen(!mobileOpen)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
                    {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
            </div>

            {/* Mobile nav drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="lg:hidden fixed inset-0 z-40 bg-white pt-14 overflow-y-auto"
                    >
                        <SidebarContent />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content */}
            <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
                <div className="max-w-5xl mx-auto p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
