"use client"

import { CreditCard, ChevronRight, CheckCircle2 } from "lucide-react"

interface FeeItem {
    id: string
    title: string
    amount: number
    dueDate: string
    status: "pending" | "paid"
}

const fees: FeeItem[] = [
    { id: "1", title: "Quarterly Tuition", amount: 14500, dueDate: "15 Mar 2026", status: "pending" },
    { id: "2", title: "Transport Fee", amount: 2500, dueDate: "10 Feb 2026", status: "paid" },
    { id: "3", title: "Activity Fee", amount: 1500, dueDate: "05 Feb 2026", status: "paid" },
]

export function FeeCard() {
    return (
        <div className="space-y-4">
            {fees.map((fee) => (
                <div
                    key={fee.id}
                    className="bg-white border border-gray-100 rounded-3xl p-5 flex items-center justify-between hover:border-blue-200 transition-all cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${fee.status === "paid" ? "bg-emerald-500 shadow-emerald-100" : "bg-blue-600 shadow-blue-100"
                            }`}>
                            {fee.status === "paid" ? (
                                <CheckCircle2 className="w-6 h-6 text-white" />
                            ) : (
                                <CreditCard className="w-6 h-6 text-white" />
                            )}
                        </div>
                        <div>
                            <p className="font-black text-gray-900">{fee.title}</p>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                                {fee.status === "paid" ? `Paid on ${fee.dueDate}` : `Due: ${fee.dueDate}`}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`font-black ${fee.status === "paid" ? "text-emerald-600" : "text-blue-600"}`}>
                            ₹{fee.amount.toLocaleString()}
                        </p>
                        <ChevronRight className="w-4 h-4 text-gray-300 ml-auto mt-1 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                </div>
            ))}
        </div>
    )
}
