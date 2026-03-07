"use client"

import { useSchoolAuth } from "@/context/school-auth-context"
import { getAttendanceForDate } from "@/lib/storage"
import studentsData from "@/data/students.json"
import teachersData from "@/data/teachers.json"
import Link from "next/link"
import { Users, BookOpen, TrendingUp, CheckCircle2, ChevronRight } from "lucide-react"

type Student = typeof studentsData[0]

const CLASSES = ["1", "2", "3", "4", "5"]

export default function PrincipalDashboardPage() {
    const { teacher: principal } = useSchoolAuth()
    if (!principal) return null

    const today = new Date().toISOString().split("T")[0]
    const allAttendance = getAttendanceForDate(today)
    const totalStudents = (studentsData as Student[]).length
    const presentTotal = Object.values(allAttendance).filter(a => a.status === "present").length
    const overallPct = totalStudents > 0 ? Math.round((presentTotal / totalStudents) * 100) : 0

    return (
        <div className="space-y-6">
            <div>
                <p className="text-gray-500 text-sm font-medium">Good morning,</p>
                <h1 className="text-2xl font-black text-gray-900">{principal.name}</h1>
                <p className="text-purple-600 text-sm font-bold">{principal.designation}</p>
            </div>

            {/* School Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total Students" value={totalStudents.toString()} color="bg-blue-500" />
                <StatCard icon={BookOpen} label="Classes" value="5" color="bg-purple-500" />
                <StatCard icon={CheckCircle2} label="Present Today" value={presentTotal.toString()} color="bg-emerald-500" />
                <StatCard icon={TrendingUp} label="Attendance %" value={`${overallPct}%`} color="bg-orange-500" />
            </div>

            {/* Today's school attendance */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-6 text-white">
                <p className="text-purple-200 text-xs font-bold uppercase tracking-widest">School-wide Attendance Today</p>
                <p className="text-4xl font-black mt-1">{overallPct}%</p>
                <p className="text-purple-200 text-sm mt-1">{presentTotal} of {totalStudents} students</p>
                <div className="mt-4 h-2.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${overallPct}%` }} />
                </div>
            </div>

            {/* Class-wise Summary */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-black text-gray-900">Class-wise Overview</h2>
                    <Link href="/principal/dashboard/classes" className="text-xs font-bold text-purple-600 hover:underline">
                        View All →
                    </Link>
                </div>
                <div className="space-y-3">
                    {CLASSES.map(cls => {
                        const students = (studentsData as Student[]).filter(s => s.class === cls)
                        const present = students.filter(s => allAttendance[s.id]?.status === "present").length
                        const teacher = (teachersData as typeof teachersData[0][]).find(t => t.classAssigned === cls && t.role === "teacher")
                        const pct = students.length > 0 ? Math.round((present / students.length) * 100) : 0
                        const avgScore = Math.round(students.reduce((sum, s) => {
                            const vals = Object.values(s.defaultMarks)
                            return sum + vals.reduce((a, b) => a + b, 0) / vals.length
                        }, 0) / (students.length || 1))
                        return (
                            <div key={cls} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center font-black text-purple-600">
                                    {cls}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold text-gray-900 text-sm">Class {cls}-A</p>
                                        <p className="text-xs font-bold text-gray-500">{present}/{students.length} present</p>
                                    </div>
                                    <p className="text-[10px] text-gray-400">{teacher?.name ?? "No teacher assigned"}</p>
                                    <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${pct}%` }} />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-gray-700">{avgScore}%</p>
                                    <p className="text-[10px] text-gray-400">avg score</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Teachers Overview */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4">Staff Overview</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                    {(teachersData as typeof teachersData[0][]).filter(t => t.role === "teacher").map(t => (
                        <div key={t.id} className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium">Class {t.classAssigned} • {t.experience}</p>
                            <p className="text-[10px] text-purple-600 font-bold mt-1">{t.subjects.join(", ")}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className={`w-8 h-8 ${color} rounded-xl flex items-center justify-center mb-2`}>
                <Icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="font-black text-gray-900 text-xl mt-0.5">{value}</p>
        </div>
    )
}
