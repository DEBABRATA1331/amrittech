import Link from "next/link"
import { Cpu, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-600 rounded-lg">
                                <Cpu className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">Amrit Tech</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering schools with technology-driven operational efficiency, student intelligence systems, and innovation programs for the future.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Solutions</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Admission CRM</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Academic Intelligence</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Visitor Management</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Student Wellness</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Robotics Labs</Link></li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Process</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Testimonials</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                                <span className="text-gray-400 text-sm">123 Tech Avenue, Innovation Park, New Delhi, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-500" />
                                <span className="text-gray-400 text-sm">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-500" />
                                <span className="text-gray-400 text-sm">hello@amrittech.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © 2026 Amrit Tech Solution. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
