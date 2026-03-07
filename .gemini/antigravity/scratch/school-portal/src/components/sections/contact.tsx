"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-white text-black">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-blue-600 font-semibold">CONTACT US</h2>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                            Ready to <span className="text-blue-600">Transform</span> Your School?
                        </h3>
                        <p className="text-lg text-gray-600">
                            Schedule a strategy call with our experts today and discover how Amrit Tech can elevate your institution's digital ecosystem.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Phone</p>
                                    <p className="text-lg font-medium">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Email</p>
                                    <p className="text-lg font-medium">hello@amrittech.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Address</p>
                                    <p className="text-lg font-medium">123 Tech Avenue, Innovation Park, New Delhi</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 bg-gray-50 p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                                    <input type="email" placeholder="john@school.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">School Name</label>
                                <input type="text" placeholder="St. Mary's Academy" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Message</label>
                                <textarea rows={4} placeholder="Tell us about your requirements..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"></textarea>
                            </div>
                            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-xl font-bold text-lg gap-2">
                                Schedule a Strategy Call <Send className="w-5 h-5" />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
