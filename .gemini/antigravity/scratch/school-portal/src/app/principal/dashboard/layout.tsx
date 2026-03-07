"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useSchoolAuth } from "@/context/school-auth-context"
import { LayoutDashboard, Users, Bell, LogOut, ChevronRight, Menu, X, GraduationCap, ShieldCheck, FileText, CreditCard } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
    { href: "/principal/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/principal/dashboard/classes", label: "Classes", icon: Users },
    { href: "/principal/dashboard/staff", label: "Staff Mgmt", icon: ShieldCheck },
    { href: "/principal/dashboard/finance", label: "Finances", icon: CreditCard },
    { href: "/principal/dashboard/reports", label: "Board Reports", icon: FileText },
    { href: "/principal/dashboard/security", label: "Security & Attendance", icon: Bell },
]

export default function PrincipalDashboardLayout({ children }: { children: React.ReactNode }) {
    const { teacher, logout } = useSchoolAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        if (!teacher) router.replace("/principal")
        else if (teacher.role === "teacher") router.replace("/teacher/dashboard")
    }, [teacher, router])

    if (!teacher) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" />
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-64 bg-slate-900 flex-col fixed top-0 left-0 h-full z-40">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-purple-500 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-black text-white text-sm">Principal Portal</p>
                            <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">Admin Access</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 mx-4 mt-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Principal</p>
                    <p className="text-white font-bold text-sm mt-0.5">{teacher.name}</p>
                    <p className="text-purple-300 text-[10px] font-medium">{teacher.email}</p>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href
                        return (
                            <Link key={href} href={href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${active ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : "text-white/50 hover:bg-white/10 hover:text-white"
                                    }`}>
                                <Icon className="w-4 h-4 shrink-0" />
                                <span className="text-sm font-bold">{label}</span>
                                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                            </Link>
                        )
                    })}
                </nav>
                <div className="p-4">
                    <button onClick={() => { logout(); router.push("/principal") }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all">
                        <LogOut className="w-4 h-4" /><span className="text-sm font-bold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-white/10 flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-black text-sm">Principal Portal</span>
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
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${pathname === href ? "bg-purple-500 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}>
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
