"use client"

import { motion } from "framer-motion"

interface GradePoint {
    subject: string
    score: number
    color: string
}

const data: GradePoint[] = [
    { subject: "Math", score: 92, color: "bg-blue-500" },
    { subject: "Sci", score: 88, color: "bg-purple-500" },
    { subject: "Eng", score: 95, color: "bg-orange-500" },
    { subject: "SSt", score: 85, color: "bg-emerald-500" },
]

export function ProgressChart() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end h-32 gap-2">
                {data.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="relative w-full flex-1 flex flex-col justify-end">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${item.score}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`w-full max-w-[40px] mx-auto rounded-t-xl ${item.color} shadow-lg shadow-gray-200`}
                            />
                            <div className="absolute -top-6 left-0 right-0 text-center font-bold text-xs text-gray-900">
                                {item.score}%
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{item.subject}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
