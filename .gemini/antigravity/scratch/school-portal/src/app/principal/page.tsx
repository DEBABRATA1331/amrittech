"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSchoolAuth } from "@/context/school-auth-context"
import { Phone, Calendar, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft, School, Shield, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function PrincipalLoginPage() {
    const { login } = useSchoolAuth()
    const router = useRouter()
    const [mobile, setMobile] = useState("")
    const [dob, setDob] = useState("")
    const [showDob, setShowDob] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setError("")
        if (!mobile || !dob) { setError("Please fill in all fields."); return }
        if (mobile.length !== 10) { setError("Enter a valid 10-digit mobile number."); return }
        setLoading(true)
        await new Promise(r => setTimeout(r, 800))
        const result = login(mobile, dob)
        setLoading(false)
        if (result === "principal") router.push("/principal/dashboard")
        else if (result === "teacher") setError("These credentials belong to a Teacher. Please use the Staff Portal.")
        else setError("Invalid credentials. Only principal credentials are accepted here.")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50/60 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background blobs */}
            <motion.div animate={{ x: [0, 20, 0], y: [0, -22, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />
            <motion.div animate={{ x: [0, -22, 0], y: [0, 18, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-32 -right-32 w-[440px] h-[440px] rounded-full bg-teal-200/35 blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                {/* Back link */}
                <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
                    <Link href="/portal" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-700 font-medium transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portal
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden"
                        style={{ boxShadow: "0 20px 60px -12px rgba(16,185,129,0.18)" }}>

                        {/* Top stripe */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-600" />

                        <div className="p-8">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center shadow-sm">
                                    <School className="w-7 h-7 text-emerald-600" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl font-black text-slate-900">Principal Portal</h1>
                                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">Admin</span>
                                    </div>
                                    <p className="text-sm text-slate-500">School Management Access</p>
                                </div>
                            </div>

                            {/* Error */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                        className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 mb-5 text-sm overflow-hidden">
                                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-4">
                                {/* Mobile */}
                                <div>
                                    <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-2">Mobile Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                                        <input type="tel" maxLength={10} value={mobile}
                                            onChange={e => setMobile(e.target.value.replace(/\D/g, ""))}
                                            placeholder="Registered mobile number"
                                            className="w-full border-2 border-gray-200 focus:border-emerald-400 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 focus:outline-none transition-colors bg-white placeholder-slate-400"
                                        />
                                    </div>
                                </div>

                                {/* DOB */}
                                <div>
                                    <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-2">Date of Birth</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                                        <input type={showDob ? "text" : "date"} value={dob}
                                            onChange={e => setDob(e.target.value)}
                                            className="w-full border-2 border-gray-200 focus:border-emerald-400 rounded-2xl pl-11 pr-12 py-3.5 text-sm text-slate-900 focus:outline-none transition-colors bg-white"
                                        />
                                        <button type="button" onClick={() => setShowDob(!showDob)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors">
                                            {showDob ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <motion.button onClick={handleLogin} disabled={loading}
                                    whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-60 text-white font-black rounded-2xl py-4 mt-1 flex items-center justify-center gap-2 transition-all shadow-lg"
                                    style={{ boxShadow: "0 6px 20px -4px rgba(16,185,129,0.45)" }}>
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                                    {loading ? "Verifying..." : "Sign In to Principal Portal →"}
                                </motion.button>
                            </div>

                            {/* Demo credentials */}
                            <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                                <p className="text-xs font-black text-emerald-700 mb-2 flex items-center gap-1.5">
                                    <Shield className="w-3.5 h-3.5" /> Demo Credentials
                                </p>
                                <div className="text-xs text-slate-600 space-y-0.5">
                                    <p>Mobile: <span className="font-mono font-bold text-emerald-700">9900000010</span> · DOB: <span className="font-mono font-bold text-emerald-700">1970-01-15</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust badges */}
                    <div className="flex items-center justify-center gap-4 mt-5">
                        {["256-bit SSL", "Private & Secure", "CBSE Compliant"].map(b => (
                            <div key={b} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                <span className="text-[10px] font-semibold text-slate-500">{b}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
