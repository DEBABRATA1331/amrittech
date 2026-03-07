"use client"

import { useState, useEffect } from "react"
import { useSchoolAuth } from "@/context/school-auth-context"
import { getMarks, setMark } from "@/lib/storage"
import studentsData from "@/data/students.json"
import { Save, CheckCircle2, ChevronDown, ClipboardList } from "lucide-react"

type Student = typeof studentsData[0]

export default function MarksPage() {
    const { teacher } = useSchoolAuth()
    if (!teacher) return null

    const students = (studentsData as Student[]).filter(s => s.class === teacher.classAssigned)
    const [selectedStudent, setSelectedStudent] = useState<Student>(students[0])
    const [marksInput, setMarksInput] = useState<Record<string, string>>({})
    const [examName, setExamName] = useState("Mid-Term Exam")
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (!selectedStudent) return
        const stored = getMarks(selectedStudent.id)
        const initial: Record<string, string> = {}
        selectedStudent.subjects.forEach(subj => {
            initial[subj] = stored[subj]
                ? stored[subj].score.toString()
                : selectedStudent.defaultMarks[subj as keyof typeof selectedStudent.defaultMarks]?.toString() ?? ""
        })
        setMarksInput(initial)
        setSaved(false)
    }, [selectedStudent])

    const handleSave = () => {
        selectedStudent.subjects.forEach(subj => {
            const score = parseInt(marksInput[subj] || "0")
            if (!isNaN(score)) {
                setMark(selectedStudent.id, subj, {
                    score,
                    max: 100,
                    examName,
                    date: new Date().toISOString().split("T")[0],
                    teacherId: teacher.id,
                    teacherName: teacher.name,
                })
            }
        })
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    const currentStored = getMarks(selectedStudent.id)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black text-gray-900">Enter Marks</h1>
            <p className="text-gray-500 text-sm -mt-4">Enter marks for Class {teacher.classAssigned}-{teacher.section} students</p>

            {/* Exam selector */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Exam:</label>
                <div className="relative">
                    <select
                        value={examName}
                        onChange={e => setExamName(e.target.value)}
                        className="appearance-none bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold rounded-xl px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                        <option>Unit Test 1</option>
                        <option>Unit Test 2</option>
                        <option>Mid-Term Exam</option>
                        <option>Final Exam</option>
                        <option>Class Test</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-600 pointer-events-none" />
                </div>
            </div>

            {/* Student selector */}
            <div className="flex gap-2 flex-wrap">
                {students.map(s => (
                    <button
                        key={s.id}
                        onClick={() => setSelectedStudent(s)}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${selectedStudent.id === s.id
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                            : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300"
                            }`}
                    >
                        {s.name.split(" ")[0]}
                    </button>
                ))}
            </div>

            {/* Marks Entry */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="font-black text-gray-900">{selectedStudent.name}</h2>
                        <p className="text-gray-400 text-xs font-medium">Roll #{selectedStudent.rollNo} · {examName}</p>
                    </div>
                    {saved && (
                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs font-bold">Saved!</span>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    {selectedStudent.subjects.map(subj => {
                        const val = marksInput[subj] ?? ""
                        const score = parseInt(val)
                        const isUpdated = !!currentStored[subj]
                        return (
                            <div key={subj} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-gray-800 text-sm">{subj}</p>
                                        {isUpdated && (
                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600">Updated</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={val}
                                        onChange={e => setMarksInput(prev => ({ ...prev, [subj]: e.target.value }))}
                                        className={`w-20 text-center font-black border rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${!isNaN(score) && score >= 90 ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                            : !isNaN(score) && score >= 70 ? "border-blue-300 bg-blue-50 text-blue-700"
                                                : !isNaN(score) && score < 50 ? "border-red-300 bg-red-50 text-red-700"
                                                    : "border-gray-200 bg-white text-gray-900"
                                            }`}
                                    />
                                    <span className="text-gray-400 text-sm font-bold">/ 100</span>
                                </div>
                                {!isNaN(score) && (
                                    <div className="w-12 text-right">
                                        <span className={`text-xs font-black ${score >= 90 ? "text-emerald-600" : score >= 70 ? "text-blue-600" : score >= 50 ? "text-orange-600" : "text-red-600"}`}>
                                            {score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B+" : score >= 60 ? "B" : score >= 50 ? "C" : "D"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <button
                    onClick={handleSave}
                    className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl py-4 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-200"
                >
                    <Save className="w-5 h-5" />
                    Save Marks for {selectedStudent.name}
                </button>

                <p className="text-center text-xs text-gray-400 font-medium mt-3">
                    Saved marks are immediately visible to parents in the Parent Portal
                </p>
            </div>

            {/* All students summary */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-emerald-600" />
                    Class Marks Summary
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left pb-2 text-xs font-bold text-gray-400 uppercase pr-4">Student</th>
                                {students[0]?.subjects.map(s => (
                                    <th key={s} className="text-center pb-2 text-xs font-bold text-gray-400 uppercase px-2">{s.split(".")[0]}</th>
                                ))}
                                <th className="text-center pb-2 text-xs font-bold text-gray-400 uppercase px-2">Avg</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => {
                                const stored = getMarks(s.id)
                                const scores = s.subjects.map(subj =>
                                    stored[subj]?.score ?? (s.defaultMarks as unknown as Record<string, number>)[subj] ?? 0
                                )
                                const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                                return (
                                    <tr key={s.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                                        <td className="py-2 pr-4 font-bold text-gray-800">{s.name.split(" ")[0]}</td>
                                        {scores.map((score, i) => (
                                            <td key={i} className="py-2 px-2 text-center">
                                                <span className={`text-xs font-bold ${score >= 90 ? "text-emerald-600" : score >= 70 ? "text-blue-600" : score < 50 ? "text-red-600" : "text-gray-600"}`}>
                                                    {score}
                                                </span>
                                            </td>
                                        ))}
                                        <td className="py-2 px-2 text-center font-black text-gray-900">{avg}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
