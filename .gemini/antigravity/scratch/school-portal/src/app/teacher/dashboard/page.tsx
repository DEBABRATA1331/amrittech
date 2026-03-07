"use client"

import { useSchoolAuth } from "@/context/school-auth-context"
import { getAttendanceForClass } from "@/lib/storage"
import studentsData from "@/data/students.json"
import { Users, CheckCircle2, XCircle, TrendingUp, QrCode } from "lucide-react"
import Link from "next/link"

type Student = typeof studentsData[0]

export default function TeacherDashboardPage() {
    const { teacher } = useSchoolAuth()
    if (!teacher) return null

    const students = (studentsData as Student[]).filter(s => s.class === teacher.classAssigned)
    const today = new Date().toISOString().split("T")[0]
    const todayAttendance = getAttendanceForClass(teacher.classAssigned, today)

    const presentToday = students.filter(s => todayAttendance[s.id]?.status === "present").length
    const absentToday = students.length - presentToday
    const attendancePct = students.length > 0 ? Math.round((presentToday / students.length) * 100) : 0

    const avgPerformance = students.reduce((sum, s) => {
        const scores = Object.values(s.defaultMarks)
        return sum + (scores.reduce((a, b) => a + b, 0) / scores.length)
    }, 0) / (students.length || 1)

    return (
        <div className="space-y-6">
            <div>
                <p className="text-gray-500 text-sm font-medium">Welcome back,</p>
                <h1 className="text-2xl font-black text-gray-900">{teacher.name}</h1>
                <p className="text-emerald-600 text-sm font-bold">Class {teacher.classAssigned}-{teacher.section} Teacher</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total Students" value={students.length.toString()} color="text-blue-500" />
                <StatCard icon={CheckCircle2} label="Present Today" value={presentToday.toString()} color="text-emerald-500" />
                <StatCard icon={XCircle} label="Absent Today" value={absentToday.toString()} color="text-red-500" />
                <StatCard icon={TrendingUp} label="Class Average" value={`${Math.round(avgPerformance)}%`} color="text-purple-500" />
            </div>

            {/* Today's Attendance Banner */}
            <div className={`rounded-3xl p-5 text-white ${attendancePct >= 80 ? "bg-gradient-to-br from-emerald-500 to-teal-600" : "bg-gradient-to-br from-amber-500 to-orange-600"}`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Today's Attendance</p>
                        <p className="text-4xl font-black mt-1">{attendancePct}%</p>
                        <p className="text-white/80 text-sm mt-1">{presentToday} of {students.length} students present</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4">
                        <QrCode className="w-8 h-8" />
                    </div>
                </div>
                <div className="mt-4 h-2.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all" style={{ width: `${attendancePct}%` }} />
                </div>
            </div>

            {/* Class Roster */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-black text-gray-900">Class {teacher.classAssigned} Roster</h2>
                    <Link href="/teacher/dashboard/marks" className="text-xs font-bold text-emerald-600 hover:underline">
                        Enter Marks →
                    </Link>
                </div>
                <div className="space-y-2">
                    {students.map(s => {
                        const att = todayAttendance[s.id]
                        const avgScore = Math.round(Object.values(s.defaultMarks).reduce((a, b) => a + b, 0) / Object.values(s.defaultMarks).length)
                        return (
                            <div key={s.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0">
                                    {s.rollNo}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 text-sm">{s.name}</p>
                                    <p className="text-[10px] text-gray-400 font-medium">{s.father.name}'s child</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-gray-700">{avgScore}%</p>
                                    <p className="text-[10px] text-gray-400">avg</p>
                                </div>
                                <span className={`w-2. h-2.5 w-2.5 rounded-full ${att?.status === "present" ? "bg-emerald-500" : "bg-gray-300"}`} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="font-black text-gray-900 text-xl mt-0.5">{value}</p>
        </div>
    )
}
