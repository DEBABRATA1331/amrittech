"use client"

import { useState, useEffect } from "react"
import { useSchoolAuth } from "@/context/school-auth-context"
import { getNotices, addNotice, deleteNotice } from "@/lib/storage"
import type { NoticeRecord } from "@/lib/storage"
import { Bell, Plus, Trash2, ChevronDown } from "lucide-react"

const NOTICE_TYPES: NoticeRecord["type"][] = ["general", "academic", "event", "urgent"]
const typeStyle: Record<string, string> = {
    general: "bg-gray-100 text-gray-700",
    academic: "bg-blue-100 text-blue-700",
    event: "bg-purple-100 text-purple-700",
    urgent: "bg-red-100 text-red-700",
}
const typeIcon: Record<string, string> = {
    general: "📢", academic: "📚", event: "🎉", urgent: "🚨"
}

export default function NoticesPage() {
    const { teacher: principal } = useSchoolAuth()
    if (!principal) return null

    const [notices, setNotices] = useState<NoticeRecord[]>([])
    const [form, setForm] = useState({ title: "", body: "", type: "general" as NoticeRecord["type"], targetClass: "all" })
    const [saving, setSaving] = useState(false)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => { setNotices(getNotices()) }, [])

    const handleAdd = () => {
        if (!form.title || !form.body) return
        setSaving(true)
        addNotice({ ...form, date: new Date().toISOString().split("T")[0], author: principal.name, authorId: principal.id })
        setNotices(getNotices())
        setForm({ title: "", body: "", type: "general", targetClass: "all" })
        setShowForm(false)
        setSaving(false)
    }

    const handleDelete = (id: string) => {
        deleteNotice(id)
        setNotices(getNotices())
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black text-gray-900">Notice Board</h1>
                <button onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-purple-600 transition-all">
                    <Plus className="w-4 h-4" /> Post Notice
                </button>
            </div>

            {/* Notice Form */}
            {showForm && (
                <div className="bg-white border border-purple-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <h2 className="font-black text-gray-900">Post New Notice</h2>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Title</label>
                        <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                            placeholder="Notice title"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Message</label>
                        <textarea value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))} rows={4}
                            placeholder="Write the notice content..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Type</label>
                            <div className="relative">
                                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value as NoticeRecord["type"] }))}
                                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400">
                                    {NOTICE_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Target Class</label>
                            <div className="relative">
                                <select value={form.targetClass} onChange={e => setForm(p => ({ ...p, targetClass: e.target.value }))}
                                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400">
                                    <option value="all">All Classes</option>
                                    {["1", "2", "3", "4", "5"].map(c => <option key={c} value={c}>Class {c}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleAdd} disabled={!form.title || !form.body || saving}
                            className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-black rounded-2xl py-3 transition-all">
                            Post Notice
                        </button>
                        <button onClick={() => setShowForm(false)}
                            className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl py-3 transition-all">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Notices List */}
            <div className="space-y-3">
                {notices.length === 0 ? (
                    <div className="text-center py-12">
                        <Bell className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-400">No notices posted yet.</p>
                    </div>
                ) : notices.map(n => (
                    <div key={n.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                            <span className="text-xl shrink-0">{typeIcon[n.type] ?? "📢"}</span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-black text-gray-900">{n.title}</h3>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeStyle[n.type]}`}>{n.type}</span>
                                    {n.targetClass !== "all" && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Class {n.targetClass}</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{n.body}</p>
                                <div className="flex items-center gap-3 mt-3">
                                    <p className="text-[10px] text-gray-400 font-medium">By {n.author}</p>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <p className="text-[10px] text-gray-400">{new Date(n.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(n.id)} className="text-red-400 hover:text-red-600 transition-colors shrink-0 mt-1">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
