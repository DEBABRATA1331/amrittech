import { SchoolAuthProvider } from "@/context/school-auth-context"
import type { ReactNode } from "react"

export const metadata = {
    title: "Teacher Portal | Amrit Tech Solution",
    description: "Class teacher portal for marks, remarks, and attendance management.",
}

export default function TeacherLayout({ children }: { children: ReactNode }) {
    return <SchoolAuthProvider>{children}</SchoolAuthProvider>
}
