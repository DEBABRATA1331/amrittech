"use client"

import { Bell, Calendar, Info } from "lucide-react"

interface Notice {
    id: string
    title: string
    description: string
    date: string
    type: "academic" | "event" | "general"
}

const notices: Notice[] = [
    {
        id: "1",
        title: "Parent-Teacher Meeting",
        description: "Scheduled for next Saturday to discuss term performance.",
        date: "20 Feb",
        type: "event"
    },
    {
        id: "2",
        title: "Project Submission",
        description: "Science exhibition project deadline is approaching.",
        date: "18 Feb",
        type: "academic"
    },
    {
        id: "3",
        title: "School Picnic",
        description: "Details regarding the upcoming annual school picnic.",
        date: "15 Feb",
        type: "general"
    },
]

export function NoticeBoard() {
    return (
        <div className="space-y-4">
            {notices.map((notice) => (
                <div
                    key={notice.id}
                    className="bg-gray-50 border border-gray-100 rounded-3xl p-5 hover:bg-gray-100 transition-all cursor-pointer"
                >
                    <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${notice.type === "academic" ? "bg-orange-100 text-orange-600" :
                                notice.type === "event" ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"
                            }`}>
                            {notice.type === "academic" ? <Calendar className="w-5 h-5" /> :
                                notice.type === "event" ? <Bell className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-900">{notice.title}</h3>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{notice.date}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{notice.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
