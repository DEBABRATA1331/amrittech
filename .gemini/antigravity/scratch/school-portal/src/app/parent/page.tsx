"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Phone, Calendar, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft, Users, Shield, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function ParentLoginPage() {
    const { login } = useAuth()
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
        await new Promise(r => setTimeout(r, 900))
        const success = login(mobile, dob)
        setLoading(false)
        if (success) {
            router.push("/parent/dashboard")
        } else {
            setError("Invalid credentials. Please check your mobile number and date of birth.")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/60 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background blobs */}
            <motion.div animate={{ x: [0, 25, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />
            <motion.div animate={{ x: [0, -20, 0], y: [0, 25, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-indigo-200/35 blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                {/* Back link */}
                <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
                    <Link href="/portal" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-700 font-medium transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portal
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden"
                        style={{ boxShadow: "0 20px 60px -12px rgba(59,130,246,0.18)" }}>

                        {/* Top stripe */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />

                        <div className="p-8">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center shadow-sm">
                                    <Users className="w-7 h-7 text-blue-600" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl font-black text-slate-900">Parent Portal</h1>
                                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700">Secure</span>
                                    </div>
                                    <p className="text-sm text-slate-500">Sunrise International School</p>
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
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                                        <input type="tel" maxLength={10} value={mobile}
                                            onChange={e => setMobile(e.target.value.replace(/\D/g, ""))}
                                            placeholder="10-digit mobile number"
                                            className="w-full border-2 border-gray-200 focus:border-blue-400 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 focus:outline-none transition-colors bg-white placeholder-slate-400"
                                        />
                                    </div>
                                    <p className="text-slate-400 text-[11px] mt-1.5 ml-1">Father or Mother's registered number</p>
                                </div>

                                {/* DOB */}
                                <div>
                                    <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-2">Date of Birth</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                                        <input type={showDob ? "text" : "date"} value={dob}
                                            onChange={e => setDob(e.target.value)}
                                            className="w-full border-2 border-gray-200 focus:border-blue-400 rounded-2xl pl-11 pr-12 py-3.5 text-sm text-slate-900 focus:outline-none transition-colors bg-white"
                                        />
                                        <button type="button" onClick={() => setShowDob(!showDob)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors">
                                            {showDob ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <p className="text-slate-400 text-[11px] mt-1.5 ml-1">Your date of birth as registered</p>
                                </div>

                                <motion.button onClick={handleLogin} disabled={loading}
                                    whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-60 text-white font-black rounded-2xl py-4 mt-1 flex items-center justify-center gap-2 transition-all shadow-lg"
                                    style={{ boxShadow: "0 6px 20px -4px rgba(59,130,246,0.45)" }}>
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                                    {loading ? "Verifying..." : "Sign In to Parent Portal →"}
                                </motion.button>
                            </div>

                            {/* Demo credentials */}
                            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-4">
                                <p className="text-xs font-black text-blue-700 mb-2 flex items-center gap-1.5">
                                    <Shield className="w-3.5 h-3.5" /> Demo Credentials
                                </p>
                                <div className="text-xs text-slate-600 space-y-0.5">
                                    <p>Mobile: <span className="font-mono font-bold text-blue-700">9876543210</span> · DOB: <span className="font-mono font-bold text-blue-700">1980-05-15</span> (Father)</p>
                                    <p>Mobile: <span className="font-mono font-bold text-blue-700">9876543211</span> · DOB: <span className="font-mono font-bold text-blue-700">1982-08-22</span> (Mother)</p>
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
