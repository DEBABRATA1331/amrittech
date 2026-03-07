"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield, Cpu, BarChart3, Users } from "lucide-react"
import { useState } from "react"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-600 rounded-lg">
                            <Cpu className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Amrit Tech Solution</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#solutions" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Solutions</Link>
                        <Link href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</Link>
                        <Link href="#why-us" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Why Choose Us</Link>
                        <Link href="#robotics" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Future Skills</Link>
                        <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                            Book a Consultation
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black/90 border-b border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="#solutions" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Solutions</Link>
                        <Link href="#about" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">About</Link>
                        <Link href="#why-us" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Why Choose Us</Link>
                        <Link href="#robotics" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Future Skills</Link>
                        <div className="px-3 py-4">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                                Book a Consultation
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
