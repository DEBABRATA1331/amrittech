"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface Student {
    id: string
    qrId: string
    name: string
    class: string
    section: string
    rollNo: string
    school: string
    admissionYear: string
    subjects: string[]
    defaultMarks: Record<string, number>
    champScore?: number
    father: { name: string; mobile: string; dob: string }
    mother: { name: string; mobile: string; dob: string }
}

interface AuthContextType {
    student: Student | null
    parentRole: "father" | "mother" | null
    login: (mobile: string, dob: string) => boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [student, setStudent] = useState<Student | null>(null)
    const [parentRole, setParentRole] = useState<"father" | "mother" | null>(null)

    useEffect(() => {
        const stored = sessionStorage.getItem("ats_parent_session")
        if (stored) {
            const { student, role } = JSON.parse(stored)
            setStudent(student)
            setParentRole(role)
        }
    }, [])

    const login = (mobile: string, dob: string): boolean => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const students = require("@/data/students.json") as Student[]
        for (const s of students) {
            if (s.father.mobile === mobile && s.father.dob === dob) {
                setStudent(s); setParentRole("father")
                sessionStorage.setItem("ats_parent_session", JSON.stringify({ student: s, role: "father" }))
                return true
            }
            if (s.mother.mobile === mobile && s.mother.dob === dob) {
                setStudent(s); setParentRole("mother")
                sessionStorage.setItem("ats_parent_session", JSON.stringify({ student: s, role: "mother" }))
                return true
            }
        }
        return false
    }

    const logout = () => {
        setStudent(null); setParentRole(null)
        sessionStorage.removeItem("ats_parent_session")
    }

    return <AuthContext.Provider value={{ student, parentRole, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be inside AuthProvider")
    return ctx
}
