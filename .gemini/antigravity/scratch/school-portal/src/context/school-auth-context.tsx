"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface Teacher {
    id: string
    role: "teacher" | "principal"
    name: string
    designation: string
    classAssigned: string
    section: string
    subjects: string[]
    mobile: string
    dob: string
    email: string
    qualifications: string
    experience: string
}

interface SchoolAuthContextType {
    teacher: Teacher | null
    login: (mobile: string, dob: string) => "teacher" | "principal" | false
    logout: () => void
}

const SchoolAuthContext = createContext<SchoolAuthContextType | null>(null)

export function SchoolAuthProvider({ children }: { children: ReactNode }) {
    const [teacher, setTeacher] = useState<Teacher | null>(null)

    useEffect(() => {
        const stored = sessionStorage.getItem("ats_teacher_session")
        if (stored) setTeacher(JSON.parse(stored))
    }, [])

    const login = (mobile: string, dob: string): "teacher" | "principal" | false => {
        const teachers = require("@/data/teachers.json") as Teacher[]
        const found = teachers.find(t => t.mobile === mobile && t.dob === dob)
        if (!found) return false
        setTeacher(found)
        sessionStorage.setItem("ats_teacher_session", JSON.stringify(found))
        return found.role
    }

    const logout = () => {
        setTeacher(null)
        sessionStorage.removeItem("ats_teacher_session")
    }

    return (
        <SchoolAuthContext.Provider value={{ teacher, login, logout }}>
            {children}
        </SchoolAuthContext.Provider>
    )
}

export function useSchoolAuth() {
    const ctx = useContext(SchoolAuthContext)
    if (!ctx) throw new Error("useSchoolAuth must be inside SchoolAuthProvider")
    return ctx
}
