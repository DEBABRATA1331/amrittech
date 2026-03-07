"use client"

import { useAuth } from "@/context/auth-context"
import { getRemarks } from "@/lib/storage"
import { MessageSquare, Quote } from "lucide-react"

const subjectColors: Record<string, string> = {
    English: "bg-blue-100 text-blue-700", Hindi: "bg-orange-100 text-orange-700",
    Mathematics: "bg-purple-100 text-purple-700", Science: "bg-emerald-100 text-emerald-700",
    "S.Studies": "bg-teal-100 text-teal-700", Computer: "bg-indigo-100 text-indigo-700",
    EVS: "bg-green-100 text-green-700", Art: "bg-pink-100 text-pink-700",
    General: "bg-gray-100 text-gray-700", Behaviour: "bg-yellow-100 text-yellow-700",
}

export default function RemarksPage() {
    const { student } = useAuth()
    if (!student) return null

    const remarks = getRemarks(student.id)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black text-gray-900">Teacher Remarks</h1>

            {remarks.length === 0 ? (
                <div className="text-center py-16">
                    <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 font-medium">No remarks yet.</p>
                    <p className="text-gray-400 text-xs mt-1">Remarks from your class teacher will appear here.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {remarks.map(r => (
                        <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <Quote className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                        <span className="font-bold text-gray-800 text-sm">{r.teacherName}</span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${subjectColors[r.subject] ?? "bg-gray-100 text-gray-600"}`}>
                                            {r.subject}
                                        </span>
                                        <span className="ml-auto text-[10px] text-gray-400 font-medium">
                                            {new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed italic">"{r.remark}"</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
