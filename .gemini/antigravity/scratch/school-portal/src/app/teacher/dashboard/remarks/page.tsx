"use client"

import { useState, useEffect } from "react"
import { useSchoolAuth } from "@/context/school-auth-context"
import { getRemarks, addRemark, deleteRemark } from "@/lib/storage"
import studentsData from "@/data/students.json"
import { MessageSquare, Trash2, Send, Quote } from "lucide-react"

type Student = typeof studentsData[0]

export default function RemarksPage() {
    const { teacher } = useSchoolAuth()
    if (!teacher) return null

    const students = (studentsData as Student[]).filter(s => s.class === teacher.classAssigned)
    const [selectedStudent, setSelectedStudent] = useState<Student>(students[0])
    const [remarks, setRemarks] = useState(getRemarks(selectedStudent?.id ?? ""))
    const [subject, setSubject] = useState(teacher.subjects[0] || "General")
    const [text, setText] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (selectedStudent) setRemarks(getRemarks(selectedStudent.id))
    }, [selectedStudent])

    const handleAdd = async () => {
        if (!text.trim()) return
        setSaving(true)
        addRemark(selectedStudent.id, {
            teacherId: teacher.id,
            teacherName: teacher.name,
            subject,
            remark: text.trim(),
            date: new Date().toISOString().split("T")[0],
        })
        setRemarks(getRemarks(selectedStudent.id))
        setText("")
        setSaving(false)
    }

    const handleDelete = (remarkId: string) => {
        deleteRemark(selectedStudent.id, remarkId)
        setRemarks(getRemarks(selectedStudent.id))
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black text-gray-900">Student Remarks</h1>

            {/* Student Selector */}
            <div className="flex gap-2 flex-wrap">
                {students.map(s => (
                    <button key={s.id} onClick={() => { setSelectedStudent(s); setRemarks(getRemarks(s.id)) }}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${selectedStudent.id === s.id ? "bg-emerald-500 text-white shadow-lg" : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300"
                            }`}>
                        {s.name.split(" ")[0]}
                    </button>
                ))}
            </div>

            {/* Add Remark */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4">Add Remark for {selectedStudent?.name}</h2>
                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Subject</label>
                        <select value={subject} onChange={e => setSubject(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm">
                            {teacher.subjects.map(s => <option key={s}>{s}</option>)}
                            <option>General</option>
                            <option>Behaviour</option>
                            <option>Sports</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Remark</label>
                        <textarea value={text} onChange={e => setText(e.target.value)} rows={3}
                            placeholder="Write a remark for this student..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm resize-none"
                        />
                    </div>
                    <button onClick={handleAdd} disabled={!text.trim() || saving}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-black rounded-2xl py-3 flex items-center justify-center gap-2 transition-all">
                        <Send className="w-4 h-4" />
                        Submit Remark
                    </button>
                </div>
            </div>

            {/* Existing Remarks */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4">
                    Remarks for {selectedStudent?.name} ({remarks.length})
                </h2>
                {remarks.length === 0 ? (
                    <div className="text-center py-8">
                        <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm font-medium">No remarks added yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {remarks.map(r => (
                            <div key={r.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                                <div className="flex items-start gap-3">
                                    <Quote className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-gray-800 text-sm">{r.teacherName}</span>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">{r.subject}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-gray-400 font-medium">{new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                                                {r.teacherId === teacher.id && (
                                                    <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-600 transition-colors">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2 leading-relaxed italic">"{r.remark}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
