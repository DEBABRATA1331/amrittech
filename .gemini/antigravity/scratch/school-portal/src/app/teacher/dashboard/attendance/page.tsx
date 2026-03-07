"use client"

import { useState, useEffect } from "react"
import { useSchoolAuth } from "@/context/school-auth-context"
import { getAttendanceForClass, markAttendance, markAbsent } from "@/lib/storage"
import studentsData from "@/data/students.json"
import { CheckCircle2, XCircle, QrCode, RefreshCw } from "lucide-react"

type Student = typeof studentsData[0]

export default function AttendancePage() {
    const { teacher } = useSchoolAuth()
    if (!teacher) return null

    const students = (studentsData as Student[]).filter(s => s.class === teacher.classAssigned)
    const today = new Date().toISOString().split("T")[0]
    const [attendance, setAttendance] = useState(getAttendanceForClass(teacher.classAssigned, today))

    const refresh = () => setAttendance(getAttendanceForClass(teacher.classAssigned, today))

    const handleMarkPresent = (studentId: string) => {
        markAttendance(studentId, teacher.classAssigned, "manual")
        refresh()
    }
    const handleMarkAbsent = (studentId: string) => {
        markAbsent(studentId, teacher.classAssigned)
        refresh()
    }

    const presentCount = students.filter(s => attendance[s.id]?.status === "present").length

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black text-gray-900">Attendance</h1>
                <button onClick={refresh} className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
                    <RefreshCw className="w-4 h-4" /> Refresh
                </button>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 text-white">
                <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
                <div className="flex items-end gap-6 mt-2">
                    <div>
                        <p className="text-4xl font-black">{presentCount}/{students.length}</p>
                        <p className="text-emerald-200 text-sm">Students Present</p>
                    </div>
                    <div className="bg-white/15 rounded-2xl px-4 py-2 flex items-center gap-2">
                        <QrCode className="w-4 h-4" />
                        <span className="text-sm font-bold">
                            {students.filter(s => attendance[s.id]?.method === "qr").length} via QR scan
                        </span>
                    </div>
                </div>
                <div className="mt-4 h-2.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${students.length > 0 ? (presentCount / students.length) * 100 : 0}%` }} />
                </div>
            </div>

            {/* Student attendance list */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4">Class {teacher.classAssigned} Attendance Log</h2>
                <div className="space-y-2">
                    {students.map(s => {
                        const att = attendance[s.id]
                        const isPresent = att?.status === "present"
                        const isAbsent = att?.status === "absent"
                        return (
                            <div key={s.id} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${isPresent ? "bg-emerald-50 border-emerald-100" : isAbsent ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-100"
                                }`}>
                                <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center font-black text-gray-500 text-sm shrink-0">
                                    {s.rollNo}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 text-sm">{s.name}</p>
                                    {att && (
                                        <p className="text-[10px] text-gray-400 font-medium">
                                            {isPresent ? `In at ${att.time} · via ${att.method}` : "Marked absent"}
                                        </p>
                                    )}
                                    {!att && <p className="text-[10px] text-gray-400 font-medium">Not marked yet</p>}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleMarkPresent(s.id)}
                                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isPresent ? "bg-emerald-500 text-white shadow-md" : "bg-gray-100 text-gray-400 hover:bg-emerald-100 hover:text-emerald-600"
                                            }`}
                                        title="Mark Present"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleMarkAbsent(s.id)}
                                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isAbsent ? "bg-red-500 text-white shadow-md" : "bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600"
                                            }`}
                                        title="Mark Absent"
                                    >
                                        <XCircle className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                    QR-based attendance is auto-synced from the School Scanner tool
                </p>
            </div>
        </div>
    )
}
