"use client"

import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { BookOpen, Activity, CreditCard, Bell, MessageSquare, Users, Calendar, QrCode, TrendingUp, Award } from "lucide-react"
import { getMergedMarks, getChampScore } from "@/lib/storage"

export default function DashboardPage() {
    const { student, parentRole } = useAuth()
    if (!student) return null

    const parent = parentRole === "father" ? student.father : student.mother
    const now = new Date()
    const hour = now.getHours()
    const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening"

    const liveMarks = getMergedMarks(student.id, student.defaultMarks)
    const subjectNames = student.subjects
    const avgScore = Math.round(
        subjectNames.reduce((sum, s) => sum + (liveMarks[s]?.score ?? 0), 0) / (subjectNames.length || 1)
    )
    const champScore = getChampScore(student.id, student.champScore ?? 0)

    const quickLinks = [
        { href: "/parent/dashboard/academics", label: "Academics", icon: BookOpen, color: "bg-blue-500", desc: "Grades & reports" },
        { href: "/parent/dashboard/activity", label: "Activities", icon: Activity, color: "bg-purple-500", desc: "Champ Score & more" },
        { href: "/parent/dashboard/finance", label: "Finance", icon: CreditCard, color: "bg-emerald-500", desc: "Fees & payments" },
        { href: "/parent/dashboard/notices", label: "Notices", icon: Bell, color: "bg-orange-500", desc: "School notices" },
        { href: "/parent/dashboard/remarks", label: "Remarks", icon: MessageSquare, color: "bg-pink-500", desc: "From teachers" },
        { href: "/parent/dashboard/teachers", label: "Teachers", icon: Users, color: "bg-teal-500", desc: "Contact info" },
        { href: "/parent/dashboard/timetable", label: "Timetable", icon: Calendar, color: "bg-indigo-500", desc: "Weekly schedule" },
        { href: "/parent/dashboard/tracker", label: "QR Tracker", icon: QrCode, color: "bg-red-500", desc: "Live location" },
    ]

    return (
        <div className="space-y-6">
            <div>
                <p className="text-gray-500 text-sm font-medium">{greeting},</p>
                <h1 className="text-2xl font-black text-gray-900">{parent.name} <span className="text-blue-600">({parentRole})</span></h1>
            </div>

            {/* Student Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-2xl shadow-blue-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Your Child</p>
                        <h2 className="text-2xl font-black mt-1">{student.name}</h2>
                        <p className="text-blue-200 text-sm mt-0.5">Class {student.class}-{student.section} • Roll #{student.rollNo}</p>
                        <p className="text-blue-200 text-xs mt-1">{student.school}</p>
                    </div>
                    <div className="bg-white/20 rounded-2xl px-4 py-5 text-center">
                        <p className="text-2xl font-black">{avgScore}%</p>
                        <p className="text-blue-200 text-[10px] font-bold uppercase">Avg Score</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6">
                    <Stat label="Subjects" value={subjectNames.length.toString()} />
                    <Stat label="Champ Score" value={champScore.toString()} />
                    <Stat label="Class" value={student.class} />
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="font-black text-gray-900 mb-4">Quick Access</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {quickLinks.map(({ href, label, icon: Icon, color, desc }) => (
                        <Link key={href} href={href}
                            className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-lg transition-all group">
                            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <p className="font-bold text-gray-900 text-sm">{label}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{desc}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Subject Performance */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" /> Subject Performance
                </h2>
                <div className="space-y-3">
                    {subjectNames.slice(0, 5).map(subj => {
                        const m = liveMarks[subj]
                        const score = m?.score ?? 0
                        return (
                            <div key={subj} className="flex items-center gap-3">
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-bold text-gray-700">{subj}</span>
                                        <span className="text-sm font-black text-gray-900">{score}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${score}%` }} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-white/10 rounded-2xl p-3 text-center">
            <p className="text-xl font-black">{value}</p>
            <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider mt-0.5">{label}</p>
        </div>
    )
}
