"use client"

import { useAuth } from "@/context/auth-context"
import { getMergedMarks, getRemarks, getActivities } from "@/lib/storage"
import { TrendingUp, Award, BarChart3 } from "lucide-react"

export default function AcademicsPage() {
    const { student } = useAuth()
    if (!student) return null
    // Get live marks (teacher-updated take priority over defaults)
    const liveMarks = getMergedMarks(student.id, student.defaultMarks as unknown as Record<string, number>)
    const liveRemarks = getRemarks(student.id)
    const activities = getActivities(student.id)

    const gradeMap = (score: number) => {
        if (score >= 90) return { grade: "A+", color: "bg-emerald-500" }
        if (score >= 80) return { grade: "A", color: "bg-blue-500" }
        if (score >= 70) return { grade: "B+", color: "bg-yellow-500" }
        if (score >= 60) return { grade: "B", color: "bg-orange-400" }
        return { grade: "C", color: "bg-red-400" }
    }

    const subjectNames = student.subjects as string[]
    const avgScore = Math.round(
        subjectNames.reduce((sum, s) => sum + (liveMarks[s]?.score ?? 0), 0) / (subjectNames.length || 1)
    )

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black text-gray-900">Academics</h1>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                <StatCard label="Avg Score" value={`${avgScore}%`} icon={TrendingUp} color="text-blue-500" />
                <StatCard label="Champ Score" value={(student.champScore ?? 0).toString()} icon={Award} color="text-purple-500" />
                <StatCard label="Subjects" value={subjectNames.length.toString()} icon={BarChart3} color="text-emerald-500" />
            </div>

            {/* Subject Performance */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4">Subject-wise Performance</h2>
                <div className="space-y-4">
                    {subjectNames.map(subj => {
                        const m = liveMarks[subj]
                        const score = m?.score ?? 0
                        const { grade, color } = gradeMap(score)
                        return (
                            <div key={subj} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="font-bold text-gray-900">{subj}</p>
                                        {m?.fromStorage && (
                                            <p className="text-[10px] text-emerald-600 font-bold">Updated by teacher</p>
                                        )}
                                    </div>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm ${color}`}>
                                        {grade}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${score}%` }} />
                                    </div>
                                    <span className="text-sm font-black text-gray-900 w-16 text-right">{score}/{m?.max ?? 100}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Teacher Remarks */}
            {liveRemarks.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <h2 className="font-black text-gray-900 mb-4">Teacher Remarks</h2>
                    <div className="space-y-3">
                        {liveRemarks.map(r => (
                            <div key={r.id} className="p-4 bg-gray-50 rounded-2xl border-l-4 border-blue-400">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-bold text-gray-800 text-sm">{r.teacherName}</span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{r.subject}</span>
                                    <span className="ml-auto text-[10px] text-gray-400">{new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                                </div>
                                <p className="text-sm text-gray-600 italic">"{r.remark}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Activities if any */}
            {activities.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <h2 className="font-black text-gray-900 mb-4">Recent Activities</h2>
                    <div className="space-y-2">
                        {activities.slice(0, 5).map(a => (
                            <div key={a.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center font-black text-purple-600 text-sm">
                                    +{a.points}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{a.name}</p>
                                    <p className="text-xs text-emerald-600 font-bold">🏆 {a.result}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
            <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
            <p className="font-black text-gray-900 text-lg">{value}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</p>
        </div>
    )
}
