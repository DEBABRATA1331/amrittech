"use client"

import { useAuth } from "@/context/auth-context"
import { getActivities, getChampScore } from "@/lib/storage"
import { Trophy, Star, Zap } from "lucide-react"

const typeColors: Record<string, string> = {
    Academic: "bg-blue-100 text-blue-700", Sports: "bg-emerald-100 text-emerald-700",
    Cultural: "bg-orange-100 text-orange-700", Technical: "bg-purple-100 text-purple-700",
    Social: "bg-pink-100 text-pink-700", Leadership: "bg-yellow-100 text-yellow-700",
    General: "bg-gray-100 text-gray-700",
}

export default function ActivityPage() {
    const { student } = useAuth()
    if (!student) return null

    const activities = getActivities(student.id)
    const champScore = getChampScore(student.id, student.champScore ?? 0)
    const totalPoints = activities.reduce((sum, a) => sum + a.points, 0)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black text-gray-900">Activities & Champ Score</h1>

            {/* Champ Score Banner */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-6 text-white shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center">
                        <Star className="w-8 h-8 text-yellow-300" />
                    </div>
                    <div>
                        <p className="text-purple-200 text-xs font-bold uppercase tracking-widest">Champ Score</p>
                        <p className="text-5xl font-black">{champScore}</p>
                        <p className="text-purple-200 text-sm mt-1">{totalPoints} points from {activities.length} recorded activities</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
                    <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                    <p className="font-black text-gray-900 text-xl">{activities.length}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Activities</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
                    <Star className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                    <p className="font-black text-gray-900 text-xl">{totalPoints}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Points</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
                    <Zap className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <p className="font-black text-gray-900 text-xl">{new Set(activities.map(a => a.type)).size}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Categories</p>
                </div>
            </div>

            {/* Activities List */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4">Activity Records</h2>
                {activities.length === 0 ? (
                    <div className="text-center py-12">
                        <Trophy className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-400 text-sm">No activities recorded yet.</p>
                        <p className="text-gray-400 text-xs mt-1">Activities added by your teacher will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {activities.map(a => (
                            <div key={a.id} className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center font-black text-purple-600 shrink-0">
                                    {a.points}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-bold text-gray-900 text-sm">{a.name}</p>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[a.type] ?? "bg-gray-100 text-gray-600"}`}>{a.type}</span>
                                    </div>
                                    <p className="text-xs text-emerald-600 font-bold mt-0.5">🏆 {a.result}</p>
                                    <p className="text-[10px] text-gray-400">{new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-purple-600 font-black">+{a.points}</p>
                                    <p className="text-[10px] text-gray-400">pts</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
