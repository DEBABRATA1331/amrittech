"use client"

import { useAuth } from "@/context/auth-context"
import teachersData from "@/data/teachers.json"
import { Phone, Mail, BookOpen, GraduationCap } from "lucide-react"

export default function TeachersPage() {
    const { student } = useAuth()
    if (!student) return null

    // Show the class teacher for the student's class
    const classTeacher = (teachersData as typeof teachersData[0][]).find(
        t => t.classAssigned === student.class && t.role === "teacher"
    )
    const principal = (teachersData as typeof teachersData[0][]).find(t => t.role === "principal")

    const contacts = [classTeacher, principal].filter(Boolean)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black text-gray-900">Teachers & Staff</h1>

            <div className="space-y-4">
                {contacts.map(t => t && (
                    <div key={t.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shrink-0">
                                {t.name.split(" ").filter((w: string) => /[A-Z]/.test(w[0])).slice(-2).map((w: string) => w[0]).join("")}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-black text-gray-900">{t.name}</h3>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{t.designation}</span>
                                </div>
                                {t.role === "teacher" && (
                                    <p className="text-sm text-gray-500 font-medium mt-0.5">
                                        Class {t.classAssigned}-{t.section} • {t.experience}
                                    </p>
                                )}
                                <p className="text-xs text-gray-400 mt-0.5">{t.qualifications}</p>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {t.subjects.map((s: string) => (
                                        <span key={s} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg bg-gray-100 text-gray-600">
                                            <BookOpen className="w-2.5 h-2.5" />{s}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-4 space-y-2">
                                    <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline font-medium">
                                        <Mail className="w-4 h-4" />{t.email}
                                    </a>
                                    <a href={`tel:${t.mobile}`} className="flex items-center gap-2 text-sm text-emerald-600 hover:underline font-medium">
                                        <Phone className="w-4 h-4" />{t.mobile}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
