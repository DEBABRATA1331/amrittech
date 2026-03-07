"use client"

import { useAuth } from "@/context/auth-context"
import { Shield, Download, IdCard } from "lucide-react"
import { getAttendanceForDate } from "@/lib/storage"
import { QRCodeCanvas } from "qrcode.react"

export default function TrackerPage() {
    const { student } = useAuth()
    if (!student) return null

    const qrUrl = `${typeof window !== "undefined" ? window.location.origin : "https://amrittech.school"}/student/${student.qrId}`

    const today = new Date().toISOString().split("T")[0]
    const todayAtt = getAttendanceForDate(today)
    const studentAtt = todayAtt[student.id]

    const handleDownloadQR = () => {
        const canvas = document.getElementById("student-qr") as HTMLCanvasElement
        if (!canvas) return
        const url = canvas.toDataURL("image/png")
        const a = document.createElement("a")
        a.href = url
        a.download = `${student.name.replace(" ", "_")}_ID_Card.png`
        a.click()
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <IdCard className="w-5 h-5 text-red-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Student ID &amp; Security Pass</h1>
                    <p className="text-sm text-gray-500 font-medium">Digital Identity Verification</p>
                </div>
            </div>

            {/* QR Code Pass */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl flex flex-col items-center gap-6 relative overflow-hidden">
                {/* Security Watermark */}
                <Shield className="absolute -right-10 -bottom-10 w-64 h-64 text-slate-50 opacity-50 pointer-events-none" />

                <div className="relative z-10 text-center space-y-2 mb-2">
                    <p className="font-black text-2xl text-gray-900">{student.name}</p>
                    <div className="inline-flex gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">Class {student.class}-{student.section}</span>
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold border border-purple-100">Roll #{student.rollNo}</span>
                    </div>
                </div>

                <div className="relative z-10 bg-white p-5 rounded-3xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100">
                    <QRCodeCanvas id="student-qr" value={qrUrl} size={220} level="H"
                        imageSettings={{ src: "/favicon.ico", height: 36, width: 36, excavate: true }} />
                </div>

                <div className="relative z-10 text-center">
                    <p className="text-gray-400 text-sm font-mono tracking-widest bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">{student.qrId}</p>
                </div>

                <button onClick={handleDownloadQR}
                    className="relative z-10 flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-2">
                    <Download className="w-4 h-4" /> Download ID Card
                </button>
            </div>

            {/* Security Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-xl shrink-0 mt-0.5">
                    <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                    <h3 className="font-bold text-amber-900 mb-1">Security &amp; Policy Notice</h3>
                    <p className="text-sm text-amber-700 leading-relaxed">
                        To prioritize absolute student privacy, **live GPS tracking has been strictly disabled across the platform**.
                        This QR code serves exclusively as a digital ID. It is to be scanned **only by authorized school security guards** at the entry/exit gates for attendance marking and identity verification.
                    </p>
                </div>
            </div>

            {/* Today's Gate Status */}
            <div className={`rounded-2xl p-5 flex items-start gap-4 ${studentAtt?.status === "present" ? "bg-emerald-50 border border-emerald-200" : "bg-gray-50 border border-gray-200"}`}>
                <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${studentAtt?.status === "present" ? "bg-emerald-100" : "bg-gray-200"}`}>
                    <Shield className={`w-5 h-5 ${studentAtt?.status === "present" ? "text-emerald-700" : "text-gray-500"}`} />
                </div>
                <div>
                    <p className="font-bold text-gray-900 mb-1">Today's Gate Status</p>
                    {studentAtt ? (
                        <p className="text-sm text-gray-600">
                            {studentAtt.status === "present" ? `✅ Access granted. Scanned at ${studentAtt.time} via ${studentAtt.method === 'qr' ? 'Security Gate' : 'Manual Entry'}.` : "❌ Entry marked absent."}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-500">No gate activity recorded today.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
