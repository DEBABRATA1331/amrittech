"use client"

import { useState, useEffect } from "react"
import { useSchoolAuth } from "@/context/school-auth-context"
import { getActivities, addActivity } from "@/lib/storage"
import studentsData from "@/data/students.json"
import { Trophy, Plus, Star, ChevronDown } from "lucide-react"

type Student = typeof studentsData[0]

const ACTIVITY_TYPES = ["Academic", "Sports", "Cultural", "Technical", "Social", "Leadership"]

export default function ActivitiesPage() {
    const { teacher } = useSchoolAuth()
    if (!teacher) return null

    const students = (studentsData as Student[]).filter(s => s.class === teacher.classAssigned)
    const [selectedStudent, setSelectedStudent] = useState<Student>(students[0])
    const [activities, setActivities] = useState(getActivities(selectedStudent?.id ?? ""))
    const [form, setForm] = useState({ name: "", type: "Academic", result: "", points: "50" })
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (selectedStudent) setActivities(getActivities(selectedStudent.id))
    }, [selectedStudent])

    const handleAdd = async () => {
        if (!form.name || !form.result) return
        setSaving(true)
        addActivity(selectedStudent.id, {
            name: form.name,
            type: form.type,
            result: form.result,
            points: parseInt(form.points) || 50,
            date: new Date().toISOString().split("T")[0],
            teacherId: teacher.id,
        })
        setActivities(getActivities(selectedStudent.id))
        setForm({ name: "", type: "Academic", result: "", points: "50" })
        setSaving(false)
    }

    const typeColors: Record<string, string> = {
        Academic: "bg-blue-100 text-blue-700", Sports: "bg-emerald-100 text-emerald-700",
        Cultural: "bg-orange-100 text-orange-700", Technical: "bg-purple-100 text-purple-700",
        Social: "bg-pink-100 text-pink-700", Leadership: "bg-yellow-100 text-yellow-700",
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black text-gray-900">Activities & Champ Score</h1>

            {/* Student selector */}
            <div className="flex gap-2 flex-wrap">
                {students.map(s => (
                    <button key={s.id} onClick={() => { setSelectedStudent(s); setActivities(getActivities(s.id)) }}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${selectedStudent.id === s.id ? "bg-emerald-500 text-white shadow-lg" : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300"
                            }`}>
                        {s.name.split(" ")[0]}
                    </button>
                ))}
            </div>

            {/* Add Activity Form */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4">Add Activity for {selectedStudent?.name}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Activity Name</label>
                        <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                            placeholder="e.g. Science Quiz, Cricket Match"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Category</label>
                        <div className="relative">
                            <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                                className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                                {ACTIVITY_TYPES.map(t => <option key={t}>{t}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Result / Achievement</label>
                        <input value={form.result} onChange={e => setForm(p => ({ ...p, result: e.target.value }))}
                            placeholder="e.g. Gold Medal, 1st Place"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Champ Points (0–200)</label>
                        <input type="number" min={0} max={200} value={form.points} onChange={e => setForm(p => ({ ...p, points: e.target.value }))}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                    </div>
                </div>
                <button onClick={handleAdd} disabled={!form.name || !form.result || saving}
                    className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-black rounded-2xl py-3 flex items-center justify-center gap-2 transition-all">
                    <Plus className="w-4 h-4" />
                    Add Activity
                </button>
            </div>

            {/* Activities list */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4">Activity Record ({activities.length})</h2>
                {activities.length === 0 ? (
                    <div className="text-center py-8">
                        <Trophy className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm">No activities recorded yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {activities.map(a => (
                            <div key={a.id} className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-100 rounded-2xl">
                                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center font-black text-purple-600 shrink-0">
                                    {a.points}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-bold text-gray-900 text-sm">{a.name}</p>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[a.type] || "bg-gray-100 text-gray-600"}`}>{a.type}</span>
                                    </div>
                                    <p className="text-xs text-emerald-600 font-bold mt-0.5">🏆 {a.result}</p>
                                    <p className="text-[10px] text-gray-400">{new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
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
