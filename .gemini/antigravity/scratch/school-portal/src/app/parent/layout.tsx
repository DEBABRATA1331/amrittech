import { AuthProvider } from "@/context/auth-context"
import type { ReactNode } from "react"

export const metadata = {
    title: "Parent Portal | Sunrise International School",
    description: "Secure parent portal for tracking student progress, fees, and more.",
}

export default function ParentLayout({ children }: { children: ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>
}
