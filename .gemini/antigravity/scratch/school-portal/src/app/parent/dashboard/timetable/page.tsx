"use client"

import { useAuth } from "@/context/auth-context"
import { Clock, Calendar } from "lucide-react"

// Static timetable based on class
const TIMETABLES: Record<string, Record<string, string[]>> = {
    default: {
        Monday: ["English", "Mathematics", "Hindi", "Science", "S.Studies", "Computer"],
        Tuesday: ["Hindi", "English", "Mathematics", "Science", "Computer", "S.Studies"],
        Wednesday: ["Mathematics", "Science", "English", "S.Studies", "Hindi", "Computer"],
        Thursday: ["Science", "Hindi", "Computer", "English", "Mathematics", "S.Studies"],
        Friday: ["S.Studies", "Computer", "Science", "Mathematics", "English", "Hindi"],
        Saturday: ["Hindi", "Art", "Physical Ed.", "Moral Ed.", "Music", "Library"],
    },
    "1": {
        Monday: ["English", "Mathematics", "Hindi", "EVS", "Art", "Story Time"],
        Tuesday: ["Hindi", "English", "Mathematics", "EVS", "Art", "Games"],
        Wednesday: ["Mathematics", "Hindi", "English", "EVS", "Art", "Physical Ed."],
        Thursday: ["EVS", "Hindi", "English", "Mathematics", "Art", "Music"],
        Friday: ["Art", "English", "Hindi", "Mathematics", "EVS", "Library"],
        Saturday: ["Hindi", "Art", "Physical Ed.", "English", "Games", "Music"],
    },
}

const PERIODS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"]
const PERIOD_LABELS = ["Period 1", "Period 2", "Period 3", "Period 4", "Period 5", "Period 6"]

const SUBJECT_COLORS: Record<string, string> = {
    English: "bg-blue-100 text-blue-800", Hindi: "bg-orange-100 text-orange-800",
    Mathematics: "bg-purple-100 text-purple-800", Science: "bg-emerald-100 text-emerald-800",
    "S.Studies": "bg-teal-100 text-teal-800", Computer: "bg-indigo-100 text-indigo-800",
    EVS: "bg-green-100 text-green-800", Art: "bg-pink-100 text-pink-800",
    "Physical Ed.": "bg-yellow-100 text-yellow-800", Music: "bg-rose-100 text-rose-800",
    Library: "bg-gray-100 text-gray-700", "Story Time": "bg-amber-100 text-amber-800",
    Games: "bg-lime-100 text-lime-800", "Moral Ed.": "bg-cyan-100 text-cyan-800",
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function TimetablePage() {
    const { student } = useAuth()
    if (!student) return null

    const timetable = TIMETABLES[student.class] ?? TIMETABLES.default
    const todayName = new Date().toLocaleDateString("en-IN", { weekday: "long" })
    const todaySchedule = timetable[todayName] ?? timetable["Monday"]

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black text-gray-900">Class Timetable</h1>

            {/* Today's Schedule */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" /> Today — {todayName}
                </h2>
                <div className="space-y-2">
                    {todaySchedule.map((subj, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                            <div className="text-right w-14 shrink-0">
                                <p className="text-xs font-black text-gray-500">{PERIODS[i]}</p>
                            </div>
                            <div className="w-px h-8 bg-gray-200 shrink-0" />
                            <span className={`text-sm font-bold px-3 py-1 rounded-xl ${SUBJECT_COLORS[subj] ?? "bg-gray-100 text-gray-700"}`}>
                                {subj}
                            </span>
                            <p className="text-[10px] text-gray-400 ml-auto">{PERIOD_LABELS[i]}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Full Weekly Timetable */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm overflow-x-auto">
                <h2 className="font-black text-gray-900 mb-4">Full Weekly Timetable</h2>
                <table className="w-full min-w-[500px] text-sm">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left pb-2 text-xs font-bold text-gray-400 uppercase pr-3">Day</th>
                            {PERIOD_LABELS.map(p => (
                                <th key={p} className="text-center pb-2 text-[10px] font-bold text-gray-400 uppercase px-1">{p.replace("Period ", "P")}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {DAYS.map(day => (
                            <tr key={day} className={`border-b border-gray-50 last:border-0 ${day === todayName ? "bg-blue-50" : ""}`}>
                                <td className="py-2 pr-3 font-bold text-gray-700 text-xs">{day.slice(0, 3)}</td>
                                {(timetable[day] ?? []).map((subj, i) => (
                                    <td key={i} className="py-2 px-1 text-center">
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-lg ${SUBJECT_COLORS[subj] ?? "bg-gray-100 text-gray-700"}`}>
                                            {subj.split(".")[0].slice(0, 4)}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
