import { SchoolAuthProvider } from "@/context/school-auth-context"
import type { ReactNode } from "react"

export const metadata = {
    title: "Principal Portal | Amrit Tech Solution",
    description: "Principal dashboard for school-wide management.",
}

export default function PrincipalLayout({ children }: { children: ReactNode }) {
    return <SchoolAuthProvider>{children}</SchoolAuthProvider>
}
