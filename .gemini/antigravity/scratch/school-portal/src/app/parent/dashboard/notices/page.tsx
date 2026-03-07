"use client"

import { useSchoolAuth } from "@/context/school-auth-context"
import { getNotices } from "@/lib/storage"
import type { NoticeRecord } from "@/lib/storage"
import { useEffect, useState } from "react"
import { Bell, Calendar, BookOpen, Megaphone, AlertCircle } from "lucide-react"
import { usePathname } from "next/navigation"

const typeIcon: Record<string, React.ElementType> = {
    general: Megaphone,
    academic: BookOpen,
    event: Calendar,
    urgent: AlertCircle,
}
const typeStyle: Record<string, string> = {
    general: "bg-gray-100 text-gray-700 border-gray-200",
    academic: "bg-blue-100 text-blue-700 border-blue-200",
    event: "bg-purple-100 text-purple-700 border-purple-200",
    urgent: "bg-red-100 text-red-700 border-red-200",
}

export default function NoticesPage() {
    // This is inside the parent portal; get student's class from auth
    // We read notices from storage (set by principal via their portal)
    const [notices, setNotices] = useState<NoticeRecord[]>([])

    useEffect(() => {
        // Get all notices (school-wide or for specific class)
        setNotices(getNotices())
    }, [])

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black text-gray-900">School Notices</h1>

            {notices.length === 0 ? (
                <div className="text-center py-16">
                    <Bell className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 font-medium">No notices at this time.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notices.map(notice => {
                        const Icon = typeIcon[notice.type] ?? Megaphone
                        return (
                            <div key={notice.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${typeStyle[notice.type]}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-2 flex-wrap">
                                            <h3 className="font-black text-gray-900">{notice.title}</h3>
                                            <div className="flex gap-2 flex-wrap">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeStyle[notice.type]}`}>{notice.type}</span>
                                                {notice.targetClass !== "all" && (
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">Class {notice.targetClass}</span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{notice.body}</p>
                                        <p className="text-[10px] text-gray-400 font-medium mt-2">
                                            By {notice.author} • {new Date(notice.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
