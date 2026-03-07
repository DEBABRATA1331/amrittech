"use client"

import { useState } from "react"
import studentsData from "@/data/students.json"
import teachersData from "@/data/teachers.json"
import { getMarks, getAttendanceForDate } from "@/lib/storage"
import { ChevronDown, ChevronUp, User } from "lucide-react"

type Student = typeof studentsData[0]

const CLASSES = ["1", "2", "3", "4", "5"]

export default function ClassesPage() {
    const [expanded, setExpanded] = useState<string | null>("1")
    const today = new Date().toISOString().split("T")[0]
    const allAttendance = getAttendanceForDate(today)

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-black text-gray-900">All Classes</h1>
            <p className="text-gray-500 text-sm -mt-2">View students, marks, and attendance for each class.</p>

            {CLASSES.map(cls => {
                const students = (studentsData as Student[]).filter(s => s.class === cls)
                const teacher = (teachersData as typeof teachersData[0][]).find(t => t.classAssigned === cls && t.role === "teacher")
                const present = students.filter(s => allAttendance[s.id]?.status === "present").length
                const isOpen = expanded === cls

                return (
                    <div key={cls} className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
                        <button
                            onClick={() => setExpanded(isOpen ? null : cls)}
                            className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center font-black text-white text-xl shrink-0">
                                {cls}
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-black text-gray-900">Class {cls} - Section A</p>
                                <p className="text-xs text-gray-400 font-medium">{teacher?.name ?? "No teacher"} • {students.length} students • {present}/{students.length} present today</p>
                            </div>
                            {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </button>

                        {isOpen && (
                            <div className="border-t border-gray-100 overflow-x-auto">
                                <table className="w-full min-w-[600px] text-sm">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left py-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                            {students[0]?.subjects.map(s => (
                                                <th key={s} className="text-center py-3 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.replace("S.Studies", "SSt")}</th>
                                            ))}
                                            <th className="text-center py-3 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Avg</th>
                                            <th className="text-center py-3 px-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Att.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(s => {
                                            const stored = getMarks(s.id)
                                            const scores = s.subjects.map(subj =>
                                                stored[subj]?.score ?? (s.defaultMarks as unknown as Record<string, number>)[subj] ?? 0
                                            )
                                            const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                                            const att = allAttendance[s.id]
                                            return (
                                                <tr key={s.id} className="border-t border-gray-50 hover:bg-gray-50">
                                                    <td className="py-3 px-4">
                                                        <p className="font-bold text-gray-800">{s.name}</p>
                                                        <p className="text-[10px] text-gray-400">Roll #{s.rollNo}</p>
                                                    </td>
                                                    {scores.map((score, i) => (
                                                        <td key={i} className="py-3 px-2 text-center">
                                                            <span className={`text-xs font-bold ${score >= 90 ? "text-emerald-600" : score >= 70 ? "text-blue-600" : score < 50 ? "text-red-600" : "text-gray-600"}`}>
                                                                {score}
                                                            </span>
                                                        </td>
                                                    ))}
                                                    <td className="py-3 px-2 text-center font-black text-gray-900 text-sm">{avg}</td>
                                                    <td className="py-3 px-2 text-center">
                                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${att?.status === "present" ? "bg-emerald-100 text-emerald-700"
                                                            : att?.status === "absent" ? "bg-red-100 text-red-700"
                                                                : "bg-gray-100 text-gray-500"
                                                            }`}>
                                                            {att?.status ?? "—"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
