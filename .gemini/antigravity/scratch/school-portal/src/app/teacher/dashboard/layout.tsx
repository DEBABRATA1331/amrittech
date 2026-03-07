"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useSchoolAuth } from "@/context/school-auth-context"
import { LayoutDashboard, ClipboardList, MessageSquare, QrCode, Activity, LogOut, ChevronRight, Menu, X, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
    { href: "/teacher/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/teacher/dashboard/marks", label: "Enter Marks", icon: ClipboardList },
    { href: "/teacher/dashboard/remarks", label: "Remarks", icon: MessageSquare },
    { href: "/teacher/dashboard/attendance", label: "Attendance", icon: QrCode },
    { href: "/teacher/dashboard/activities", label: "Activities", icon: Activity },
]

export default function TeacherDashboardLayout({ children }: { children: React.ReactNode }) {
    const { teacher, logout } = useSchoolAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        if (!teacher) router.replace("/teacher")
        else if (teacher.role === "principal") router.replace("/principal/dashboard")
    }, [teacher, router])

    if (!teacher) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 bg-slate-900 flex-col fixed top-0 left-0 h-full z-40">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-black text-white text-sm">Teacher Portal</p>
                            <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Staff Access</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 mx-4 mt-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Class Teacher</p>
                    <p className="text-white font-bold text-sm mt-0.5">{teacher.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Class {teacher.classAssigned}-{teacher.section}
                        </span>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href
                        return (
                            <Link key={href} href={href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${active ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "text-white/50 hover:bg-white/10 hover:text-white"
                                    }`}>
                                <Icon className="w-4 h-4 shrink-0" />
                                <span className="text-sm font-bold">{label}</span>
                                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4">
                    <button onClick={() => { logout(); router.push("/teacher") }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-bold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-white/10 flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-black text-sm">Teacher Portal</span>
                </div>
                <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25 }}
                        className="lg:hidden fixed inset-0 z-40 bg-slate-900 pt-14 overflow-y-auto">
                        <div className="p-4 space-y-1">
                            {navItems.map(({ href, label, icon: Icon }) => (
                                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${pathname === href ? "bg-emerald-500 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
                                        }`}>
                                    <Icon className="w-4 h-4" /><span className="font-bold">{label}</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
                <div className="max-w-5xl mx-auto p-4 lg:p-8">{children}</div>
            </main>
        </div>
    )
}
