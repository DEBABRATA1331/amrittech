"use client"

import { useAuth } from "@/context/auth-context"
import { IndianRupee, CreditCard, AlertCircle, CheckCircle2 } from "lucide-react"

// Static fee data — in a real system this would come from backend
const ANNUAL_FEE = 36000
const PAID = 27000
const DUE = ANNUAL_FEE - PAID

const TRANSACTIONS = [
    { id: "TXN001", description: "Annual Fee - Q1", amount: 9000, date: "2025-04-01", status: "paid" },
    { id: "TXN002", description: "Annual Fee - Q2", amount: 9000, date: "2025-07-01", status: "paid" },
    { id: "TXN003", description: "Annual Fee - Q3", amount: 9000, date: "2025-10-01", status: "paid" },
    { id: "TXN004", description: "Annual Fee - Q4", amount: 9000, date: "2026-01-01", status: "pending" },
]

export default function FinancePage() {
    const { student } = useAuth()
    if (!student) return null

    const pct = Math.round((PAID / ANNUAL_FEE) * 100)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black text-gray-900">Finance</h1>

            {/* Fee Summary */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-200">
                <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest">Annual Fee Summary — {new Date().getFullYear()}</p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-white/15 rounded-2xl p-3 text-center">
                        <p className="text-lg font-black">₹{ANNUAL_FEE.toLocaleString()}</p>
                        <p className="text-emerald-200 text-[10px] uppercase tracking-widest">Total</p>
                    </div>
                    <div className="bg-white/15 rounded-2xl p-3 text-center">
                        <p className="text-lg font-black">₹{PAID.toLocaleString()}</p>
                        <p className="text-emerald-200 text-[10px] uppercase tracking-widest">Paid</p>
                    </div>
                    <div className="bg-white/15 rounded-2xl p-3 text-center">
                        <p className="text-lg font-black">₹{DUE.toLocaleString()}</p>
                        <p className="text-red-200 text-[10px] uppercase tracking-widest">Due</p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-emerald-200">Paid</span>
                        <span className="text-emerald-200">{pct}%</span>
                    </div>
                    <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                </div>
            </div>

            {/* Due Alert */}
            {DUE > 0 && (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4">
                    <AlertCircle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                    <div>
                        <p className="font-bold text-sm">Fee Due: ₹{DUE.toLocaleString()}</p>
                        <p className="text-xs mt-0.5">Please contact the school office to complete your payment.</p>
                    </div>
                    <button className="ml-auto text-xs font-black bg-amber-500 text-white px-3 py-1.5 rounded-xl hover:bg-amber-600 transition-all shrink-0">
                        Pay Now
                    </button>
                </div>
            )}

            {/* Transactions */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <h2 className="font-black text-gray-900 mb-4">Transaction History</h2>
                <div className="space-y-2">
                    {TRANSACTIONS.map(t => (
                        <div key={t.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${t.status === "paid" ? "bg-emerald-100" : "bg-amber-100"}`}>
                                {t.status === "paid" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <CreditCard className="w-4 h-4 text-amber-600" />}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-800 text-sm">{t.description}</p>
                                <p className="text-[10px] text-gray-400">{new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                            </div>
                            <div className="text-right">
                                <p className={`font-black text-sm ${t.status === "paid" ? "text-emerald-600" : "text-amber-600"}`}>₹{t.amount.toLocaleString()}</p>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${t.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{t.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
